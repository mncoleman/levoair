import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import ScrollFloat from "@/components/ScrollFloat";
import { PlanSection } from "@/components/home/PlanSection";
import { ProofSection } from "@/components/home/ProofSection";
import { CTASection } from "@/components/home/CTASection";
import { industries } from "@/lib/industries";
import { SITE, organizationSchema, breadcrumbSchema } from "@/lib/site";
import { trackCTAClick } from "@/lib/analytics";

const IndustryPage = ({ path }: { path: string }) => {
  const industry = industries.find((i) => i.path === path)!;

  const jsonLd = [
    organizationSchema,
    {
      "@type": "Service",
      name: industry.headline,
      description: industry.description,
      url: `${SITE.url}${industry.path}`,
      serviceType: industry.headline,
      provider: { "@id": `${SITE.url}/#organization` },
      ...(SITE.areaServed && { areaServed: SITE.areaServed }),
    },
    {
      "@type": "FAQPage",
      mainEntity: industry.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: industry.headline, path: industry.path },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title={industry.title}
        description={industry.description}
        path={industry.path}
        jsonLd={jsonLd}
      />

      <main className="pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-4xl text-center pb-16">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/80">{industry.name}</span>
          </nav>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{industry.headline}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">{industry.intro}</p>
          <Link to="/contact" onClick={() => trackCTAClick("Plan a Program", `industry_${industry.name}`)}>
            <Button size="lg" className="gradient-primary font-semibold group">
              Plan a Program
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>

        {/* Problem */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
              THE PROBLEM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{industry.problemHeading}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{industry.problem}</p>
          </div>
        </section>

        {/* What we capture */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                WHAT WE CAPTURE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                {industry.name} Flights We Run
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.captures.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-5"
                >
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProofSection />

        <PlanSection />

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                FAQ
              </span>
              <ScrollFloat containerClassName="mb-0" textClassName="text-3xl md:text-4xl font-bold">
                Common Questions
              </ScrollFloat>
            </div>
            <dl className="space-y-6">
              {industry.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-border bg-card/60 p-6">
                  <dt className="font-semibold mb-2">{f.q}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Other industries */}
        <section className="pb-8">
          <div className="container mx-auto px-4 max-w-3xl text-center text-sm text-muted-foreground">
            Also see:{" "}
            {industries
              .filter((i) => i.path !== industry.path)
              .map((i, idx) => (
                <span key={i.path}>
                  {idx > 0 && " · "}
                  <Link to={i.path} className="text-primary hover:underline">{i.headline}</Link>
                </span>
              ))}
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default IndustryPage;
