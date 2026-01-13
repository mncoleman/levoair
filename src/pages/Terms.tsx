import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import usePageTitle from "@/lib/usePageTitle";

const Terms = () => {
    usePageTitle("Terms of Service");

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
                        <p className="text-muted-foreground">Effective Date: January 13, 2026</p>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                            <p>
                                These Terms and Conditions of Service (“Terms”) govern your use of services provided by LevoAir (“LevoAir,” “we,” “us,” or “our”), including professional drone data collection, aerial photography, and data analysis services (collectively, the “Services”). By engaging with our Services, you (“Client,” “you,” or “your”) agree to be bound by these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Services Overview</h2>
                            <p>
                                LevoAir provides professional drone-based data collection services, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Aerial mapping and surveying</li>
                                <li>Industrial and infrastructure inspections</li>
                                <li>High-resolution aerial photography and videography</li>
                                <li>Agricultural data collection and analysis</li>
                                <li>Customized data reporting and visualization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Service Agreements</h2>
                            <p>
                                Specific Services will be detailed in individual Service Agreements or Statements of Work (SOWs) that reference these Terms. SOWs will outline project scope, deliverables, timelines, pricing, and payment terms. In the event of a conflict between these Terms and an SOW, the SOW will prevail with respect to the specific Services described therein.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
                            <p>
                                Fees for Services are as specified in the relevant SOW. Payment is due within thirty (30) days of the invoice date unless otherwise specified. Failure to remit payment may result in suspension of Services or withholding of deliverables.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Client Responsibilities</h2>
                            <p>
                                Client is responsible for providing necessary access to sites, obtaining required local permissions (where LevoAir is not specifically contracted to do so), and providing timely feedback on deliverables.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property Rights</h2>
                            <p>
                                Upon full payment of all fees, LevoAir grants Client ownership of the specific data and media deliverables produced for the project. LevoAir retains ownership of its proprietary methodologies, software, and operational techniques used to perform the Services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">7. Confidentiality</h2>
                            <p>
                                Both parties agree to protect and keep confidential any non-public information disclosed during the course of the engagement, including site details, proprietary data, and business strategies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Security</h2>
                            <p>
                                LevoAir employs industry-standard security measures to protect the integrity and confidentiality of the data collected during Service delivery.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">9. Warranties and Disclaimers</h2>
                            <p>
                                LevoAir warrants that Services will be performed in a professional and workmanlike manner. EXCEPT AS EXPRESSLY SET FORTH HEREIN, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, LevoAir's total liability for any claim arising out of these Terms shall not exceed the total amount paid by Client for the specific Services giving rise to the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
                            <p>
                                If you have any questions regarding these Terms, please contact us at:
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

export default Terms;
