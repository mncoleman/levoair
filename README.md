<div align="center">

# LevoAir

**Professional Drone Data Collection Services**

[![System Status](https://img.shields.io/badge/status-operational-brightgreen?style=for-the-badge&logo=statuspage)](https://levoair.instatus.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)

[**Live Demo**](https://levoair.com) • [**System Status**](https://levoair.instatus.com/) • [**Documentation**](CLAUDE.md)

</div>

---

## Overview

LevoAir is a modern, high-performance web application built with cutting-edge technologies to showcase professional drone services. Featuring WebGL particle effects, smooth GSAP animations, and an intelligent navigation system, the site delivers a premium user experience across all devices.

### Key Highlights

- **WebGL Particle Effects** - Immersive backgrounds using OGL rendering
- **Scroll-Based Animations** - Intelligent navbar with GSAP-powered transitions
- **Real-Time Analytics** - Google Analytics 4 with Web Vitals tracking
- **Mobile-First Design** - Optimized for all screen sizes with responsive breakpoint at 768px

---

## Tech Stack

### Core Framework
```
React 18.3.1  •  TypeScript 5.8.3  •  Vite 5.4.20  •  React Router 6.30.1
```

### UI & Styling
- **Tailwind CSS** 3.4.17 - Utility-first styling with HSL color system
- **shadcn/ui** - 50+ accessible, customizable components
- **Radix UI** - Unstyled primitives for complex interactions
- **Lucide React** - 460+ beautiful icons

### Animations & Graphics
- **GSAP** 3.13.0 - Professional-grade animations
- **OGL** 1.0.11 - Lightweight WebGL library for particles
- **@use-gesture** 10.3.1 - Touch/mouse gesture recognition

### Forms & Validation
- **React Hook Form** 7.61.1 - Performant form handling
- **Zod** 3.25.76 - TypeScript-first schema validation
- **LeadConnector** - CRM integration for contact forms

### Analytics & Monitoring
- **Google Analytics 4** - Event tracking and user insights
- **Web Vitals** 5.1.0 - Core Web Vitals monitoring (LCP, FCP, CLS, INP)

---

## Getting Started

### Prerequisites

- **Node.js** 16+ and **npm** 9+
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slider003/levoair.git
   cd levoair
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:8080](http://localhost:8080)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Production build with optimizations |
| `npm run build:dev` | Development build with debugging tools |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code analysis |

---

## Project Structure

```
levoair/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (50+)
│   │   ├── layout/          # Navbar, Footer, Particles
│   │   ├── home/            # Home page sections
│   │   ├── Cubes.tsx        # Cube grid animation (desktop hero)
│   │   ├── Squares.tsx      # Diagonal squares (mobile hero)
│   │   └── SpotlightCard.tsx
│   ├── pages/               # Route components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Auth.tsx
│   │   ├── BrandKit.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── analytics.ts     # GA4 event tracking
│   │   ├── webVitals.ts     # Performance monitoring
│   │   ├── usePageTitle.ts  # SEO helper
│   │   └── utils.ts
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External service integrations
│   ├── App.tsx              # Route definitions
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── CLAUDE.md                # AI development guide
├── components.json          # shadcn/ui config
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite build config
└── package.json
```

---

## Features

### Public Features

#### WebGL Particle Effects
- 50+ particles with configurable colors
- Mouse hover interactions
- Smooth OGL rendering at 60fps
- Used on About page for immersive backgrounds

#### Animated Hero Section
- **Desktop**: Rotating cube grid with GSAP
- **Mobile**: Diagonal moving squares (lightweight)
- Gradient blur orbs
- Responsive animations at 768px breakpoint

#### Smart Navigation
- Scroll-based collapse/expand (desktop only)
- GSAP-powered smooth transitions
- Mobile staggered menu with right-align
- Active route highlighting

#### Contact Integration
- LeadConnector embedded form
- Form validation with Zod
- Success/error toast notifications

---

## Analytics & Performance

### Google Analytics 4 Integration

Custom event tracking throughout the application:

- **Navigation**: Page views, link clicks, route changes
- **Engagement**: CTA clicks, service views
- **Conversions**: Form submissions, contact method clicks
- **Social**: LinkedIn, email, phone clicks
- **Downloads**: File download tracking
- **Scroll Depth**: 25%, 50%, 75%, 100% tracking

### Web Vitals Monitoring

Real-time performance metrics:

| Metric | Description | Target |
|--------|-------------|--------|
| **LCP** | Largest Contentful Paint | < 2.5s |
| **FCP** | First Contentful Paint | < 1.8s |
| **CLS** | Cumulative Layout Shift | < 0.1 |
| **TTFB** | Time to First Byte | < 800ms |
| **INP** | Interaction to Next Paint | < 200ms |

All metrics are automatically reported to Google Analytics 4.

---

## Configuration

### Tailwind CSS Theme

The project uses a custom HSL color system for easy theming:

```css
--primary: 43 84% 55%      /* Gold #E6B325 */
--accent: 38 90% 50%       /* Bright Gold #F2A818 */
--background: 0 0% 5%      /* Near Black #0D0D0D */
--card: 0 0% 8%            /* Dark Gray #141414 */
```

Custom utility classes:
- `.gradient-primary` - Primary gradient overlay
- `.gradient-radial` - Radial gradient backgrounds
- `.text-gradient` - Gradient text effects
- `.blur-orb-*` - Animated blur orbs

### shadcn/ui Configuration

Automatically configured via `components.json`:

```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Add new components:
```bash
npx shadcn@latest add [component-name]
```

### TypeScript Configuration

Relaxed settings for faster development:

```json
{
  "noImplicitAny": false,
  "strictNullChecks": false,
  "noUnusedParameters": false,
  "noUnusedLocals": false
}
```

---

## Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory with optimized assets

### Deployment Checklist

- [ ] Configure SPA redirects (all routes → `index.html`)
- [ ] Confirm analytics tracking
- [ ] Check Core Web Vitals

### GitHub Pages Deployment

```bash
npm run build
npx gh-pages -d dist
```

---

## External Integrations

### LeadConnector CRM

Contact form integration:
- Form ID: `jKx3hSzkoiVBg6qHF8S2`
- Embedded iframe on Contact page

### Google Cloud Storage

CDN for static assets:
- Domain: `storage.googleapis.com/msgsndr/7uhnbFFpRMtL0wOChwmZ/media/`
- Used for logo and brand images

### Instatus

System status monitoring:
- Status page: https://levoair.instatus.com/
- Linked in footer under "System Status"

---

## Development

### Adding a New Page

1. Create page component in `src/pages/NewPage.tsx`
2. Add route to `src/App.tsx` **ABOVE** the NotFound catch-all
3. Update `src/components/layout/Navbar.tsx` with link
4. (Optional) Add link to `src/components/layout/Footer.tsx`

### Tracking Custom Events

```typescript
import { trackEvent } from "@/lib/analytics";

// Track button click
trackEvent("Engagement", "Button Click", "Download Brochure");

// Track page view
trackEvent("Navigation", "Page View", "Services");
```

### Using Responsive Breakpoint

```typescript
import { useIsMobile } from "@/hooks/useIsMobile";

const Component = () => {
  const isMobile = useIsMobile(); // true if width < 768px

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};
```

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Note:** WebGL features require modern browser with GPU acceleration.

---

## Contributing

1. Fork the project
2. Create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

---

## Resources

- **Documentation**: [CLAUDE.md](CLAUDE.md) - Comprehensive development guide
- **System Status**: [levoair.instatus.com](https://levoair.instatus.com/)
- **LinkedIn**: [linkedin.com/company/levoair](https://www.linkedin.com/company/levoair/)
- **Email**: info@levoair.com

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Vite**

[![Status](https://img.shields.io/badge/status-operational-brightgreen?style=flat-square)](https://levoair.instatus.com/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://react.dev)

</div>
