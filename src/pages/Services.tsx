import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Plane, Building2, Map, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Building2,
  Map,
};

const Services = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services-page"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
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
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional aerial data collection services tailored to your specific needs
            </p>
          </div>

          {/* Services Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service) => {
                const Icon = iconMap[service.icon_name] || Plane;
                return (
                  <Card
                    key={service.id}
                    className="group p-8 bg-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                  >
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-primary/10 w-fit">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{service.title}</h2>
                        <p className="text-muted-foreground">
                          {service.full_description || service.short_description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
