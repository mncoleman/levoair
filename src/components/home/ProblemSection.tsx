import ScrollFloat from "@/components/ScrollFloat";

export const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
          THE PROBLEM
        </span>
        <ScrollFloat
          containerClassName="mb-6"
          textClassName="text-4xl md:text-5xl font-bold"
        >
          Contract Pilots Don't Grow With Your Sales
        </ScrollFloat>
        <p className="text-lg text-muted-foreground leading-relaxed">
          You sign a builder with forty sites and the flights land on a list of
          contract pilots. One can't make Tuesday. One flies the wrong overlap.
          One uploads three days late. Your QA team catches it, your ops team
          reschedules, and you're recruiting again before the next market opens.
        </p>
        <p className="text-lg text-foreground/90 mt-6 font-medium">
          Your customer signed with you, so every missed flight is yours to explain.
        </p>
      </div>
    </section>
  );
};
