import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import DomeGallery from "@/components/DomeGallery";
import { Seo } from "@/components/Seo";
import { breadcrumbSchema } from "@/lib/site";

const images = [
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68954ffde474881915728fd6.jpeg", alt: "Aerial drone view of a highway interchange and nearby commercial development" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68954821a30eaa411515557f.jpeg", alt: "Aerial drone view of rural acreage lots and farmland" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68954fc6e6672f8c4a4e7e72.jpeg", alt: "Aerial drone view of snow-covered farmland with mountains on the horizon" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68954effe474880ddf728f72.jpeg", alt: "Aerial drone view of a suburban residential neighborhood beside lakes" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68e5a4eace37be67454a35b0.jpeg", alt: "Aerial drone view of a new town center, church, and parking lot" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68e5a542416ab74b73836237.jpeg", alt: "Aerial drone view of a rural home on a snow-covered property" },
  { src: "https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68e5a5552cc2613d34be7f98.jpeg", alt: "Aerial drone view of new townhome construction in a residential development" },
];

const portfolioSeo = [
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]),
];

const Portfolio = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title="Aerial Drone Photography Portfolio | LevoAir"
        description="Aerial drone photography and site capture by LevoAir: residential developments, commercial sites, infrastructure, and land."
        path="/portfolio"
        jsonLd={portfolioSeo}
      />

      <main className="pt-16 relative">
        <div className="absolute top-24 left-0 right-0 z-10 text-center pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Aerial Drone Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Explore our aerial photography and data collection projects
          </p>
        </div>

        <div className="w-full" style={{ height: 'calc(100vh - 4rem)' }}>
          <DomeGallery
            images={images}
            fit={0.9}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
