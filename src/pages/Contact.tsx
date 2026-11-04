import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE, organizationSchema, breadcrumbSchema } from "@/lib/site";

const nextSteps = [
  "We review your protocol, sites, and deliverables.",
  "We check the airspace and, where it allows, schedule a preliminary flight.",
  "Once your QA team has graded the upload, we set flight days for the rest.",
];
import { trackContactClick } from "@/lib/analytics";

const contactSeo = [
  organizationSchema,
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
];

const Contact = () => {
  useEffect(() => {
    const src = "https://link.msgsndr.com/js/form_embed.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return () => {
        try {
          document.body.removeChild(script);
        } catch (e) {
          /* ignore */
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title="Book a Preliminary Flight | Contact LevoAir"
        description="Send LevoAir one site and your flight protocol. We fly it, upload it, and your QA team grades the data before you hand over more."
        path="/contact"
        jsonLd={contactSeo}
      />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Book a Preliminary Flight
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear about your program! Send us one site and your
              protocol, or tell us how many sites you need covered and where.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
            <div className="space-y-6">
              {/* What happens next */}
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">What happens next</h2>
                <ol className="space-y-4">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Direct contact */}
              <Card className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => trackContactClick('email', SITE.email)}
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>
                {SITE.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => trackContactClick('phone', SITE.phone)}
                      >
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Contact Form - embedded LeadConnector iframe */}
            <Card className="p-0 overflow-hidden">
              <div className="w-full h-full" style={{ minHeight: 500 }}>
                <div id="leadconnector-form-wrapper" className="w-full h-full">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/jKx3hSzkoiVBg6qHF8S2"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: 3,
                    }}
                    id="inline-jKx3hSzkoiVBg6qHF8S2"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="LevoAir Form - Site 2.0"
                    data-height="1299"
                    data-layout-iframe-id="inline-jKx3hSzkoiVBg6qHF8S2"
                    data-form-id="jKx3hSzkoiVBg6qHF8S2"
                    title="LevoAir Form - Site 2.0"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
