import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut, Plus, Trash2, ExternalLink } from "lucide-react";
import { z } from "zod";

const imageSchema = z.object({
  imageUrl: z.string().trim().url({ message: "Please enter a valid URL" }),
  altText: z.string().trim().max(200, { message: "Alt text must be less than 200 characters" }).optional()
});

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
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
      setUser(session.user);

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
            <p className="text-muted-foreground">Manage your gallery images</p>
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
      </div>
    </div>
  );
};

export default Admin;
