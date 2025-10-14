import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Target, Zap } from "lucide-react";
import usePageTitle from "@/lib/usePageTitle";

const About = () => {
  usePageTitle("About");
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About LevoAir</h1>
            <p className="text-2xl text-gradient max-w-3xl mx-auto">
              Pioneering Reality Data-Capturing Technology
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="p-12 bg-card/50 backdrop-blur-sm">
              <p className="text-xl text-center leading-relaxed">
                We stand for unbound progress – unlocking the full potential of drone 
                technology and executing complex challenges across America. We live at 
                the forefront of technology and industry – piloting towards a limitless future.
              </p>
            </Card>
          </div>

          {/* Why LevoAir */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Why LevoAir</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 text-center space-y-4 bg-card hover:shadow-xl transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Safety First</h3>
                <p className="text-muted-foreground">
                  Stringent safety measures and FAA-certified pilots ensure every mission 
                  is executed flawlessly
                </p>
              </Card>

              <Card className="p-8 text-center space-y-4 bg-card hover:shadow-xl transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Target className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Precision Data</h3>
                <p className="text-muted-foreground">
                  Aviation-grade equipment and experienced pilots deliver data that meets 
                  strict engineering standards
                </p>
              </Card>

              <Card className="p-8 text-center space-y-4 bg-card hover:shadow-xl transition-shadow">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Full Support</h3>
                <p className="text-muted-foreground">
                  Comprehensive systems, abundant resources, and constant communication 
                  throughout your project
                </p>
              </Card>
            </div>
          </div>

          {/* Experience */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Experience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our comprehensive systems, abundant resources, experienced pilots, and stringent 
              safety measures fully equip us to execute any mission successfully. We make 
              super-complex projects appear simple while delivering the highest quality data 
              for your critical decisions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
