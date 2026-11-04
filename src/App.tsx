import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { routes, NotFound } from "./routes";
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
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AnalyticsTracker />
      <Routes>
        {routes.map(({ path, Page, props }) => (
          <Route key={path} path={path} element={<Page {...props} />} />
        ))}
        {/* Add new pages in src/routes.tsx, not here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
