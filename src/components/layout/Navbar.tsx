import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsScrolled(false);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down past the threshold, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/services", label: "SERVICES" },
    { href: "/about", label: "ABOUT US" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/contact", label: "CONTACT" },
  ];

  const shouldAnimate = isScrolled && !isMobile;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 flex justify-center items-start">
      <div className={`relative top-4 w-[calc(100%-1.5rem)] max-w-7xl mx-auto transition-all duration-300 ease-in-out ${
        shouldAnimate ? 'h-12' : 'h-16'
      }`}>
        {/* Background and Border */}
        <div className={`absolute inset-0 bg-background/50 backdrop-blur-lg border border-border shadow-lg rounded-lg transition-opacity duration-300 ease-in-out ${
          shouldAnimate ? 'opacity-0' : 'opacity-100'
        }`} />

        <div className="relative flex items-center justify-between h-full px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10">
            <img
              src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
              alt="LEVOAIR Logo"
              className={`transition-all duration-300 ${shouldAnimate ? 'h-7' : 'h-8'} w-auto`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8 transition-opacity duration-300 ease-in-out ${
            shouldAnimate ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA and Mobile Menu Container */}
          <div className="flex items-center space-x-2 z-10">
            {/* CTA Button */}
            <div className="hidden md:block">
              <Button asChild className="gradient-primary font-semibold text-sm whitespace-nowrap">
                <Link to="/contact">Book a Flight</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="gradient-primary font-semibold mt-4">
                    <Link to="/contact" onClick={() => setIsOpen(false)}>Book a Flight</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};