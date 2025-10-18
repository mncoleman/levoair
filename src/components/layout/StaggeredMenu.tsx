import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaggeredMenu = ({ isOpen, onClose }: StaggeredMenuProps) => {
  const [layersVisible, setLayersVisible] = useState([false, false, false]);

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setLayersVisible([true, false, false]), 50);
      const timer2 = setTimeout(() => setLayersVisible([true, true, false]), 150);
      const timer3 = setTimeout(() => setLayersVisible([true, true, true]), 250);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setLayersVisible([false, false, false]);
    }
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      {/* Overlay layers */}
      <div
        className={`fixed inset-0 bg-[hsl(var(--primary))] transition-transform duration-300 ease-in-out z-40 ${
          layersVisible[0] ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <div
        className={`fixed inset-0 bg-[hsl(var(--primary))] transition-transform duration-300 ease-in-out z-40 ${
          layersVisible[1] ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDelay: "50ms" }}
      />
      <div
        className={`fixed inset-0 bg-[hsl(var(--primary))] transition-transform duration-300 ease-in-out z-40 ${
          layersVisible[2] ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionDelay: "100ms" }}
      />

      {/* Menu content */}
      <div
        className={`fixed inset-0 bg-background z-50 transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center space-y-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={`text-4xl font-bold text-foreground hover:text-[hsl(var(--primary))] transition-all duration-300 transform ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${350 + index * 50}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Link */}
          <div
            className={`flex items-center space-x-4 mt-auto transition-all duration-300 ${
              isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
          >
            <a
              href="https://www.linkedin.com/company/levoair/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
