# Google Analytics 4 Integration - Setup Guide

This document describes the Google Analytics 4 implementation in the LevoAir website.

## Overview

The website now includes comprehensive analytics tracking with:
- **Google Analytics 4 (GA4)** - Traffic and behavior tracking
- **Web Vitals** - Core Web Vitals performance metrics
- **Custom Event Tracking** - User interactions and conversions

---

## Implementation Details

### 1. Google Analytics Installation

**Location:** `index.html` (lines 10-18)

The GA4 tracking script is loaded in the HTML head:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5JW58TC1K5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-5JW58TC1K5');
</script>
```

**Tracking ID:** `G-5JW58TC1K5`

### 2. Web Vitals Tracking

**Location:** `src/lib/webVitals.ts`

Tracks Core Web Vitals and sends them to GA4:

- **LCP** (Largest Contentful Paint) - Loading performance
- **FID** (First Input Delay) - Interactivity (legacy)
- **INP** (Interaction to Next Paint) - Responsiveness
- **CLS** (Cumulative Layout Shift) - Visual stability
- **FCP** (First Contentful Paint) - Initial render
- **TTFB** (Time to First Byte) - Server response

**Initialization:** Automatically initialized in `src/main.tsx` on app load.

**Behavior:**
- Only tracks in production (skips in development mode)
- Sends metrics as GA4 events with `event_category: 'Web Vitals'`
- Includes performance ratings (good/needs-improvement/poor) based on Google's thresholds

### 3. Custom Event Tracking

**Location:** `src/lib/analytics.ts`

Type-safe utility functions for tracking user interactions:

#### Available Tracking Functions

| Function | Purpose | Example Usage |
|----------|---------|---------------|
| `trackPageView(path, title)` | Track SPA navigation | Auto-tracked on route change |
| `trackCTAClick(label, location)` | Track CTA button clicks | Hero section, footer CTAs |
| `trackContactClick(method, value)` | Track email/phone clicks | Contact page interactions |
| `trackNavigation(text, destination)` | Track nav menu clicks | Main navigation |
| `trackFormSubmission(name, success, error)` | Track form submissions | Contact forms |
| `trackGalleryInteraction(action, imageId)` | Track gallery usage | Portfolio interactions |
| `trackServiceView(title)` | Track service page views | Services page |
| `trackOutboundLink(url, text)` | Track external links | Partner sites, social media |
| `trackDownload(fileName, url)` | Track file downloads | PDFs, brochures |
| `trackSocialClick(platform, url)` | Track social media clicks | Footer social links |
| `trackScrollDepth(percentage, path)` | Track page engagement | 25%, 50%, 75%, 100% milestones |

#### Example Usage

```typescript
import { trackCTAClick, trackContactClick } from '@/lib/analytics';

// Track a CTA button click
<button onClick={() => trackCTAClick('Get Started', 'hero_section')}>
  Get Started
</button>

// Track email link click
<a href="mailto:info@levoair.com" onClick={() => trackContactClick('email', 'info@levoair.com')}>
  Email Us
</a>
```

### 4. Automatic Tracking

The following events are tracked automatically:

- **Page Views:** Every route change in the SPA
- **Web Vitals:** All Core Web Vitals on page load

### 5. Current Implementation Status

✅ **Implemented:**
- GA4 script installation
- Web Vitals tracking
- Page view tracking (automatic)
- Hero CTA click tracking
- Contact page email click tracking
- Type-safe analytics utilities

⏳ **Not Yet Implemented (Optional):**
- Gallery image click tracking
- Scroll depth tracking
- Navigation menu tracking
- Footer link tracking
- Social media click tracking
- Form submission tracking (LeadConnector iframe)

---

## Viewing Analytics Data

### Google Analytics Dashboard

1. Visit [Google Analytics](https://analytics.google.com/)
2. Select your property (LevoAir - G-5JW58TC1K5)
3. Navigate to **Reports** to see:
   - Real-time traffic
   - User demographics
   - Traffic sources
   - Page views and engagement
   - Custom events

### Web Vitals in GA4

To view Web Vitals data:

1. Go to **Explore** → **Create a new exploration**
2. Add dimensions: `Event name`, `Metric rating`
3. Add metrics: `Event count`, `Metric value`
4. Filter by `Event category` = "Web Vitals"

You'll see metrics like:
- LCP values and ratings
- CLS values and ratings
- INP values and ratings
- etc.

### Custom Events

To view custom events:

1. Go to **Reports** → **Engagement** → **Events**
2. You'll see all tracked events:
   - `page_view` - Page navigation
   - `cta_click` - CTA button clicks
   - `email_click` - Email link clicks
   - `LCP`, `CLS`, `INP`, etc. - Web Vitals
   - And any other custom events you add

---

## Adding More Tracking

### Track a New CTA Button

```tsx
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('Download Brochure', 'services_section')}>
  Download Brochure
