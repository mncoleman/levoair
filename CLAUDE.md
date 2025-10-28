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
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC plugin
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase (authentication, database)
- **Animations**: GSAP, OGL (WebGL particles)
- **Form Handling**: React Hook Form with Zod validation

### Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── layout/          # Navbar, Footer, Particles
│   ├── home/            # Home page sections (HeroSection, FeaturesSection, CTASection, ServicesSection)
│   └── *.tsx            # Shared components (Cubes, DomeGallery, Squares)
├── pages/               # Route pages (Home, About, Services, Portfolio, Contact, Auth, Admin)
├── lib/                 # Utilities (utils.ts, usePageTitle.ts)
├── hooks/               # Custom hooks (use-toast.ts)
├── integrations/
│   └── supabase/        # Supabase client and types (auto-generated)
└── index.css            # Global styles with Tailwind directives
```

### Key Architectural Patterns

#### Routing
- All routes defined in `src/App.tsx` with `BrowserRouter`
- Uses `import.meta.env.BASE_URL` for basename
- Add custom routes ABOVE the catch-all "*" route that renders NotFound

#### Path Aliases
The project uses `@/` alias for imports:
```typescript
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
```

#### Component Organization
- **Layout components**: Shared across pages (Navbar, Footer)
- **Page-specific components**: Organized by page in subdirectories (e.g., `components/home/`)
- **UI components**: Auto-generated shadcn/ui primitives in `components/ui/`

#### Data Fetching Pattern
Pages use React Query with Supabase:
```typescript
const { data } = useQuery({
  queryKey: ["unique-key"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("table_name")
      .select("*");
    if (error) throw error;
    return data;
  },
});
```

#### Styling System
- Tailwind CSS with custom HSL color system defined in `index.css`
- Uses CSS variables for theming (supports dark mode via class)
- Custom gradient utility: `.gradient-primary`
- shadcn/ui provides component variants via `class-variance-authority`

#### Navigation Behavior
The Navbar implements scroll-based animations:
- Desktop: Header collapses on scroll down, expands on scroll up
- Mobile: No scroll animations (always visible)
- Responsive breakpoint: 768px (md)

#### Supabase Integration
- Client configured in `src/integrations/supabase/client.ts`
- Requires environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- Auto-generated types in `src/integrations/supabase/types.ts`
- Auth storage uses localStorage with session persistence

## Adding shadcn/ui Components

To add new shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Components are automatically configured via `components.json` with:
- Style: default
- Base color: slate
- CSS variables: enabled
- Path aliases pre-configured

## TypeScript Configuration

The project uses relaxed TypeScript settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`

This allows for more flexible development but be mindful of potential type issues.

## Environment Variables

Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## Custom Animations

### Particles Component
Located in `src/components/layout/Particles.tsx`, uses OGL for WebGL particle systems. Configurable properties:
- `particleCount`, `particleSpread`, `speed`
- `particleColors` (hex array)
- `moveParticlesOnHover`, `particleHoverFactor`
- `alphaParticles`, `particleBaseSize`, `sizeRandomness`
- `cameraDistance`, `disableRotation`

### GSAP Animations
GSAP is available for page transitions and complex animations. Import from `gsap` package.

## Deployment

The site is configured for deployment with:
- Base path: "/" (root-relative)
- Production builds exclude development tools (lovable-tagger)
- Static assets optimized via Vite
