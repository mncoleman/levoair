import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import usePageTitle from "@/lib/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  const { data: heroData } = useQuery({
    queryKey: ["hero-home"],
    queryFn: async () => {
      const { data: page } = await supabase
        .from("pages")
        .select("id")
        .eq("slug", "home")
        .single();

      if (!page) return null;

      const { data, error } = await supabase
        .from("hero_sections")
        .select("*")
        .eq("page_id", page.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: features = [] } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
  <Navbar />
      
      <main className="pt-16">
        <HeroSection
          badgeText={heroData?.badge_text}
          headline={heroData?.headline || "We Fly the Drones. You Use the Data."}
          subheadline={heroData?.subheadline}
          ctaText={heroData?.cta_text}
          ctaLink={heroData?.cta_link}
        />

        <FeaturesSection features={features} />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
