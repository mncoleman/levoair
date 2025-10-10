import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DomeGallery from "@/components/DomeGallery";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data.map(img => ({
        src: img.image_url,
        alt: img.alt_text || ""
      }));
    }
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
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-pulse text-lg text-foreground">Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-background">
      <div className="absolute top-4 right-4 z-50">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => navigate("/auth")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Admin Login
        </Button>
      </div>
      <DomeGallery 
        images={images} 
        fit={settings ? Number(settings.fit) : 0.9}
        minRadius={settings?.min_radius || 600}
        maxVerticalRotationDeg={settings?.max_vertical_rotation_deg || 0}
        segments={settings?.segments || 34}
        dragDampening={settings ? Number(settings.drag_dampening) : 2}
        grayscale={settings?.grayscale || false}
        overlayBlurColor="hsl(240 10% 3.9%)"
      />
    </div>
  );
};

export default Gallery;
