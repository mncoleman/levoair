import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Particles from "@/components/layout/Particles";
import { Shield, Target, Zap } from "lucide-react";
import { Seo } from "@/components/Seo";
import { organizationSchema, breadcrumbSchema } from "@/lib/site";
import GlassCube from "@/components/ui/GlassCube";
import ScrollFloat from "@/components/ScrollFloat";
import { BlurText } from "@/components/ui/BlurText";

const values = [
  {
    icon: Shield,
    title: "Safety first.",
    description:
      "FAA Part 107 certified, with LAANC and safety protocols on every flight. Compliance is our job, not yours.",
  },
  {
    icon: Target,
    title: "On the day.",
    description:
      "A flight day moves only when the weather does. And you'll hear about it from us first.",
  },
  {
    icon: Zap,
    title: "Room to grow.",
    description:
      "New sites go on our schedule. No new pilot to recruit, vet, or train on your side.",
  },
];

const aboutSeo = [
  organizationSchema,
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
];

const About = () => {
  return (
    <>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="min-h-screen relative">
        <Navbar />
      <Seo
          title="About LevoAir | FAA Part 107 Drone Operations"
          description="LevoAir flies drone capture missions for data platforms, flight programs, and builders, with FAA Part 107 pilots, fixed flight days, and same-day uploads."
          path="/about"
          jsonLd={aboutSeo}
        />

        <main className="pt-32 pb-24 relative z-10">
          <div className="container mx-auto px-4 max-w-5xl">

            {/* Hero */}
            <div className="text-center mb-16">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
                OUR STORY
              </span>
              <ScrollFloat
                as="h1"
                containerClassName="mb-4"
                textClassName="text-5xl md:text-6xl font-bold"
              >
                About LevoAir
              </ScrollFloat>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <BlurText
                  text="Drone operations, built to scale."
                  delay={400}
                  duration={1000}
                  className="text-gradient"
                />
              </p>
            </div>

            {/* Mission Statement */}
            <div className="max-w-3xl mx-auto mb-20">
              <GlassCube className="w-full" wobbleAngle={0.5}>
                <div className="p-12">
                  <p className="text-lg text-center leading-relaxed text-foreground/90">
                    LevoAir flies capture missions for drone data platforms, flight programs, and
                    the builders they serve. We fly your protocol in your app and upload the same day.
                    When you add sites, we add flights, not paperwork. We work directly with builders
                    and as a dedicated operator inside larger programs, always to the standards of the
                    platform or prime we fly for.
                  </p>
                </div>
              </GlassCube>
            </div>

            {/* Why LevoAir */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                  OUR VALUES
                </span>
                <ScrollFloat
                  containerClassName="mb-0"
                  textClassName="text-4xl font-bold"
                >
                  Why LevoAir
                </ScrollFloat>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {values.map((value, i) => (
                  <GlassCube
                    key={value.title}
                    className="min-h-[240px]"
                    wobbleAngle={(i / 3) * Math.PI * 2}
                  >
                    <div className="p-8 flex flex-col items-center text-center space-y-4 min-h-[240px] justify-center">
                      <div className="p-4 rounded-full bg-primary/10">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </GlassCube>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
                EXPERTISE
              </span>
              <ScrollFloat
                containerClassName="mb-6"
                textClassName="text-4xl font-bold"
              >
                Our Experience
              </ScrollFloat>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Construction sites. Land surveys. Inspections. We know the airspace, we know
                LAANC, and we know what it takes to capture a site right the first time.
              </p>
            </div>
          </div>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
