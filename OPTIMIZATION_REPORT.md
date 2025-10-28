# LevoAir Website - Optimization & Traffic Metrics Report

**Generated:** October 22, 2025
**Codebase Version:** Current production branch
**Analyzed By:** Claude Code AI Assistant

---

## Executive Summary

LevoAir's website is a modern React SPA built with Vite, TypeScript, and Tailwind CSS, featuring sophisticated 3D animations, CMS integration via Supabase, and a premium dark/gold design aesthetic. The codebase is well-structured with 332KB of source code across 79 TypeScript/TSX files.

**Key Findings:**
- ✅ Modern tech stack with excellent developer experience
- ✅ Good use of React optimization patterns (useCallback, useMemo)
- ⚠️ **Missing critical analytics/monitoring infrastructure**
- ⚠️ No lazy loading for routes or heavy components
- ⚠️ Limited bundle optimization configuration
- ⚠️ No Web Vitals tracking or performance monitoring
- ⚠️ Large animation components could benefit from code splitting

---

## 1. Current Performance Status

### Strengths

#### React-Level Optimizations ✅
- **useCallback hooks** extensively used in animation-heavy components (Cubes.tsx, DomeGallery.tsx)
- **useMemo hooks** for expensive computations (dome item positioning, sidebar context)
- **React Query** for automatic cache management and data synchronization
- **Proper cleanup** in useEffect hooks with event listener removal
- **Passive event listeners** for scroll performance

#### Build & Tooling ✅
- **Vite with SWC** for fast compilation and HMR
- **TypeScript** for type safety and better IDE support
- **Tailwind CSS** with content purging
- **CSS Variables** for efficient theming
- **ESLint** for code quality

#### Architecture ✅
- **Component-based** architecture with clear separation of concerns
- **Path aliasing** (`@/*`) for cleaner imports
- **Environment variables** properly scoped with VITE_ prefix
- **Dark mode ready** design system

### Critical Gaps

#### 1. Analytics & Monitoring ❌

**Current State:** No analytics or monitoring infrastructure exists

**Impact:**
- No visibility into user behavior or traffic patterns
- Cannot measure conversion rates or engagement
- No error tracking or debugging in production
- Unable to measure feature adoption or performance

**Missing Tools:**
- Google Analytics / Plausible / Mixpanel
- Sentry or error tracking
- Web Vitals monitoring
- User session recording
- Database query performance tracking

#### 2. Code Splitting & Lazy Loading ⚠️

**Current State:** All routes and components loaded synchronously

**Problems:**
- Initial bundle includes all pages (Home, About, Services, Portfolio, Contact, Admin, Auth)
- Heavy animation components (Cubes: 390 lines, DomeGallery: 462 lines) loaded upfront
- Large dependencies (GSAP, OGL, Recharts) bundled immediately

**Impact on Performance:**
- Larger initial JavaScript bundle download
- Slower Time to Interactive (TTI)
- Poor Lighthouse performance scores
- Wasted bandwidth for users who only visit homepage

**Example - Current App.tsx:**
```typescript
// All imports are synchronous - loaded immediately
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
// ... etc
```

**Recommended - With Lazy Loading:**
```typescript
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
// ... wrap in Suspense with loading state
```

#### 3. Bundle Size Analysis ⚠️

**Current State:** No bundle size visualization or analysis

**Issues:**
- Unknown which dependencies contribute most to bundle size
- Cannot identify duplicate dependencies
- No tree-shaking verification
- Missing source map analysis

**Dependencies Likely Contributing to Size:**
- 21 Radix UI packages (~200KB estimated)
- GSAP (3D animations)
- OGL (WebGL library)
- Recharts (data visualization)
- React Query + Supabase client
- shadcn/ui components (25+ files)

#### 4. Image Optimization ⚠️

**Current State:** Images loaded from Google Cloud Storage CDN with no optimization layer

**Missing Features:**
- Responsive image sizing (srcset)
- Modern format support (WebP, AVIF)
- Lazy loading for offscreen images
- Blur-up placeholders
- Image dimension attributes (causes layout shift)

#### 5. Caching Strategy ⚠️

**Current State:** Browser defaults only

**Missing:**
- Service Worker for offline support
- Precaching of critical assets
- Background sync for form submissions
- Push notifications capability
- Stale-while-revalidate for API calls

