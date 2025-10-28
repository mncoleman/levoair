import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";
import type { StaggeredMenuItem } from "@/components/ui/StaggeredMenu";

export const Navbar = () => {
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
    { href: "/about", label: "ABOUT US" },
    { href: "/contact", label: "CONTACT" },
  ];

  const staggeredMenuItems: StaggeredMenuItem[] = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
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
          </div>
        </div>
      </div>

      {/* Mobile Staggered Menu - Only visible on mobile */}
      <div className="md:hidden fixed top-0 right-0 w-screen h-screen pointer-events-none z-[60]">
        <StaggeredMenu
          position="right"
          items={staggeredMenuItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="hsl(40, 10%, 96%)"
          openMenuButtonColor="hsl(40, 10%, 96%)"
          changeMenuColorOnOpen={false}
          colors={['hsl(0, 0%, 8%)', 'hsl(0, 0%, 12%)']}
          logoUrl=""
          accentColor="hsl(38, 90%, 50%)"
          isFixed={false}
        />
      </div>
    </header>
  );
};