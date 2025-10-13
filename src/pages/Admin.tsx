import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, LogOut, Home } from "lucide-react";
import { z } from "zod";

const imageSchema = z.object({
  image_url: z.string().url({ message: "Must be a valid URL" }).refine(
    (url) => url.startsWith("http://") || url.startsWith("https://"),
    { message: "URL must start with http:// or https://" }
  ),
  alt_text: z.string().optional()
});

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/auth");
        return;
      }

      setIsAdmin(true);
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: images = [], isLoading: imagesLoading } = useQuery({
    queryKey: ["admin-gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: isAdmin
  });

  const { data: settings } = useQuery({
    queryKey: ["gallery-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
    enabled: isAdmin
  });

  const addImageMutation = useMutation({
    mutationFn: async (newImage: { image_url: string; alt_text?: string }) => {
      const validated = imageSchema.parse(newImage);
      
      const { data, error } = await supabase
        .from("gallery_images")
        .insert([{
          image_url: validated.image_url,
          alt_text: validated.alt_text || null,
          display_order: images.length
        }])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-images"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-images"] });
      toast.success("Image added successfully!");
      setImageUrl("");
      setAltText("");
    },
    onError: (error: any) => {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to add image");
      }
    }
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-images"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-images"] });
      toast.success("Image deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete image");
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from("gallery_settings")
        .update(updates)
        .eq("id", settings?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-settings"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-settings"] });
      toast.success("Settings updated!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update settings");
    }
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSettingChange = (key: string, value: any) => {
    updateSettingsMutation.mutate({ [key]: value });
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gallery Admin</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="images" className="space-y-4">
          <TabsList>
            <TabsTrigger value="images">Gallery Images</TabsTrigger>
            <TabsTrigger value="settings">Dome Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Image</CardTitle>
                <CardDescription>Add images to your portfolio gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  addImageMutation.mutate({ image_url: imageUrl, alt_text: altText });
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altText">Alt Text (Optional)</Label>
                    <Input
                      id="altText"
                      placeholder="Description of the image"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={addImageMutation.isPending}>
                    {addImageMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Image
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Images ({images.length})</CardTitle>
                <CardDescription>Manage your portfolio images</CardDescription>
              </CardHeader>
              <CardContent>
                {imagesLoading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : images.length === 0 ? (
                  <p className="text-center text-muted-foreground p-8">No images yet. Add your first image above.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.image_url}
                          alt={image.alt_text || "Gallery image"}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteImageMutation.mutate(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {image.alt_text && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">{image.alt_text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            {settings && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Fit ({settings.fit})</Label>
                      <Slider
                        value={[Number(settings.fit)]}
                        onValueChange={([value]) => handleSettingChange("fit", value)}
                        min={0.1}
                        max={2}
                        step={0.1}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Min Radius ({settings.min_radius})</Label>
                      <Slider
                        value={[settings.min_radius]}
                        onValueChange={([value]) => handleSettingChange("min_radius", value)}
                        min={100}
                        max={2000}
                        step={50}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Max Vertical Rotation ({settings.max_vertical_rotation_deg}°)</Label>
                      <Slider
                        value={[settings.max_vertical_rotation_deg]}
                        onValueChange={([value]) => handleSettingChange("max_vertical_rotation_deg", value)}
                        min={-90}
                        max={90}
                        step={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Segments ({settings.segments})</Label>
                      <Slider
                        value={[settings.segments]}
                        onValueChange={([value]) => handleSettingChange("segments", value)}
                        min={10}
                        max={100}
                        step={1}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Drag Dampening ({settings.drag_dampening})</Label>
                      <Slider
                        value={[Number(settings.drag_dampening)]}
                        onValueChange={([value]) => handleSettingChange("drag_dampening", value)}
                        min={0.1}
                        max={10}
                        step={0.1}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="grayscale">Grayscale</Label>
                      <Switch
                        id="grayscale"
                        checked={settings.grayscale}
                        onCheckedChange={(checked) => handleSettingChange("grayscale", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
