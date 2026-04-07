# Area — Marketing Landing Page

A responsive marketing landing page for the **Area** data analytics and browsing platform, faithfully translated from Figma design mockups into production-ready front-end code. Built with Next.js 16, TypeScript, and Tailwind CSS v4.

---

## Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| [Next.js](https://nextjs.org/) | 16.2.2 | React framework (App Router, Turbopack) |
| [React](https://react.dev/) | 19 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Static type checking (strict mode) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.2 | Utility-first CSS with `@theme` configuration |
| [lucide-react](https://lucide.dev/) | 1.7+ | Tree-shakable SVG icon library |
| [Node.js](https://nodejs.org/) | ≥20.9 | Runtime environment (22.x recommended) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.9 (22.x recommended)
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd figma-sandbox

# Install dependencies
npm install
```

### Development

```bash
# Start the development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start development server with Turbopack hot reload |
| Build | `npm run build` | Create an optimized production build |
| Start | `npm run start` | Serve the production build locally |
| Lint | `npm run lint` | Run ESLint checks across the codebase |
| Test | `npm test` | Run the Jest test suite |

---

## Project Structure

```
├── __tests__/               # Unit and integration tests
│   ├── components/          # Component-level tests
│   └── pages/               # Page-level integration tests
├── public/                  # Static assets served at root
│   └── images/
│       └── logos/           # Brand and partner logo SVGs
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── globals.css      # Tailwind imports and @theme design tokens
│   │   ├── layout.tsx       # Root HTML layout with fonts and metadata
│   │   ├── page.tsx         # Home page composing all sections
│   │   └── not-found.tsx    # Custom 404 page
│   ├── components/
│   │   ├── layout/          # Navbar, MobileMenu, Footer
│   │   ├── sections/        # Page section components (Hero, Benefits, etc.)
│   │   └── ui/              # Reusable UI components (Button, Card, etc.)
│   ├── lib/                 # Constants, content data, and utilities
│   └── types/               # Shared TypeScript interfaces
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Responsive Breakpoints

The landing page implements three responsive breakpoints derived from the Figma design, using a mobile-first CSS approach:

| Breakpoint | Width Range | Tailwind Prefix | Description |
|------------|-------------|-----------------|-------------|
| **Mobile** | 1px – 799px | _(default)_ | Base mobile-first styles |
| **Tablet** | 800px – 1279px | `md:` | Intermediate tablet layout |
| **Desktop** | 1280px+ | `lg:` | Full desktop experience |

Custom breakpoints are configured in `src/app/globals.css` using Tailwind CSS v4's `@theme` directive to match the exact Figma specifications.

---

## Design System

All design tokens are defined in `src/app/globals.css` using Tailwind CSS v4's `@theme` directive. There is no separate `tailwind.config.js` file — Tailwind v4 uses CSS-first configuration.

### Color Palette

| Token | Description |
|-------|-------------|
| `area-black` | Primary text and headings |
| `area-olive` | Primary brand color, button backgrounds |
| `area-gray` | Secondary text and borders |
| `area-cream` | Page backgrounds and card surfaces |
| `area-sage-light` | Accent backgrounds and highlights |
| `area-sage` | Secondary brand color, hover states |
| `area-olive-dark` | Dark accents and footer backgrounds |

### Typography

The type system uses a serif display font for headings and a sans-serif font for body text, with styles ranging from large hero headlines down to small uppercase labels. All font sizes, weights, and line heights are defined as design tokens and referenced through Tailwind utility classes.

### Icons

Icons are sourced from [lucide-react](https://lucide.dev/) and mapped to the Figma icon set, including: ArrowRight, Building, Check, Eye, LayoutGrid, Menu, TrendingUp, and X.

---

## Page Sections

The landing page is composed of 12 sections rendered in the following order:

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 1 | **Navigation** | `Navbar` | Logo, nav links, CTA button; hamburger menu on mobile |
| 2 | **Hero** | `HeroSection` | "Browse everything." headline with dashboard mockup |
| 3 | **Trusted By** | `TrustedBySection` | Partner logo bar |
| 4 | **Benefits** | `BenefitsSection` | "We've cracked the code." heading with four feature cards |
| 5 | **Photo Gallery** | `PhotoGallery` | Landscape photography grid |
| 6 | **See the Big Picture** | `BigPictureSection` | Four numbered insight steps with product image |
| 7 | **Why Choose Area?** | `WhyChooseSection` | Feature comparison table (Area vs competitors) |
| 8 | **Testimonial** | `TestimonialSection` | Customer quote with attribution |
| 9 | **Map Your Success** | `MapSuccessSection` | Three-step process cards |
| 10 | **Full-width Landscape** | _(inline)_ | Aerial landscape photograph |
| 11 | **Connect With Us** | `ConnectSection` | Call-to-action with "Learn More" button |
| 12 | **Footer** | `Footer` | Logo, navigation links, and copyright |

---

## License

© Area · 2025 · All Rights Reserved.