---

## 2. Specific Optimization Recommendations

### Priority 1: Implement Analytics & Traffic Metrics (CRITICAL)

**Recommended Stack:**

#### Option A: Privacy-First (Recommended for GDPR Compliance)
```bash
# Plausible Analytics - lightweight, privacy-friendly
npm install plausible-tracker
```

**Benefits:**
- No cookies, GDPR compliant
- Lightweight (<1KB)
- Self-hostable option
- EU-based servers
- Simple dashboard

**Implementation:**
- Add tracker to `main.tsx`
- Track page views, custom events
- Monitor outbound links
- Track 404 errors

#### Option B: Full-Featured
```bash
# Google Analytics 4 + Web Vitals
npm install web-vitals
```

**Benefits:**
- Industry standard
- Advanced segmentation
- Integration with Google Ads
- Free tier generous
- Extensive documentation

**Implementation:**
- GA4 script in `index.html`
- Web Vitals reporting to GA4
- Custom event tracking
- E-commerce tracking (if needed)

#### Option C: Developer-Focused
```bash
# Vercel Analytics (if hosting on Vercel)
npm install @vercel/analytics
```

**Benefits:**
- Zero configuration
- Automatic Web Vitals
- Real-time dashboard
- No impact on performance
- Free on Vercel

### Priority 2: Error Tracking & Monitoring

**Recommended: Sentry**

```bash
npm install @sentry/react @sentry/vite-plugin
```

**Features:**
- Automatic error boundaries
- Source map upload
- User feedback widget
- Performance monitoring
- Release tracking
- Breadcrumbs for debugging

**Implementation:**
```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
});
```

### Priority 3: Code Splitting & Lazy Loading

**Implementation Steps:**

1. **Route-Level Splitting**
   - Convert all page imports to `React.lazy()`
   - Add `<Suspense>` boundary with loading state
   - Estimated savings: 40-50% initial bundle reduction

2. **Component-Level Splitting**
   - Lazy load heavy components:
     - `Cubes.tsx` (desktop only, 390 lines + GSAP)
     - `DomeGallery.tsx` (462 lines + OGL)
     - `Admin.tsx` (admin dashboard, 369 lines)
   - Use dynamic imports: `const Cubes = lazy(() => import('./components/Cubes'))`

3. **Vendor Chunk Splitting**
   - Configure Vite to split vendors
   ```typescript
   // vite.config.ts
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'react-vendor': ['react', 'react-dom', 'react-router-dom'],
           'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
           'animation-vendor': ['gsap', 'ogl'],
         }
       }
     }
   }
   ```

### Priority 4: Web Vitals Monitoring

**Implementation:**

```bash
npm install web-vitals
```

```typescript
// lib/vitals.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_delta: metric.delta,
    });
  }

  // Or send to custom endpoint
  navigator.sendBeacon('/api/analytics', JSON.stringify(metric));
}

// Initialize
onCLS(reportWebVitals);
onFID(reportWebVitals);
onFCP(reportWebVitals);
onLCP(reportWebVitals);
onTTFB(reportWebVitals);
```

**Metrics to Track:**
- **LCP** (Largest Contentful Paint) - Target: <2.5s
- **FID** (First Input Delay) - Target: <100ms
- **CLS** (Cumulative Layout Shift) - Target: <0.1
- **FCP** (First Contentful Paint) - Target: <1.8s
- **TTFB** (Time to First Byte) - Target: <600ms

### Priority 5: Image Optimization

**Recommended Approach:**

1. **Add image dimensions** to prevent layout shift
   ```tsx
   <img src={url} alt={alt} width={600} height={400} />
   ```

2. **Lazy load offscreen images**
   ```tsx
   <img src={url} alt={alt} loading="lazy" />
   ```

3. **Consider using a service** like Cloudinary or ImageKit for automatic optimization

4. **Implement blur-up placeholders**
   ```typescript
   const [loaded, setLoaded] = useState(false);

   return (
     <div style={{ position: 'relative' }}>
       {!loaded && <div className="blur-placeholder" />}
       <img onLoad={() => setLoaded(true)} />
     </div>
   );
   ```

### Priority 6: Bundle Analysis

**Add bundle analyzer:**

