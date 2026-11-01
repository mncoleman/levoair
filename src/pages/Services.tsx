import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Plane, Building2, Map, LucideIcon } from "lucide-react";
import usePageTitle from "@/lib/usePageTitle";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Building2,
  Map,
};

const services = [
  {
    id: "1",
    title: "Recurring Site Capture",
    icon_name: "Plane",
    short_description: "Scheduled flights across one site or a full portfolio, flown to the same plan every visit for clean progress comparisons",
  },
  {
    id: "2",
    title: "Construction & Infrastructure",
    icon_name: "Building2",
    short_description: "Progress documentation, earthwork tracking, and infrastructure inspection flights built around active job sites",
  },
  {
    id: "3",
    title: "Mapping & Survey Operations",
    icon_name: "Map",
    short_description: "Photogrammetry, orthomosaics, and survey-grade flight planning for land and site assessment, delivered in the format your team processes",
  },
];

const Services = () => {
  usePageTitle("Our Services");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">What We Do</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We handle the flying. You get the data.
            </p>
          </div>

          {/* Services Grid */}
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
                        {service.short_description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
