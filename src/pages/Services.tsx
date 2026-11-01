import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Plane, Building2, Map, ScanSearch, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { SITE, organizationSchema, breadcrumbSchema } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Building2,
  Map,
  ScanSearch,
};

const services = [
  {
    id: "1",
    title: "Recurring Site Capture",
    icon_name: "Plane",
    short_description: "Scheduled flights across one site or a full portfolio, flown to the same plan every visit for clean progress comparisons",
    link: "/contact",
    linkText: "Plan a program",
  },
  {
    id: "2",
    title: "Construction",
    icon_name: "Building2",
    short_description: "Progress documentation, earthwork, and site capture flights built around active job sites",
    link: "/construction-drone-services",
    linkText: "Construction drone services",
  },
  {
    id: "3",
    title: "Mapping & Survey Operations",
    icon_name: "Map",
    short_description: "Photogrammetry, orthomosaics, and survey-grade flight planning for land and site assessment, delivered in the format your team processes",
    link: "/drone-mapping-services",
    linkText: "Drone mapping services",
  },
  {
    id: "4",
    title: "Inspection",
    icon_name: "ScanSearch",
    short_description: "Roof, facade, structure, and infrastructure inspection without lifts or crews at height, repeatable from saved positions",
    link: "/drone-inspection-services",
    linkText: "Drone inspection services",
  },
];

const servicesSeo = [
  organizationSchema,
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
  ...services.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.short_description,
    url: `${SITE.url}${s.link === "/contact" ? "/services" : s.link}`,
    provider: { "@id": `${SITE.url}/#organization` },
  })),
];

const Services = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title="Drone Services: Site Capture, Mapping & Inspection | LevoAir"
        description="Recurring drone site capture, construction progress flights, photogrammetry mapping, and inspection by FAA Part 107 certified pilots. Plan a program with LevoAir."
        path="/services"
        jsonLd={servicesSeo}
      />

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                      <Link
                        to={service.link}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:underline group/link"
                      >
                        {service.linkText}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
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
