import GlassCube from "@/components/ui/GlassCube";
import ScrollFloat from "@/components/ScrollFloat";

const steps = [
  {
    number: "01",
    title: "Scope the program",
    description: "Tell us your sites, cadence, and deliverables. We map the airspace and build the flight plans.",
  },
  {
    number: "02",
    title: "We fly on schedule",
    description: "Our pilots fly our aircraft on the cadence you set, with LAANC and site coordination handled.",
  },
  {
    number: "03",
    title: "Data lands in your format",
    description: "Every visit uploads in the format your team processes, ready to compare against the last one.",
  },
];

export const PlanSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
            HOW IT WORKS
          </span>
          <ScrollFloat
            containerClassName="mb-0"
            textClassName="text-4xl md:text-5xl font-bold"
          >
            From Scope to Scheduled Capture
          </ScrollFloat>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <GlassCube
              key={step.number}
              className="min-h-[200px]"
              wobbleAngle={(i / steps.length) * Math.PI * 2}
            >
              <div className="p-6 space-y-3 min-h-[200px]">
                <span className="text-sm font-semibold text-primary tracking-[0.2em]">
                  {step.number}
                </span>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlassCube>
          ))}
        </div>
      </div>
    </section>
  );
};
