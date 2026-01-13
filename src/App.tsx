import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import BrandKit from "./pages/BrandKit";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { trackPageView } from "@/lib/analytics";
import CustomCursor from "@/components/ui/CustomCursor";
import ClickBurst from "@/components/ui/ClickBurst";

const queryClient = new QueryClient();

/**
 * Analytics and scroll restoration wrapper component
 * - Tracks page views on route changes
 * - Scrolls to top on navigation
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top of page on route change
    window.scrollTo(0, 0);

    // Track page view whenever the route changes
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/brand-kit" element={<BrandKit />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
