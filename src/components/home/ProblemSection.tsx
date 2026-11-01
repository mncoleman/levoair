import ScrollFloat from "@/components/ScrollFloat";

export const ProblemSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
          THE PILOT PROBLEM
        </span>
        <ScrollFloat
          containerClassName="mb-6"
          textClassName="text-4xl md:text-5xl font-bold"
        >
          Growth shouldn't wait on a pilot.
        </ScrollFloat>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every new customer means more flights. More flights mean more contract
          pilots to find, vet, and train. And when one of them misses a day,
          it's your phone that rings.
        </p>
        <p className="text-lg text-foreground/90 mt-6 font-medium">
          We built LevoAir so it doesn't.
        </p>
      </div>
    </section>
  );
};
