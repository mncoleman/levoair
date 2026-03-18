import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import usePageTitle from "@/lib/usePageTitle";

const features = [
  {
    id: "1",
    title: "FAA Part 107 certified and regulation-ready",
    description: "LAANC authorizations, airspace waivers, and full regulatory compliance handled for you",
    icon_name: "Shield",
  },
  {
    id: "2",
    title: "Pilots who integrate with your team",
    description: "We show up, learn your workflow, and operate like an extension of your crew",
    icon_name: "Users",
  },
  {
    id: "3",
    title: "Operational precision on every flight",
    description: "Thorough flight planning, safety protocols, and mission execution you can count on",
    icon_name: "FileCheck",
  },
  {
    id: "4",
    title: "Clear communication from start to finish",
    description: "Coordination and updates throughout every operation so you always know the status",
    icon_name: "MessageSquare",
  },
];

const Home = () => {
  usePageTitle("Home");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection
          badgeText="CONTRACT DRONE PILOTS"
          headline="Your Drones. Our Pilots."
          subheadline="FAA-certified contract pilots ready to fly your fleet and run your operations"
          ctaText="Hire a Pilot"
          ctaLink="/contact"
        />

        <FeaturesSection features={features} />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
