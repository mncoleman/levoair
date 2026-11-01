import GlassCube from "@/components/ui/GlassCube";
import ScrollFloat from "@/components/ScrollFloat";

const steps = [
  {
    number: "01",
    title: "Send your spec.",
    description: "Your protocol, your deliverables, your sites. We'll check the airspace on every one.",
  },
  {
    number: "02",
    title: "We fly a test site.",
    description: "Your QA team grades the upload before you hand over anything else.",
  },
  {
    number: "03",
    title: "Hand us the schedule.",
    description: "Fixed flight days. LAANC, site contacts, and uploads, all on us.",
  },
];

export const PlanSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
            GETTING STARTED
          </span>
          <ScrollFloat
            containerClassName="mb-0"
            textClassName="text-4xl md:text-5xl font-bold"
          >
            Start with one site.
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
