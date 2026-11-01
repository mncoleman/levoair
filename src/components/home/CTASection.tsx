import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollFloat from "@/components/ScrollFloat";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div
          className="rounded-2xl p-12 md:p-16 text-center space-y-8"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(16px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block">
            ADD CAPACITY
          </span>

          <ScrollFloat
            containerClassName="mb-0"
            textClassName="text-4xl md:text-5xl font-bold"
          >
            One site. Then the next ten.
          </ScrollFloat>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Send us a site and your protocol. We'll fly it, upload it, and let the
            data make the case.
          </p>

          <div className="pt-2">
            <Link to="/contact">
              <Button size="lg" className="gradient-primary font-semibold group">
                Book a Test Flight
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
