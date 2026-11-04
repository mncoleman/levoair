import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PlanSection } from "@/components/home/PlanSection";
import { ProofSection } from "@/components/home/ProofSection";
import { Seo } from "@/components/Seo";
import { SITE, organizationSchema } from "@/lib/site";

const features = [
  {
    id: "1",
    title: "We fly your protocol",
    description: "You build the mission, and we fly it in your app at the altitude, overlap, and ground control on your spec sheet.",
    icon_name: "FileCheck",
  },
  {
    id: "2",
    title: "Every site has a flight day",
    description: "If weather moves a flight, we'll tell you the new date before your customer asks about it.",
    icon_name: "Plane",
  },
  {
    id: "3",
    title: "We check coverage before leaving",
    description: "Our pilots review the capture on site, so the upload clears your QA and nobody drives back out for a reflight.",
    icon_name: "Shield",
  },
  {
    id: "4",
    title: "New sites go on our schedule",
    description: "You won't need to onboard another pilot. We work with you directly or through the flight partner you already use, with one contact either way.",
    icon_name: "Users",
  },
];

const homeSeo = [
  organizationSchema,
  {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}/#organization` },
  },
];

const Home = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title="LevoAir | Contract Drone Flight Operations for Capture Programs"
        description="LevoAir flies drone capture missions for data platforms, flight programs, and builders, with FAA Part 107 pilots, a fixed flight day for every site, and same-day uploads."
        path="/"
        jsonLd={homeSeo}
      />

      <main className="pt-16">
        <HeroSection
          badgeText="FOR DRONE DATA PLATFORMS"
          headline="You sell the sites, and we'll fly them."
          subheadline="We fly capture missions for drone data platforms and flight programs, using your protocol in the app you already use, and we upload the same day."
          ctaText="Book a Test Flight"
          ctaLink="/contact"
        />

        <ProblemSection />

        <FeaturesSection features={features} />

        <ProofSection />

        <PlanSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
