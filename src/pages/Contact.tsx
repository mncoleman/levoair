import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import usePageTitle from "@/lib/usePageTitle";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  usePageTitle("Contact");
  useEffect(() => {
    const src = "https://link.msgsndr.com/js/form_embed.js";
    // Avoid adding the script multiple times
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        // cleanup: remove script if present
        try {
          document.body.removeChild(script);
        } catch (e) {
          /* ignore */
        }
      };
    }
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      const { error } = await supabase.from("contact_submissions").insert({
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        company: validated.company || null,
        message: validated.message,
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to send message");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Take Your Project To New Heights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete the form below to get a quote, or call us at{" "}
              <a href="tel:9707760470" className="text-primary hover:underline">
                (970) 776-0470
              </a>{" "}
              to speak directly with our drone experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form - embedded LeadConnector iframe */}
            <Card className="lg:col-span-2 p-0 overflow-hidden">
              <div className="w-full h-full" style={{ minHeight: 500 }}>
                <div id="leadconnector-form-wrapper" className="w-full h-full">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/jKx3hSzkoiVBg6qHF8S2"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: 3 }}
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

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:9707760470"
                      className="text-muted-foreground hover:text-primary"
                    >
                      (970) 776-0470
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@levoair.com"
                      className="text-muted-foreground hover:text-primary"
                    >
                      info@levoair.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Service Area</h3>
                    <p className="text-muted-foreground">
                      Nationwide coverage across the United States
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