</button>
```

### Track Gallery Image Clicks

```tsx
import { trackGalleryInteraction } from '@/lib/analytics';

// In DomeGallery.tsx or Portfolio page
const handleImageClick = (imageId: string) => {
  trackGalleryInteraction('click', imageId);
  // ... rest of your logic
};
```

### Track Navigation Menu Clicks

```tsx
import { trackNavigation } from '@/lib/analytics';

// In Navbar.tsx
<Link to="/about" onClick={() => trackNavigation('About', '/about')}>
  About
</Link>
```

### Track Outbound Links

```tsx
import { trackOutboundLink } from '@/lib/analytics';

<a
  href="https://example.com"
  target="_blank"
  onClick={() => trackOutboundLink('https://example.com', 'Partner Website')}
>
  Visit Partner
</a>
```

---

## Performance Considerations

### Impact on Load Time

- **GA4 Script:** ~17KB gzipped, loaded asynchronously (no blocking)
- **web-vitals Package:** ~1KB gzipped
- **Analytics Utilities:** <1KB (tree-shakeable)

**Total Impact:** Minimal (~18-20KB), loaded async, no render blocking.

### Privacy & GDPR

**Current Implementation:**
- Uses Google Analytics 4 (complies with GDPR if configured properly)
- No personally identifiable information (PII) is tracked by default
- IP addresses are anonymized by GA4 by default

**To make fully GDPR compliant:**
1. Add a cookie consent banner
2. Only load GA4 after user consent
3. Add privacy policy explaining analytics usage
4. Consider using cookieless tracking or privacy-first alternatives (Plausible, Fathom)

**Example Cookie Consent Integration:**

```typescript
// In main.tsx or App.tsx
import { initWebVitals } from '@/lib/webVitals';

// Only initialize after user consent
const userConsented = getCookieConsent(); // Your cookie consent logic

if (userConsented) {
  initWebVitals();
}
```

---

## Debugging

### Check if Analytics is Working

Open browser console and look for logs:

```
[Analytics] Event tracked: cta_click {event_category: 'engagement', ...}
[Web Vitals] LCP: 1234ms - good
```

### Test in Development

Web Vitals tracking is disabled in development by default. To enable:

```typescript
// src/lib/webVitals.ts
export const initWebVitals = (): void => {
  // Comment out this check to test in dev:
  // if (import.meta.env.DEV) {
  //   console.log('[Web Vitals] Skipping in development mode');
  //   return;
  // }

  // ... rest of code
};
```

### Real-Time Testing

1. Open GA4 → **Reports** → **Realtime**
2. Perform actions on your site
3. Events should appear within ~10 seconds

---

## Troubleshooting

### Events Not Showing in GA4

**Possible Causes:**
1. GA4 property not configured correctly
2. Tracking ID mismatch
3. Ad blockers preventing script load
4. Events need 24-48 hours to appear in some reports (Real-time is instant)

**Solution:**
- Check browser Network tab for `https://www.google-analytics.com/g/collect` requests
- Disable ad blockers for testing
- Use GA4 DebugView for real-time debugging

### Web Vitals Not Tracking

**Possible Causes:**
1. Running in development mode (intentionally disabled)
2. Google Analytics not loaded
3. User navigated away before metrics were collected

**Solution:**
- Check console for Web Vitals logs
- Test in production build: `npm run build && npm run preview`

---

## Next Steps & Recommendations

### Immediate
- [x] GA4 installed and configured
- [x] Web Vitals tracking active
- [x] Basic event tracking (page views, CTAs)

### Short-Term (Recommended)
- [ ] Add tracking to all CTA buttons
- [ ] Track gallery interactions
- [ ] Track navigation menu clicks
- [ ] Add scroll depth tracking
- [ ] Track social media clicks
- [ ] Add cookie consent banner for GDPR compliance

### Medium-Term
- [ ] Set up GA4 conversion goals
- [ ] Create custom dashboards for key metrics
- [ ] Set up alerts for performance issues (Web Vitals)
- [ ] Implement A/B testing
- [ ] Add user journey funnels

### Long-Term
- [ ] Consider adding Sentry for error tracking
- [ ] Implement session recording (Hotjar, FullStory)
- [ ] Advanced segmentation and cohort analysis
- [ ] Marketing attribution tracking

---

## Support & Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/topic/9303319)
- [Web Vitals Guide](https://web.dev/vitals/)
- [GA4 Event Tracking Best Practices](https://support.google.com/analytics/answer/9267735)

---

**Last Updated:** October 22, 2025
**Implemented By:** Claude Code AI Assistant
