import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import usePageTitle from "@/lib/usePageTitle";
import { trackContactClick } from "@/lib/analytics";

const Contact = () => {
  usePageTitle("Contact");
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

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Talk
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Need a pilot for an upcoming job? Fill out the form below or reach us at{" "}
              <a
                href="mailto:info@levoair.com"
                className="text-primary hover:underline"
                onClick={() => trackContactClick('email', 'info@levoair.com')}
              >
                info@levoair.com
              </a>
              .
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Contact Email Info */}
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:info@levoair.com"
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => trackContactClick('email', 'info@levoair.com')}
                  >
                    info@levoair.com
                  </a>
                </div>
              </div>
            </Card>

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