```bash
npm install --save-dev rollup-plugin-visualizer
```

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

**Run analysis:**
```bash
npm run build
# Opens interactive bundle size visualization
```

### Priority 7: Performance Budget

**Implement performance budgets in Vite:**

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        // Split heavy dependencies
      }
    }
  },
  chunkSizeWarningLimit: 500, // Warn if chunk > 500KB
}
```

**Lighthouse CI Integration:**
```bash
npm install --save-dev @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "interactive": ["error", { "maxNumericValue": 5000 }],
        "total-blocking-time": ["warn", { "maxNumericValue": 300 }]
      }
    }
  }
}
```

---

## 3. Database & Backend Optimizations

### Current State
- Supabase PostgreSQL backend
- React Query for caching
- Row-level security (RLS) available but not detailed

### Recommendations

1. **Add Database Indexes**
   - `pages.slug` - frequently queried
   - `features.display_order` - used in ordering
   - `gallery_images.display_order` - used in ordering

2. **Implement Query Monitoring**
   - Use Supabase Dashboard to identify slow queries
   - Add query logging for development
   - Monitor connection pool usage

3. **Optimize React Query Configuration**
   ```typescript
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000, // 5 minutes
         cacheTime: 10 * 60 * 1000, // 10 minutes
         refetchOnWindowFocus: false,
         retry: 1,
       },
     },
   });
   ```

4. **Implement Pagination**
   - Currently loads all features/gallery images
   - Add pagination for large datasets
   - Use `range()` in Supabase queries

---

## 4. SEO Optimizations

### Current State
- Dynamic page titles via `usePageTitle` hook
- Basic HTML structure
- No meta tags visible in components

### Missing SEO Features

1. **Meta Tags**
   - No Open Graph tags
   - No Twitter Card tags
   - No structured data (JSON-LD)
   - Missing canonical URLs

2. **Recommended Implementation**
   ```typescript
   // lib/useSEO.ts
   import { useEffect } from 'react';

   export function useSEO({
     title,
     description,
     image,
     url
   }: SEOProps) {
     useEffect(() => {
       // Set title
       document.title = `${title} | LevoAir`;

       // Set meta tags
       updateMetaTag('description', description);
       updateMetaTag('og:title', title);
       updateMetaTag('og:description', description);
       updateMetaTag('og:image', image);
       updateMetaTag('og:url', url);
       updateMetaTag('twitter:card', 'summary_large_image');
     }, [title, description, image, url]);
   }
   ```

3. **Sitemap Generation**
   - Add `vite-plugin-sitemap`
   - Generate sitemap.xml during build
   - Submit to Google Search Console

4. **Robots.txt Enhancement**
   - Currently exists but basic
   - Add sitemap reference
   - Specify crawl delays if needed

---

## 5. Security Recommendations

### Current State
- Environment variables properly scoped
- Supabase handles auth
- No obvious security issues

### Enhancements

1. **Content Security Policy (CSP)**
   ```html
   <!-- index.html -->
   <meta http-equiv="Content-Security-Policy"
         content="default-src 'self';
                  script-src 'self' 'unsafe-inline' https://storage.googleapis.com;
                  img-src 'self' https://storage.googleapis.com data:;
                  connect-src 'self' https://*.supabase.co;">
   ```

2. **Security Headers**
   - Add headers via hosting platform (Vercel/Netlify)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin

3. **Dependency Auditing**
   ```bash
   npm audit
   npm audit fix
   ```

---

## 6. Development Experience Improvements

### Recommended Additions

1. **Prettier for Formatting**
   ```bash
   npm install --save-dev prettier
   ```

2. **Husky + Lint-Staged**
   - Pre-commit hooks for linting
   - Automatic formatting on commit

3. **Component Documentation**
   - Add Storybook for component library
   - Document props and usage examples

4. **Testing Infrastructure**
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```

---

## 7. Estimated Performance Impact

### Before Optimizations (Estimated)
- **Initial Bundle Size:** ~800KB - 1.2MB (uncompressed)
- **Time to Interactive:** 3-5 seconds (3G)
- **Lighthouse Score:** 70-80/100
- **First Contentful Paint:** 2-3 seconds
- **Analytics Coverage:** 0%

