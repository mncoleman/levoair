import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from "@/lib/webVitals";

// Initialize Web Vitals tracking for Google Analytics
// This tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
initWebVitals();

createRoot(document.getElementById("root")!).render(<App />);
