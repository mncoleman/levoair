import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/drone-license-guide", label: "Drone License Guide" },
  { to: "/contact", label: "Contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Seo
        title="Page Not Found | LevoAir"
        description="The page you're looking for doesn't exist."
        path={location.pathname}
        noindex
      />
      <main className="pt-40 pb-24 container mx-auto px-4 text-center max-w-2xl">
        <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3 block">
          404
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">This page didn't make the flight</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The link may be old or mistyped. Try one of these instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-primary hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
        <Button asChild className="gradient-primary font-semibold">
          <Link to="/">Back to Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
