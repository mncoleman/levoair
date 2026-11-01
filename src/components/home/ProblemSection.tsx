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
          Scale Breaks Pilot Networks
        </ScrollFloat>
        <p className="text-lg text-muted-foreground leading-relaxed">
          One flight is easy to staff. Dozens of sites on a weekly cadence is not.
          When every mission depends on a different freelancer with different gear,
          captures arrive late, overlaps miss, and the data your team builds
          schedules on stops lining up. You end up managing pilots instead of
          delivering results.
        </p>
        <p className="text-lg text-foreground/90 mt-6 font-medium">
          The data you make decisions on shouldn't depend on who showed up that day.
        </p>
      </div>
    </section>
  );
};
