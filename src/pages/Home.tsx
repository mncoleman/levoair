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
    title: "Your protocol, your app",
    description: "We fly the missions you build, in the app you use, to the altitude, overlap, and ground control on your spec sheet",
    icon_name: "FileCheck",
  },
  {
    id: "2",
    title: "Flown on the flight day",
    description: "Each site gets a fixed day. If weather moves a flight, you hear from us with the new date before your customer asks",
    icon_name: "Plane",
  },
  {
    id: "3",
    title: "Checked before we leave",
    description: "We review coverage on site before packing up, so the upload clears your QA and you don't pay for a reflight",
    icon_name: "Shield",
  },
  {
    id: "4",
    title: "Capacity in one contract",
    description: "Add sites without onboarding another pilot. One contact and one invoice, directly or through the flight partner you already use",
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
          badgeText="FLIGHT OPERATIONS PARTNER"
          headline="Flight Capacity You Don't Have to Recruit"
          subheadline="LevoAir flies capture missions for drone data platforms and flight programs. We fly your protocol in your app, upload the same day, and take on new sites without you hiring another pilot."
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
