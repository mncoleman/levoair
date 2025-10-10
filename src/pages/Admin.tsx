import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, LogOut, Plus, ExternalLink } from "lucide-react";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const imageSchema = z.object({
  imageUrl: z.string().trim().url({ message: "Please enter a valid URL" }),
  altText: z.string().trim().max(200, { message: "Alt text must be less than 200 characters" }).optional()
});

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        toast.error("You don't have admin access");
        navigate("/");
        return;
      }
      setIsAdmin(true);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: images = [] } = useQuery({
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
    mutationFn: async () => {
      const validated = imageSchema.parse({ imageUrl, altText });
      
      const { error } = await supabase.from("gallery_images").insert({
        image_url: validated.imageUrl,
        alt_text: validated.altText || "",
        display_order: images.length
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery-images"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
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
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      toast.success("Image deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete image");
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: any) => {
      const { error } = await supabase
        .from("gallery_settings")
        .update(updatedSettings)
        .eq("id", settings?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-settings"] });
      toast.success("Settings updated successfully!");
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
    if (!settings) return;
    updateSettingsMutation.mutate({ [key]: value });
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-pulse text-lg text-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gallery Admin</h1>
            <p className="text-muted-foreground">Manage your gallery images and settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Gallery
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images">Gallery Images</TabsTrigger>
            <TabsTrigger value="settings">Dome Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Image</CardTitle>
                <CardDescription>
                  Add images to your gallery by providing a URL (Google Drive, Unsplash, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); addImageMutation.mutate(); }} className="space-y-4">
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
                      type="text"
                      placeholder="Description of the image"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                  <Button type="submit" disabled={addImageMutation.isPending}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Images ({images.length})</CardTitle>
                <CardDescription>Manage your existing gallery images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image: any) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={image.image_url}
                          alt={image.alt_text || "Gallery image"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteImageMutation.mutate(image.id)}
                        disabled={deleteImageMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {image.alt_text && (
                        <p className="mt-2 text-sm text-muted-foreground truncate">
                          {image.alt_text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Dome Gallery Settings</CardTitle>
                <CardDescription>
                  Customize the appearance and behavior of your 3D dome gallery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {settings && (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Fit</Label>
                        <span className="text-sm text-muted-foreground">{Number(settings.fit).toFixed(1)}</span>
                      </div>
                      <Slider
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={[Number(settings.fit)]}
                        onValueChange={(vals) => handleSettingChange('fit', vals[0])}
                        disabled={updateSettingsMutation.isPending}
                      />
                      <p className="text-xs text-muted-foreground">Size factor for the dome radius</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Min Radius</Label>
                        <span className="text-sm text-muted-foreground">{settings.min_radius}px</span>
                      </div>
                      <Slider
                        min={200}
                        max={2000}
                        step={50}
                        value={[settings.min_radius]}
                        onValueChange={(vals) => handleSettingChange('min_radius', vals[0])}
                        disabled={updateSettingsMutation.isPending}
                      />
                      <p className="text-xs text-muted-foreground">Minimum radius for the dome in pixels</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Max Vertical Rotation</Label>
                        <span className="text-sm text-muted-foreground">{settings.max_vertical_rotation_deg}°</span>
                      </div>
                      <Slider
                        min={0}
                        max={45}
                        step={1}
                        value={[settings.max_vertical_rotation_deg]}
                        onValueChange={(vals) => handleSettingChange('max_vertical_rotation_deg', vals[0])}
                        disabled={updateSettingsMutation.isPending}
                      />
                      <p className="text-xs text-muted-foreground">Maximum vertical tilt angle in degrees</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Segments</Label>
                        <span className="text-sm text-muted-foreground">{settings.segments}</span>
                      </div>
                      <Slider
                        min={10}
                        max={100}
                        step={1}
                        value={[settings.segments]}
                        onValueChange={(vals) => handleSettingChange('segments', vals[0])}
                        disabled={updateSettingsMutation.isPending}
                      />
                      <p className="text-xs text-muted-foreground">Number of image segments in the dome</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Drag Dampening</Label>
                        <span className="text-sm text-muted-foreground">{Number(settings.drag_dampening).toFixed(1)}</span>
                      </div>
                      <Slider
                        min={0}
                        max={5}
                        step={0.1}
                        value={[Number(settings.drag_dampening)]}
                        onValueChange={(vals) => handleSettingChange('drag_dampening', vals[0])}
                        disabled={updateSettingsMutation.isPending}
                      />
                      <p className="text-xs text-muted-foreground">Controls inertia when dragging (higher = more damping)</p>
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Grayscale</Label>
                        <p className="text-xs text-muted-foreground">Apply grayscale filter to all images</p>
                      </div>
                      <Switch
                        checked={settings.grayscale}
                        onCheckedChange={(checked) => handleSettingChange('grayscale', checked)}
                        disabled={updateSettingsMutation.isPending}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
