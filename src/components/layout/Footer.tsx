import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = logoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <img src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png" alt="LEVOAIR Logo" className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Professional drone data collection services
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
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
              <a href="https://levoair.instatus.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                System Status
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">

            <li className="text-sm text-muted-foreground">info@levoair.com</li>
            <li>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Admin Login
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/company/levoair/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} LevoAir. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>

    <div className="w-full overflow-hidden pt-12 pb-8 px-4 md:px-8">
      <div
        ref={logoRef}
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
          }`}
      >
        <img
          src="https://storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/68ed922e8c1d1065ae358ef7.png"
          alt="LEVOAIR"
          className="w-full h-auto max-w-[1400px] mx-auto filter grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default"
        />
      </div>
    </div>
  </footer>;
};