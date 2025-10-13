import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import DomeGallery from "@/components/DomeGallery";

const Portfolio = () => {
  const { data: images = [], isLoading: imagesLoading } = useQuery({
    queryKey: ["portfolio-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data.map((img) => ({
        src: img.image_url,
        alt: img.alt_text || "Portfolio image",
      }));
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["portfolio-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (imagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-pulse text-lg text-foreground">Loading portfolio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 relative">
        <div className="absolute top-8 left-0 right-0 z-50 text-center pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Explore our aerial photography and data collection projects
          </p>
        </div>
        
        <div className="w-full" style={{ height: 'calc(100vh - 4rem)' }}>
          <DomeGallery
            images={images}
            fit={settings?.fit ?? 0.9}
            minRadius={settings?.min_radius ?? 600}
            maxVerticalRotationDeg={settings?.max_vertical_rotation_deg ?? 0}
            segments={settings?.segments ?? 34}
            dragDampening={settings?.drag_dampening ?? 2}
            grayscale={settings?.grayscale ?? false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
