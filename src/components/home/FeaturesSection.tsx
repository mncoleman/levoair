import { Shield, Users, FileCheck, MessageSquare, LucideIcon } from "lucide-react";
import GlassCube from "@/components/ui/GlassCube";
import ScrollFloat from "@/components/ScrollFloat";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}
interface FeaturesSectionProps {
  features: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Users,
  FileCheck,
  MessageSquare
};

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
            WHY LEVOAIR
          </span>
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-4xl md:text-5xl font-bold"
          >
            THE REAL DIFFERENCE
          </ScrollFloat>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You need reliable pilots who can show up and execute. With years
            in aviation, we handle the flight so you can focus on the results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon_name] || Shield;
            return (
              <GlassCube
                key={feature.id}
                className="min-h-[220px]"
                wobbleAngle={(i / Math.max(features.length, 1)) * Math.PI * 2}
              >
                <div className="p-6 flex flex-col h-full justify-between min-h-[220px] group">
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCube>
            );
          })}
        </div>
      </div>
    </section>
  );
};
