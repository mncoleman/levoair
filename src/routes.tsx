import { lazy, ComponentType } from "react";
import Home from "./pages/Home";
import { industries } from "@/lib/industries";

type Page = ComponentType<any> & { load?: () => Promise<unknown> };

/**
 * Code-split page that can be loaded before React mounts. Once loaded it
 * renders synchronously, so prerendered HTML isn't replaced by a blank
 * Suspense fallback on first paint.
 */
const lazyPage = (factory: () => Promise<{ default: ComponentType<any> }>): Page => {
  let Loaded: ComponentType<any> | null = null;
  const Lazy = lazy(factory);
  const Page: Page = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.load = () => factory().then((m) => (Loaded = m.default));
  return Page;
};

const Services = lazyPage(() => import("./pages/Services"));
const About = lazyPage(() => import("./pages/About"));
const Portfolio = lazyPage(() => import("./pages/Portfolio"));
const Contact = lazyPage(() => import("./pages/Contact"));
const BrandKit = lazyPage(() => import("./pages/BrandKit"));
const Terms = lazyPage(() => import("./pages/Terms"));
const Privacy = lazyPage(() => import("./pages/Privacy"));
const DroneLicense = lazyPage(() => import("./pages/DroneLicense"));
const DroneRegistration = lazyPage(() => import("./pages/DroneRegistration"));
const IndustryPage = lazyPage(() => import("./pages/IndustryPage"));
export const NotFound = lazyPage(() => import("./pages/NotFound"));

// Keep in sync with scripts/prerender.mjs, which prerenders these paths and writes sitemap.xml.
export const routes: { path: string; Page: Page; props?: Record<string, unknown> }[] = [
  { path: "/", Page: Home },
  { path: "/services", Page: Services },
  ...industries.map((i) => ({ path: i.path, Page: IndustryPage, props: { path: i.path } })),
  { path: "/about", Page: About },
  { path: "/portfolio", Page: Portfolio },
  { path: "/contact", Page: Contact },
  { path: "/brand-kit", Page: BrandKit },
  { path: "/terms", Page: Terms },
  { path: "/privacy", Page: Privacy },
  { path: "/drone-license-guide", Page: DroneLicense },
  { path: "/drone-registration-guide", Page: DroneRegistration },
];

export const preloadRoute = (pathname: string) => {
  const path = pathname.replace(/\/$/, "") || "/";
  const page = routes.find((r) => r.path === path)?.Page ?? NotFound;
  return page.load?.() ?? Promise.resolve();
};
