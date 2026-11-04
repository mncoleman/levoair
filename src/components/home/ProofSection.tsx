import ScrollFloat from "@/components/ScrollFloat";
import GlassCube from "@/components/ui/GlassCube";
import { proofStats, proofProjects, proofCredentials } from "@/lib/proof";

/** Renders only the proof that has been filled in. Hidden entirely when empty. */
export const ProofSection = () => {
  const stats = proofStats.filter((s) => s.value);
  if (!stats.length && !proofProjects.length && !proofCredentials.length) return null;

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
            THE RECORD
          </span>
          <ScrollFloat
            containerClassName="mb-0"
            textClassName="text-4xl md:text-5xl font-bold"
          >
            Flown and Delivered
          </ScrollFloat>
        </div>

        {stats.length > 0 && (
          <dl className={`grid gap-5 mb-12 ${stats.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/60 p-6 text-center"
              >
                <dd className="text-4xl font-bold text-gradient">{stat.value}</dd>
                <dt className="text-sm text-muted-foreground mt-2">{stat.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {proofCredentials.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-3 mb-12">
            {proofCredentials.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {proofProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {proofProjects.map((project, i) => (
              <GlassCube
                key={project.title}
                wobbleAngle={(i / proofProjects.length) * Math.PI * 2}
              >
                <figure className="overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <figcaption className="p-6 space-y-2">
                    <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">
                      {project.industry}
                    </span>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </figcaption>
                </figure>
              </GlassCube>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
