import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { SITE, organizationSchema, breadcrumbSchema } from "@/lib/site";
import ScrollFloat from "@/components/ScrollFloat";
import { BlurText } from "@/components/ui/BlurText";
import { trackEvent } from "@/lib/analytics";
import articles from "@/data/articles.json";

const Articles = () => {

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Seo
        title="Drone Rules, Explained: FAA Guides | LevoAir"
        description="Plain-English guides to FAA drone licensing, registration, Remote ID, and flying legally."
        path="/articles"
        image={`${SITE.url}/og/articles.png`}
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
          ]),
        ]}
      />

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
              Articles
            </span>
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="text-4xl sm:text-5xl md:text-6xl font-bold"
            >
              Drone Rules, Explained
            </ScrollFloat>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              <BlurText
                text="Plain-English guides to FAA licensing, registration, and flying legally"
                delay={400}
                duration={1000}
                className="text-gradient"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/a/${a.slug}`}
                onClick={() =>
                  trackEvent("article_card_click", {
                    event_category: "engagement",
                    event_label: a.slug,
                  })
                }
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300"
              >
                <div className="aspect-[1200/630] overflow-hidden border-b border-border/60 bg-background">
                  <img
                    src={a.image}
                    alt={a.title}
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                    {a.eyebrow}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {a.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
