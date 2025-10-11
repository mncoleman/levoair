import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">
            Take Your Project Higher
          </h2>
          
          <p className="text-xl text-muted-foreground">
            No matter where your project is—urban, rural, or remote—we're ready to 
            deploy skilled pilots and capture the data you need. With FAA-certified 
            professionals and strict safety standards, we ensure every flight delivers 
            reliable, high-quality results.
          </p>

          <div className="pt-4">
            <Link to="/contact">
              <Button size="lg" className="gradient-primary font-semibold text-lg group">
                Book a Flight Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
