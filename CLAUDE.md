# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting Development
```bash
npm run dev          # Start dev server at http://localhost:8080
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.20 with React SWC plugin
- **Styling**: Tailwind CSS 3.4.17 with shadcn/ui components
- **Routing**: React Router v6.30.1
- **State Management**: React Query (TanStack Query 5.83.0)
- **Backend**: Supabase (authentication, database)
- **Animations**: GSAP 3.13.0, OGL 1.0.11 (WebGL particles)
- **Form Handling**: React Hook Form 7.61.1 with Zod 3.25.76 validation
- **Gestures**: @use-gesture/react 10.3.1
- **Analytics**: Google Analytics 4, Web Vitals 5.1.0

### Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (50+ auto-generated)
│   ├── layout/          # Navbar, Footer, Particles
│   ├── home/            # Home page sections (HeroSection, FeaturesSection, CTASection)
│   ├── Cubes.tsx        # 3D cube grid animation (desktop hero)
│   ├── Squares.tsx      # Diagonal squares animation (mobile hero)
│   └── SpotlightCard.tsx # Card with spotlight hover effect
├── pages/               # Route pages
│   ├── Home.tsx         # Landing page
│   ├── Services.tsx     # Services showcase
│   ├── About.tsx        # Company info with particle effects
│   ├── Contact.tsx      # Contact form with LeadConnector
│   ├── Auth.tsx         # Admin authentication
│   ├── BrandKit.tsx     # Brand design system
│   └── NotFound.tsx     # 404 page
├── lib/
│   ├── analytics.ts     # GA4 event tracking
│   ├── webVitals.ts     # Core Web Vitals monitoring
│   ├── usePageTitle.ts  # Document title hook
│   └── utils.ts         # Utility functions
├── hooks/
│   ├── use-toast.ts     # Toast notifications
│   └── useIsMobile.tsx  # Responsive breakpoint hook (768px)
├── integrations/
│   └── supabase/        # Supabase client and types (auto-generated)
└── index.css            # Global styles with HSL variables & custom gradients
```

### Application Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with animated hero, features, CTA |
| `/services` | Services | Dynamic service showcase from Supabase |
| `/about` | About | Mission, values, particle effects |
| `/contact` | Contact | LeadConnector iframe + Supabase backup |
| `/auth` | Auth | Admin login/signup |
| `/brand-kit` | BrandKit | Color system, typography, design assets |
| `*` | NotFound | 404 catch-all |

### Key Architectural Patterns

#### Routing
- All routes defined in `src/App.tsx` with `BrowserRouter`
- Uses `import.meta.env.BASE_URL` for basename (currently "/")
- **IMPORTANT**: Add custom routes ABOVE the catch-all "*" route that renders NotFound
- Lazy loading available but not currently implemented

#### Path Aliases
The project uses `@/` alias for all imports:
```typescript
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
```

#### Component Organization
- **Layout components**: Shared across all pages (Navbar, Footer, Particles)
- **Page-specific components**: Organized in subdirectories (e.g., `components/home/HeroSection.tsx`)
- **UI components**: Auto-generated shadcn/ui primitives in `components/ui/`
- **Shared utilities**: Cubes, Squares, SpotlightCard in `components/`

#### Data Fetching Pattern
Pages use React Query with Supabase for all data operations:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ["unique-key"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("table_name")
      .select("*")
      .order("display_order");
    if (error) throw error;
    return data;
  },
});
```

For mutations:
```typescript
const mutation = useMutation({
  mutationFn: async (newData) => {
    const { error } = await supabase
      .from("table_name")
      .insert(newData);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["unique-key"] });
  },
});
```

#### Styling System
- **Tailwind CSS** with custom HSL color system in `index.css`
- **Dark mode**: class-based via `next-themes`
- **Color variables**: All colors use HSL format for easy theming
  - Primary: `hsl(43 84% 55%)` - Gold #E6B325
  - Accent: `hsl(38 90% 50%)` - Bright Gold #F2A818
  - Background: `hsl(0 0% 5%)` - Near Black #0D0D0D
  - Card: `hsl(0 0% 8%)` - Dark Gray #141414
- **Custom utilities**:
  - `.gradient-primary` - Primary gradient overlay
  - `.gradient-radial` - Radial gradient
  - `.text-gradient` - Gradient text effect
  - `.blur-orb-*` - Animated blur orbs
- **shadcn/ui** provides component variants via `class-variance-authority`

#### Navigation Behavior
The Navbar (`src/components/layout/Navbar.tsx`) implements scroll-based animations:
- **Desktop (≥768px)**:
  - Header collapses when scrolling down (hides nav links, shows only logo)
  - Expands when scrolling up
  - Uses GSAP for smooth transitions
- **Mobile (<768px)**:
  - No scroll animations (always visible)
  - Right-aligned staggered menu animation
- **Breakpoint**: 768px (Tailwind `md`)
- **Logo**: Google Cloud Storage CDN

#### Supabase Integration
- **Client**: `src/integrations/supabase/client.ts`
- **Environment variables**:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Types**: Auto-generated in `src/integrations/supabase/types.ts`
- **Auth**: Email/password with localStorage session persistence
- **Database tables**:
  - `pages` - Page content
  - `hero_sections` - Home hero data
  - `features` - Home features grid
  - `services` - Services page content
  - `contact_submissions` - Form submissions
  - `user_roles` - Admin access control

#### Analytics Integration
**Google Analytics 4** (ID: G-5JW58TC1K5):
- Configured in `src/lib/analytics.ts`
- **Event tracking**: Custom events throughout app
  - Navigation clicks, CTA clicks, form submissions
  - Service views, social media clicks
  - File downloads, scroll depth tracking
- **Web Vitals**: Core Web Vitals monitoring in `src/lib/webVitals.ts`
  - LCP, FCP, CLS, TTFB, INP
  - Automatically reported to GA4
- **Production only**: Analytics disabled in development

## Adding shadcn/ui Components

To add new shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Components are automatically configured via `components.json` with:
- Style: default
- Base color: slate
- CSS variables: enabled
- Path aliases pre-configured (@/)

Currently installed (50+ components):
- Forms: input, textarea, label, checkbox, radio-group, select, switch, calendar, slider
- Dialogs: dialog, drawer, alert-dialog, sheet
- Data: card, table, badge, avatar, tabs, accordion, carousel
- Feedback: toast, toaster, sonner
- Navigation: button, breadcrumb, command, navigation-menu, menubar
- Other: popover, tooltip, progress, separator, scroll-area, hover-card

## TypeScript Configuration

The project uses **relaxed TypeScript settings** for faster development:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`

