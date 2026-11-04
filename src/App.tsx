import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import BrandKit from "./pages/BrandKit";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import DroneLicense from "./pages/DroneLicense";
import DroneRegistration from "./pages/DroneRegistration";
import DroneLicenseRequirements from "./pages/DroneLicenseRequirements";
import Articles from "./pages/Articles";
import { trackPageView } from "@/lib/analytics";
import CustomCursor from "@/components/ui/CustomCursor";
import ClickBurst from "@/components/ui/ClickBurst";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <CustomCursor />
    <ClickBurst />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/brand-kit" element={<BrandKit />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/a/drone-license-guide" element={<DroneLicense />} />
        <Route path="/a/drone-registration-guide" element={<DroneRegistration />} />
        <Route path="/a/do-i-need-a-drone-license" element={<DroneLicenseRequirements />} />
        {/* Old article URLs, kept so shared links still work */}
        <Route path="/drone-license-guide" element={<Navigate to="/a/drone-license-guide" replace />} />
        <Route path="/drone-registration-guide" element={<Navigate to="/a/drone-registration-guide" replace />} />
        <Route path="/do-i-need-a-drone-license" element={<Navigate to="/a/do-i-need-a-drone-license" replace />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
