import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const currentRef = logoRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <img
                src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
                alt="LEVOAIR Logo"
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional drone data collection services
            </p>
            <div className="flex space-x-3 pt-1">
              <a
                href="https://www.linkedin.com/company/levoair/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/brand-kit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Brand Kit
                </Link>
              </li>
              <li>
                <a
                  href="https://levoair.instatus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">info@levoair.com</li>
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors opacity-50">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} LevoAir. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Large logo fade-in with cursor spotlight reveal */}
      <div className="w-full overflow-hidden pt-8 pb-6 px-4 md:px-8">
        <div
          ref={logoRef}
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            ref={logoContainerRef}
            className="relative max-w-[1400px] mx-auto"
            onMouseMove={(e) => {
              const rect = logoContainerRef.current?.getBoundingClientRect();
              if (!rect) return;
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Base: grayscale, low opacity */}
            <img
              src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
              alt="LEVOAIR"
              className="w-full h-auto filter grayscale opacity-20"
            />
            {/* Color reveal layer masked to cursor spotlight */}
            <img
              src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: isHovering ? 1 : 0,
                maskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