### After Optimizations (Projected)
- **Initial Bundle Size:** ~300-400KB (with code splitting)
- **Time to Interactive:** 1.5-2.5 seconds (3G)
- **Lighthouse Score:** 90-95/100
- **First Contentful Paint:** 1-1.5 seconds
- **Analytics Coverage:** 100% with actionable insights

### ROI Metrics
- **40-50% reduction** in initial JavaScript bundle
- **50-60% faster** Time to Interactive
- **Complete visibility** into user behavior and errors
- **Proactive error detection** before users report issues
- **Data-driven decisions** based on actual usage patterns

---

## 8. Traffic Metrics & Monitoring - Implementation Plan

### Recommended Solution: Multi-Layer Approach

#### Layer 1: Lightweight Analytics (Plausible)
**Why:** Privacy-first, GDPR compliant, minimal performance impact

**Tracks:**
- Page views and unique visitors
- Traffic sources (referrers, UTM parameters)
- Geographic location (country/region)
- Device type and browser
- Custom events (button clicks, form submissions)

**Cost:** $9/month for up to 10k monthly pageviews

#### Layer 2: Error Tracking (Sentry)
**Why:** Best-in-class error tracking with React integration

**Tracks:**
- JavaScript errors and exceptions
- Network failures
- Performance issues
- User session replays
- Source map integration for stack traces

**Cost:** Free tier (5k events/month) suitable for most sites

#### Layer 3: Web Vitals (Custom)
**Why:** Google ranking factor, measures real user experience

**Tracks:**
- Core Web Vitals (LCP, FID, CLS)
- Custom performance marks
- Network timing
- Resource loading times

**Cost:** Free (send to Plausible or GA4)

#### Layer 4: Database Monitoring (Supabase Built-in)
**Why:** Already included with Supabase

**Tracks:**
- Query performance
- Connection pool usage
- API request logs
- Authentication events

**Cost:** Included with Supabase plan

### Implementation Timeline

**Phase 1 (Week 1): Core Analytics**
- Install Plausible or GA4
- Track basic page views
- Set up custom events
- Configure goals/conversions

**Phase 2 (Week 2): Error Tracking**
- Install Sentry
- Configure source maps
- Set up error alerts
- Add user feedback widget

**Phase 3 (Week 3): Performance Monitoring**
- Implement Web Vitals tracking
- Add custom performance marks
- Set up performance budgets
- Configure Lighthouse CI

**Phase 4 (Week 4): Optimization**
- Implement code splitting
- Add lazy loading
- Optimize images
- Set up bundle analysis

---

## 9. Action Items Summary

### Immediate (This Sprint)
- [ ] Install analytics package (Plausible or GA4)
- [ ] Set up Sentry error tracking
- [ ] Add Web Vitals monitoring
- [ ] Configure bundle analyzer

### Short-Term (Next Sprint)
- [ ] Implement lazy loading for routes
- [ ] Add code splitting for heavy components
- [ ] Optimize images (dimensions, lazy loading)
- [ ] Set up performance budgets

### Medium-Term (Next Month)
- [ ] Add SEO meta tags and Open Graph
- [ ] Implement service worker for offline support
- [ ] Add automated Lighthouse CI checks
- [ ] Create performance dashboard

### Long-Term (Ongoing)
- [ ] Monitor and optimize based on real user data
- [ ] A/B testing infrastructure
- [ ] Advanced caching strategies
- [ ] CDN optimization

---

## 10. Conclusion

The LevoAir website has a solid technical foundation with modern tooling and good React practices. The most critical gap is the **complete absence of analytics and monitoring infrastructure**, which means you're currently flying blind regarding user behavior, performance, and errors.

**Top 3 Priorities:**
1. **Add Analytics & Traffic Monitoring** - Critical for understanding users
2. **Implement Error Tracking** - Essential for production stability
3. **Add Code Splitting** - Significant performance improvement

Implementing these recommendations will provide:
- **Complete visibility** into site usage and performance
- **40-50% faster load times** through code splitting
- **Proactive error detection** before users report issues
- **Data-driven insights** for business decisions
- **Better SEO** through performance improvements

---

**Report Prepared By:** Claude Code AI Assistant
**Next Steps:** Review recommendations and prioritize based on business goals. Ready to implement traffic metrics and monitoring as the first priority.
