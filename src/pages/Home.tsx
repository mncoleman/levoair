import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { PlanSection } from "@/components/home/PlanSection";
import usePageTitle from "@/lib/usePageTitle";

const features = [
  {
    id: "1",
    title: "One accountable operator",
    description: "One team owns your capture schedule, so you stop coordinating freelancers site by site",
    icon_name: "Plane",
  },
  {
    id: "2",
    title: "Repeatable flight plans",
    description: "Saved missions flown the same way every visit, so progress data compares cleanly week over week",
    icon_name: "FileCheck",
  },
  {
    id: "3",
    title: "Compliance handled",
    description: "FAA Part 107 certified, with LAANC authorizations, airspace waivers, and safety protocols on every flight",
    icon_name: "Shield",
  },
  {
    id: "4",
    title: "Built to fit your program",
    description: "We work inside your standards, reporting, and delivery format, directly or within your existing flight partner's program",
    icon_name: "Users",
  },
];

const Home = () => {
  usePageTitle("Home");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection
          badgeText="DRONE OPERATIONS AT SCALE"
          headline="Stop Chasing Pilots. Get Data on Schedule."
          subheadline="Recurring drone capture for construction, mapping, and inspection programs. We plan the flights, fly every site the same way, and deliver the data on your cadence."
          ctaText="Plan a Program"
          ctaLink="/contact"
        />

        <ProblemSection />

        <FeaturesSection features={features} />

        <PlanSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
