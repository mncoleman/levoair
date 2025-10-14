import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Building2, Map, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  icon_name: string;
}
interface ServicesSectionProps {
  services: Service[];
}
const iconMap: Record<string, LucideIcon> = {
  Plane,
  Building2,
  Map
};
export const ServicesSection = ({
  services
}: ServicesSectionProps) => {
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive aerial solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(service => {
          const Icon = iconMap[service.icon_name] || Plane;
          return <Card key={service.id} className="group relative overflow-hidden bg-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-8 space-y-6">
                  <div className="p-4 rounded-xl bg-primary/10 w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.short_description}
                    </p>
                  </div>

                  <Link to={`/services/${service.slug}`}>
                    
                  </Link>
                </div>
              </Card>;
        })}
        </div>
      </div>
    </section>;
};