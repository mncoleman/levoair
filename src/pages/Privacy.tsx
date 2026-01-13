import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import usePageTitle from "@/lib/usePageTitle";

const Privacy = () => {
    usePageTitle("Privacy Policy");

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground">Effective Date: January 13, 2026</p>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                            <p>
                                LevoAir (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal and project-related information when you use our professional drone data collection services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                            <p>
                                In the course of providing our Services, we may collect the following types of information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                                <li><strong>Project Metadata:</strong> Geolocation data, site photographs, aerial sensor data, and project-specific requirements.</li>
                                <li><strong>Usage Data:</strong> Information about how you interact with our website and data delivery platforms.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                            <p>
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide and maintain our Services.</li>
                                <li>Deliver project data and analysis reports.</li>
                                <li>Process payments and manage accounts.</li>
                                <li>Communicate project updates and respond to inquiries.</li>
                                <li>Improve our operational efficiency and service quality.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
                            <p>
                                We do not sell your personal or project data to third parties. We may disclose information only as follows:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Service Providers:</strong> To vendors who assist in operations like cloud storage, payment processing, or data processing.</li>
                                <li><strong>Legal Requirements:</strong> To comply with legal obligations, FAA regulations, or government requests.</li>
                                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                            <p>
                                We implement robust physical, technical, and administrative security measures to protect your information against unauthorized access, loss, or alteration. Aerial data is stored in secure cloud environments with limited access controls.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
                            <p>
                                You have the right to access, correct, or request deletion of your personal information. You may also opt-out of marketing communications at any time by following the instructions in our emails.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and maintained on computers located outside of your state or country, where the data protection laws may differ from those in your jurisdiction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Cookies and Tracking</h2>
                            <p>
                                Our website uses cookies and similar tracking technologies to analyze site traffic and improve your browsing experience. You can manage your cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
                            <p>
                                If you have any questions regarding this Privacy Policy, please contact us at:
                            </p>
                            <p className="font-semibold text-foreground">info@levoair.com</p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
