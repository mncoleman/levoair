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
    title: "Your protocol. Exactly.",
    description: "We fly the missions you build, in the app you already use. Altitude, overlap, ground control. All to spec.",
    icon_name: "FileCheck",
  },
  {
    id: "2",
    title: "On the day. Every time.",
    description: "Every site gets a fixed flight day. If the weather moves it, you'll know before your customer does.",
    icon_name: "Plane",
  },
  {
    id: "3",
    title: "Right the first time.",
    description: "We check coverage before we leave the site. So the upload clears QA, and nobody flies it twice.",
    icon_name: "Shield",
  },
  {
    id: "4",
    title: "Room to grow.",
    description: "Add sites without adding pilots. One team, one contact, one invoice. Directly or through the partner you already use.",
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
        description="LevoAir flies drone capture missions for data platforms, flight programs, and builders. Your protocol, fixed flight days, same-day uploads, FAA Part 107 pilots."
        path="/"
        jsonLd={homeSeo}
      />

      <main className="pt-16">
        <HeroSection
          badgeText="FLIGHT OPERATIONS"
          headline="Sell the sites. We'll fly them."
          subheadline="LevoAir flies capture missions for drone data platforms and flight programs. Your protocol. Your app. Uploaded the same day."
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
