import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "@/lib/webVitals";
import { preloadRoute } from "./routes";

// Initialize Web Vitals tracking for Google Analytics
// This tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
initWebVitals();

// Load the current page's chunk first so prerendered HTML is replaced in one pass.
preloadRoute(window.location.pathname).finally(() => {
  createRoot(document.getElementById("root")!).render(
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
});
