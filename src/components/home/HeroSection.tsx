import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Cubes from "@/components/Cubes";
import Squares from "@/components/Squares";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackCTAClick } from "@/lib/analytics";
import { BlurText } from "@/components/ui/BlurText";
import { FallInText } from "@/components/ui/FallInText";
import { TextType } from "@/components/ui/TextType";

interface HeroSectionProps {
  badgeText?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const HeroSection = ({
  badgeText = "DATA COLLECTION SIMPLIFIED",
  headline,
  subheadline,
  ctaText = "Book a Flight",
  ctaLink = "/contact",
}: HeroSectionProps) => {
  const isMobile = useIsMobile();

  const headlineParts = headline.split('.');
  const firstPart = headlineParts[0] + (headlineParts.length > 1 ? '.' : '');
  const secondPart = headlineParts.slice(1).join('.').trim();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background - Cubes for desktop, Squares for mobile */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <Squares
            speed={0.1}
            squareSize={50}
            direction='diagonal'
            borderColor='rgba(255,255,255,0.3)'
            hoverFillColor='transparent'
          />
        ) : (
          <Cubes
            gridSize={10}
            maxAngle={15}
            radius={5}
            borderStyle={'2px dashed rgba(255,255,255,0.3)'}
            faceColor={'rgba(14, 13, 12, 1)'}
            autoAnimate={true}
            rippleOnClick={false}
          />
        )}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 5% / 0.7) 100%)'
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pointer-events-none">
        <div className="max-w-4xl mx-auto space-y-6">

          {badgeText && (
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                <TextType text={badgeText} delay={200} speed={40} />
              </span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <FallInText text={firstPart} delay={600} duration={900} />
            {secondPart && (
              <>
                <br />
                <FallInText text={secondPart} delay={900} duration={900} />
              </>
            )}
          </h1>

          {subheadline && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              <BlurText text={subheadline} delay={1200} duration={1000} />
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto">
            <Link to={ctaLink} onClick={() => trackCTAClick(ctaText, 'hero_section')}>
              <Button size="lg" className="gradient-primary font-semibold group">
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
