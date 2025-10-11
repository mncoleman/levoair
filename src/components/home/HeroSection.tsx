import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full gradient-radial blur-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full gradient-radial blur-orb" />
      </div>

      {/* Topographic pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 Q 25 25, 50 50 T 100 50"
                stroke="currentColor"
                fill="none"
                strokeWidth="0.5"
              />
              <path
                d="M0 75 Q 25 50, 50 75 T 100 75"
                stroke="currentColor"
                fill="none"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {badgeText && (
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider">
                {badgeText}
              </span>
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {headline.split('.').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && '.'}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>

          {subheadline && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to={ctaLink}>
              <Button size="lg" className="gradient-primary font-semibold group">
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
