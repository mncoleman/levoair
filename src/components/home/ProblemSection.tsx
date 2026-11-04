import ScrollFloat from "@/components/ScrollFloat";

export const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollFloat
          containerClassName="mb-6"
          textClassName="text-4xl md:text-5xl font-bold"
        >
          How many pilots does your next market need?
        </ScrollFloat>
        <p className="text-lg text-muted-foreground leading-relaxed">
          When a builder signs with forty sites, someone on your team has to find,
          vet, and train enough contract pilots to cover them, usually before the
          first flight day. We'd love to be the team you call instead.
        </p>
      </div>
    </section>
  );
};
