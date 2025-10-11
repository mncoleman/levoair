import { Shield, Users, FileCheck, MessageSquare, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  MessageSquare,
};

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            THE REAL DIFFERENCE
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your projects need accurate data—collected safely and professionally. 
            With years in aviation, we know what it takes to deliver precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon_name] || Shield;
            return (
              <Card
                key={feature.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Industry Standards */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Industry Standards</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              "FAA Part 107 certified pilots",
              "Aviation-grade maintenance protocols",
              "Professional flight planning",
              "Secure data handling",
            ].map((standard, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-muted/50 border border-border"
              >
                <p className="text-sm font-medium">{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