This allows for more flexible development but be mindful of potential type issues in production.

## Environment Variables

Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

These are required for Supabase authentication and database access.

## Custom Animations

### Particles Component
Located in `src/components/layout/Particles.tsx`, uses **OGL** for WebGL particle systems.

Configurable properties:
```typescript
<Particles
  particleCount={50}           // Number of particles
  particleSpread={80}          // Spread area
  speed={0.5}                  // Rotation speed
  particleColors={["#E6B325", "#F2A818"]}  // Color array
  moveParticlesOnHover={true}  // Mouse interaction
  particleHoverFactor={3}      // Hover displacement
  alphaParticles={0.6}         // Opacity
  particleBaseSize={0.8}       // Base size
  sizeRandomness={1.5}         // Size variation
  cameraDistance={35}          // Camera Z position
  disableRotation={false}      // Freeze rotation
/>
```

Used on About page for immersive background effects.

### Cubes Component
Located in `src/components/Cubes.tsx`, creates 3D rotating cube grid using **GSAP**.

Features:
- Desktop hero background (mobile uses Squares)
- Configurable grid size, rotation speed, colors
- CSS 3D transforms with perspective
- Infinite rotation animations

### Squares Component
Located in `src/components/Squares.tsx`, diagonal moving squares animation.

Features:
- Mobile hero background
- Pure CSS animations
- Lightweight alternative to 3D cubes

### GSAP Animations
GSAP is available globally for:
- Page transitions
- Scroll-triggered animations
- Complex timeline sequences
- Navbar collapse/expand

Import: `import { gsap } from "gsap";`

## Performance & SEO

### Performance Features
- **Vite SWC Plugin**: Fast transpilation with Rust-based SWC
- **React 18**: Concurrent rendering, automatic batching
- **Web Vitals Monitoring**: Real-time performance tracking
- **Optimized Images**: CDN delivery via Google Cloud Storage
- **Code Splitting**: Available via React Router lazy loading (not currently used)

### SEO Features
- **Dynamic Titles**: `usePageTitle` hook updates document.title
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Meta Tags**: Open Graph support
- **Sitemap Ready**: All routes are static and crawlable
- **Responsive Images**: Proper sizing and lazy loading ready

## Deployment

### Build Configuration
- **Base path**: "/" (root-relative)
- **Production builds**: Exclude development tools (lovable-tagger)
- **Asset optimization**: Vite automatically optimizes static assets
- **Environment**: Uses `import.meta.env.PROD` for production checks
- **Port**: Development server runs on 8080

### Deployment Checklist
1. Set environment variables in hosting platform
2. Run `npm run build` to create production build
3. Deploy `dist/` directory
4. Configure redirects for SPA routing (all routes → index.html)
5. Verify Supabase connection and analytics

### GitHub Pages Deployment
The project includes `gh-pages` package:
```bash
npm run build
npx gh-pages -d dist
```

## External Integrations

### LeadConnector (Contact Form)
- Embedded iframe on Contact page
- Form ID: `jKx3hSzkoiVBg6qHF8S2`
- URL: `https://api.leadconnectorhq.com/widget/form/`
- Fallback: Supabase `contact_submissions` table

### Google Cloud Storage
- Logo and image CDN
- Domain: `storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/`

### Instatus (System Status)
- Status page: https://levoair.instatus.com/
- Linked in footer "System Status"

### LinkedIn
- Company page: https://www.linkedin.com/company/levoair/
- Icon in footer social links

## Development Tips

### Common Tasks

**Adding a new page:**
1. Create page component in `src/pages/NewPage.tsx`
2. Add route to `src/App.tsx` ABOVE the NotFound catch-all route
3. Update Navbar links in `src/components/layout/Navbar.tsx`
4. Add link to Footer if needed

**Adding a new feature to homepage:**
1. Create component in `src/components/home/NewSection.tsx`
2. Import and add to `src/pages/Home.tsx`
3. Fetch data via React Query if dynamic

**Tracking a new event:**
```typescript
import { trackEvent } from "@/lib/analytics";

trackEvent("category", "action", "label", value);
// Example:
trackEvent("Engagement", "Button Click", "Download Brochure");
```

**Using the mobile breakpoint:**
```typescript
import { useIsMobile } from "@/hooks/useIsMobile";

const isMobile = useIsMobile(); // true if < 768px
```

### Debugging
- Check browser console for errors
- Verify Supabase connection in Network tab
- Use React Query Devtools (available in dev mode)
- Check GA4 events in browser console (development mode logs events)

### Code Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use TypeScript types for props (even if relaxed)
- Follow existing naming conventions
- Keep components focused and single-purpose
- Extract repeated logic into custom hooks
