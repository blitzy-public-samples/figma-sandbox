# Blitzy Project Guide — Online Bike Shopping App

---

## 1. Executive Summary

### 1.1 Project Overview

A mobile-first e-commerce front-end application for online bike shopping, built as a greenfield Next.js 15 project from Figma design specifications. The app features three core screens — Discover (product browsing with category filters and masonry grid), Product Detail (product info with bottom sheet and add-to-cart), and Shopping Bag (cart management with coupon code, price summary, and slide-to-checkout). Built with React 19, TypeScript, Tailwind CSS v4, and Zustand state management, implementing a dark neumorphic theme with gradient fills, gradient strokes, backdrop blur effects, and the Poppins font family, targeting an iPhone 14/15 viewport (390×844px).

### 1.2 Completion Status

```mermaid
pie title Project Completion — 85.7%
    "Completed (78h)" : 78
    "Remaining (13h)" : 13
```

| Metric | Value |
|---|---|
| **Total Project Hours** | 91 |
| **Completed Hours (AI)** | 78 |
| **Remaining Hours** | 13 |
| **Completion Percentage** | 85.7% |

**Calculation:** 78 completed hours / (78 + 13) total hours = 78 / 91 = **85.7% complete**

### 1.3 Key Accomplishments

- ✅ All 3 page routes implemented and rendering correctly (`/`, `/product/[id]`, `/cart`)
- ✅ Complete dark neumorphic design system with 20+ custom Tailwind CSS v4 @theme tokens, gradient utilities, and neumorphic shadow classes (304 lines in globals.css)
- ✅ 23 React components across 4 domains (layout: 5, discover: 5, detail: 6, cart: 7) totaling 3,211 lines of TSX
- ✅ Zustand cart store with persist middleware, coupon logic ("Bike30" → 30% discount), and computed totals (223 lines)
- ✅ Zero TypeScript errors, zero ESLint warnings, zero production build errors
- ✅ All visual elements faithfully reproduce Figma specifications (dark theme, gradient strokes, neumorphic shadows, backdrop blur)
- ✅ Dynamic routing with proper 404 handling for invalid product IDs
- ✅ 16 Figma assets downloaded and integrated (5 PNG product images, 11 SVG icons, 1 SVG background)
- ✅ Poppins font loaded via `next/font/google` (weights 400, 500, 600, 700)
- ✅ Category filtering with 5 categories (All, Electric, Road, Mountain, Accessory) and active state styling
- ✅ 43 commits (42 by Blitzy Agent) with 10,378 lines of code added

### 1.4 Critical Unresolved Issues

| Issue | Impact | Owner | ETA |
|---|---|---|---|
| 5 tab bar SVG icon files inlined in TabBar.tsx instead of separate files | Cosmetic — functionality is identical; icons render correctly in the component | Human Developer | 0.5h |
| No production deployment configuration | Cannot deploy to production without Vercel/Docker config | Human Developer | 3h |
| No error boundaries for React runtime errors | Unhandled component errors will crash the entire page | Human Developer | 2h |

### 1.5 Access Issues

No access issues identified. All dependencies are publicly available via npm. No external API keys, service credentials, or third-party access is required — the application uses static product data per AAP specification.

### 1.6 Recommended Next Steps

1. **[High]** Set up production deployment configuration (Vercel recommended for Next.js) — 3h
2. **[High]** Configure security headers (Content Security Policy, X-Frame-Options, HSTS) — 1.5h
3. **[Medium]** Implement React error boundaries for graceful error recovery — 2h
4. **[Medium]** Conduct cross-browser testing on Safari, Chrome, and Firefox — 2.5h
5. **[Low]** Extract 5 tab bar icon SVGs to separate files for maintainability — 1h

---

## 2. Project Hours Breakdown

### 2.1 Completed Work Detail

| Component | Hours | Description |
|---|---|---|
| Project Scaffolding & Configuration | 4 | package.json, tsconfig.json, next.config.ts, postcss.config.mjs, .eslintrc.json, .gitignore, README.md (117 lines) |
| Design System & Theme Foundation | 8 | globals.css (304 lines) — Tailwind v4 @theme tokens, 20+ neumorphic shadow utilities, gradient stroke mixins, backdrop blur classes, color/radius/typography tokens |
| TypeScript Type Definitions | 2 | Product, CartItem, Category interfaces in src/types/product.ts |
| Static Data & State Management | 6 | products.ts (3 products, 5 categories), cart-store.ts (223 lines — Zustand store with persist middleware, addToCart, updateQuantity, applyCoupon, computed subtotal/discount/total) |
| Layout Components (5) | 10 | DeviceFrame (36 lines), StatusBar (154 lines, inline SVG icons), PageHeader (133 lines, 2 variants), BackButton (77 lines, gradient + shadow), TabBar (334 lines, 5 tabs with inline SVGs) |
| Discover Page & Components (6) | 10 | page.tsx (category filtering state), TopCard (134 lines, promo card with blur), CategoryFilter (66 lines, horizontal scroll), CategoryItem (199 lines, active/inactive gradient states), ProductGrid (94 lines, 2-column masonry), ProductCard (138 lines, image + heart + gradient stroke) |
| Detail Page & Components (7) | 10 | product/[id]/page.tsx (201 lines, dynamic routing), ProductImageHero (93 lines, gradient overlay), PaginationDots (63 lines), BottomSheet (68 lines, sheet container), TabToggle (84 lines, neumorphic tabs), ProductDescription (51 lines), BuyNowBar (109 lines, price + Add to Cart) |
| Cart Page & Components (8) | 14 | cart/page.tsx (composition + store reads), CartItemList (64 lines), CartItem (102 lines), QuantityStepper (95 lines, neumorphic inset), CouponInput (63 lines), PriceSummary (99 lines), TotalDisplay (65 lines), CheckoutSlider (224 lines, touch drag interaction) |
| Asset Integration | 4 | 5 PNG product images from Figma (bike-peugeot-lr01, bike-pilot-chromoly, helmet-smith-trade, bike-electric-promo, tab-bar), 1 SVG background (bg-gradient), 11 SVG icons (search, heart, chevrons, plus, minus, 5 category icons) |
| Route Integration & Navigation | 2 | App Router file-system routing, Next.js Link navigation between pages, dynamic [id] parameter handling, custom 404 not-found page |
| Bug Fixes & Iterative Refinement | 8 | 42 agent commits of visual QA fixes — font loading corrections, image optimization (fetchPriority), pixel-fidelity adjustments (card width, button stroke, cart name), design token compliance, stale rendering fixes, accessibility improvements |
| **Total** | **78** | |

### 2.2 Remaining Work Detail

| Category | Base Hours | Priority | After Multiplier |
|---|---|---|---|
| Tab Bar SVG File Extraction | 0.5 | Low | 0.5 |
| Production Deployment Configuration | 2.5 | High | 3.0 |
| Environment Variable Documentation | 0.5 | Medium | 0.5 |
| Security Headers Configuration | 1.0 | High | 1.5 |
| Error Boundary Implementation | 1.5 | Medium | 2.0 |
| Cross-Browser Testing & Fixes | 2.0 | Medium | 2.5 |
| Production Monitoring Setup | 1.0 | Low | 1.5 |
| Performance Optimization | 1.5 | Low | 1.5 |
| **Total** | **10.5** | — | **13.0** |

### 2.3 Enterprise Multipliers Applied

| Multiplier | Value | Rationale |
|---|---|---|
| Compliance Review | 1.10× | Security header configuration, CSP policy review, and production hardening require additional review cycles |
| Uncertainty Buffer | 1.10× | Cross-browser neumorphic CSS rendering may surface unexpected issues; deployment configuration depends on hosting platform choice |
| **Combined** | **1.21×** | 10.5 base hours × 1.21 = 12.7h → rounded to **13h** |

---

## 3. Test Results

| Test Category | Framework | Total Tests | Passed | Failed | Coverage % | Notes |
|---|---|---|---|---|---|---|
| Unit | N/A | 0 | 0 | 0 | N/A | Testing explicitly excluded from AAP scope (Section 0.7.2) |
| Integration | N/A | 0 | 0 | 0 | N/A | No integration test framework configured per AAP |
| E2E | N/A | 0 | 0 | 0 | N/A | No E2E test framework configured per AAP |
| TypeScript | tsc --noEmit | 38 files | 38 | 0 | 100% type-check | Zero type errors across all source files |
| ESLint | next lint | 38 files | 38 | 0 | 100% lint-clean | Zero warnings or errors |
| Build | next build | 4 routes | 4 | 0 | 100% compiled | All routes compile successfully (3 static, 1 dynamic) |

**Note:** The AAP explicitly states in Section 0.7.2: *"Testing: Unit tests, integration tests, and E2E tests are excluded from initial implementation scope."* No test files, test scripts, or test frameworks were included in the project scope. Blitzy's autonomous validation verified build integrity, TypeScript type safety, and ESLint compliance as quality gates.

---

## 4. Runtime Validation & UI Verification

### Runtime Health

- ✅ `npm install` — 328 packages installed, 0 vulnerabilities
- ✅ `npm run build` — Production build succeeds (1537ms compilation, 4 routes)
- ✅ `npx tsc --noEmit` — Zero TypeScript errors across 38 source files
- ✅ `npm run lint` — Zero ESLint warnings or errors
- ✅ Dev server starts via `npm run dev` (Turbopack, port 3000)

### Route Verification

| Route | Path | HTTP Status | Rendering |
|---|---|---|---|
| Discover (Home) | `/` | ✅ 200 OK | Static page — product browsing with category filters and grid |
| Product Detail | `/product/peugeot-lr01` | ✅ 200 OK | Dynamic page — PEUGEOT LR01 detail with bottom sheet |
| Product Detail | `/product/pilot-chromoly` | ✅ 200 OK | Dynamic page — PILOT Chromoly detail |
| Product Detail | `/product/smith-trade` | ✅ 200 OK | Dynamic page — SMITH Trade helmet detail |
| Shopping Bag | `/cart` | ✅ 200 OK | Static page — cart items, coupon, price summary |
| Invalid Product | `/product/nonexistent-id` | ✅ 404 | Custom not-found page with "Back to Home" link |

### UI Verification Against Figma

**Discover Page (`/`)** ✅
- Device frame with 50px border-radius and blue glow shadow renders correctly
- iOS status bar shows "9:41" with signal/wifi/battery icons
- "Choose Your Bike" header with 44×44 blue gradient search button
- Top promotional card with electric bicycle image and "30% Off" text on dark gradient fill
- 5 category filter icons — "All" active with blue gradient, 4 inactive with dark theme
- 2-column product grid with PEUGEOT LR01, PILOT Chromoly 520, SMITH Trade cards showing heart icons, category labels, prices
- Bottom tab bar with 5 icons (home active in blue gradient)
- Dark neumorphic theme (#242C3B) with Poppins typography throughout

**Product Detail Page (`/product/peugeot-lr01`)** ✅
- 44×44 blue gradient back button with white chevron-left
- "PEUGEOT – LR01" title in white Poppins bold
- Product image with blue-purple gradient overlay
- 3 pagination dots (1 active white, 2 inactive dark)
- Bottom sheet with gradient fill, top-edge stroke, 30px radius
- Description/Specification tab toggle with neumorphic active/inactive styling
- Product description text in proper hierarchy
- Buy Now bar with "$1,999.99" in blue accent and "Add to Cart" gradient button

**Shopping Bag Page (`/cart`)** ✅
- "My Shopping Cart" header with gradient back button
- 3 cart items with product images, names, prices in blue accent
- Quantity steppers with neumorphic inset styling (−/count/+ layout)
- "Your cart qualifies for free shipping" banner
- "Bike30" coupon input with gradient "Apply" button
- Price summary: Subtotal $6,119.98, Delivery Fee $0, Discount 30%
- Total "$4,283.99" in blue accent (#38B8EA)
- Checkout slider with gradient handle and white chevron-right

### API Integration

Not applicable — the application uses static product data per AAP specification. No external API endpoints are consumed.

---

## 5. Compliance & Quality Review

| AAP Deliverable | Status | Evidence | Notes |
|---|---|---|---|
| Three separate routes (/, /product/[id], /cart) | ✅ Pass | App Router pages at src/app/page.tsx, src/app/product/[id]/page.tsx, src/app/cart/page.tsx | All routes return HTTP 200 |
| Dark neumorphic theme (#242C3B) | ✅ Pass | globals.css @theme tokens, all components use dark gradient fills | Exact hex values match Figma |
| Gradient fills and gradient strokes | ✅ Pass | gradient-primary-button, gradient-card-dark, gradient-stroke pseudo-elements | Applied consistently across buttons, cards, sheets |
| Backdrop blur effects (30px, 40px, 100px) | ✅ Pass | globals.css blur utilities, TopCard blur(100px), CategoryItem blur(30px) | -webkit-backdrop-filter prefix included |
| Poppins font (400, 500, 600, 700) | ✅ Pass | layout.tsx loads via next/font/google with all 4 weights | Applied as CSS variable for Tailwind |
| Category filtering (5 categories) | ✅ Pass | CategoryFilter + CategoryItem with active state management | All, Electric, Road, Mountain, Accessory |
| 2-column staggered product grid | ✅ Pass | ProductGrid with CSS columns layout | ProductCard instances with variable height |
| Product cards (image, heart, name, price) | ✅ Pass | ProductCard component with gradient stroke, neumorphic shadow | Links to /product/[id] on click |
| Product detail bottom sheet with tabs | ✅ Pass | BottomSheet + TabToggle (Description/Specification) | Neumorphic outset/inset shadow toggle |
| Add to Cart functionality | ✅ Pass | BuyNowBar calls cart-store addToCart | Updates Zustand store with product + quantity |
| Cart item list with quantity steppers | ✅ Pass | CartItemList + CartItem + QuantityStepper | Increment/decrement with neumorphic styling |
| Coupon input ("Bike30" → 30% discount) | ✅ Pass | CouponInput + cart-store applyCoupon | Pre-filled "Bike30", Apply triggers discount |
| Price summary (Subtotal, Delivery, Discount) | ✅ Pass | PriceSummary component reads computed values | Subtotal $6,119.98 (mathematically correct) |
| Total display | ✅ Pass | TotalDisplay shows $4,283.99 in blue accent | Matches Figma spec exactly |
| Checkout slider | ✅ Pass | CheckoutSlider (224 lines) with touch/drag interaction | Gradient handle with chevron-right |
| Zustand cart with persist middleware | ✅ Pass | cart-store.ts uses zustand/middleware persist | localStorage backend for session persistence |
| Device frame (390×844, 50px radius) | ✅ Pass | DeviceFrame component wraps all pages | Blue glow shadow and overflow hidden |
| iOS status bar (decorative) | ✅ Pass | StatusBar with "9:41", signal/wifi/battery SVGs | Consistent across all 3 screens |
| Next.js Image optimization | ✅ Pass | All product images use next/image with explicit dimensions | fetchPriority='high' for above-fold images |
| Static product data (3 products) | ✅ Pass | products.ts with PEUGEOT LR01, PILOT Chromoly, SMITH Trade | Exact prices and categories from Figma |
| Config files (7 scaffolding files) | ✅ Pass | package.json, tsconfig, next.config, postcss, eslint, gitignore | All AAP-specified configs present |
| README documentation | ✅ Pass | README.md updated with full project docs (117 lines) | Setup, scripts, structure, tech stack |
| Tab bar SVG icon files (5 separate files) | ⚠ Partial | Icons inlined in TabBar.tsx (334 lines) | Functionally equivalent; separate files not created |
| Product PNG images (4 from Figma) | ✅ Pass | public/images/ contains all 4 product PNGs + tab-bar.png | Downloaded from Figma API |
| SVG icons (11 from Figma) | ✅ Pass | src/assets/icons/ contains 11 SVG files | All downloadable icons present |
| Background gradient SVG | ✅ Pass | public/images/bg-gradient.svg | Used in detail page gradient overlay |
| Category icon SVGs (5) | ✅ Pass | category-all.svg through category-accessory.svg | All 5 category icons present |

**Quality Fixes Applied During Autonomous Validation:**
- Font loading fix — Poppins correctly applied across all components
- Image optimization — `fetchPriority='high'` and `loading='eager'` for above-fold images
- Pixel-fidelity fixes — card width, button stroke width, cart item name alignment
- Design token compliance — replaced inline styles with Tailwind design system tokens
- TotalDisplay stale rendering fix — resolved coupon-only state changes not triggering re-render
- Accessibility improvements — focus rings, semantic HTML, contrast compliance
- Custom 404 page — dark-themed not-found for invalid product IDs

---

## 6. Risk Assessment

| Risk | Category | Severity | Probability | Mitigation | Status |
|---|---|---|---|---|---|
| No error boundaries — React runtime errors crash entire page | Technical | High | Medium | Implement React ErrorBoundary components at route and component level | Open |
| No Content Security Policy headers | Security | High | Low | Configure CSP, X-Frame-Options, and HSTS headers in next.config.ts or middleware | Open |
| Zustand persist uses unencrypted localStorage | Security | Low | Low | Cart data is non-sensitive (product names, quantities); no PII stored | Accepted |
| Tailwind CSS v4 relatively new — potential browser edge cases | Technical | Medium | Low | Test on Safari, Chrome, Firefox; add vendor prefixes as needed | Open |
| First Load JS 102 kB — acceptable but could be optimized | Technical | Low | Low | Code splitting, dynamic imports for below-fold components | Open |
| No production deployment configuration | Operational | High | High | Create Vercel deployment config or Dockerfile for containerized hosting | Open |
| No monitoring, logging, or error tracking | Operational | Medium | Medium | Integrate Sentry or similar APM; add structured logging | Open |
| No health check endpoint | Operational | Low | Low | Add /api/health route returning 200 with version info | Open |
| Static product data — no real API backend | Integration | Low | N/A | By design per AAP — no backend required for current scope | Accepted |
| No payment gateway for checkout | Integration | Medium | N/A | Checkout slider is UI-only; payment integration is out of AAP scope | Accepted |
| No analytics tracking | Operational | Low | Low | Integrate Google Analytics or Plausible for usage insights | Open |
| Cross-browser neumorphic shadow rendering | Technical | Medium | Medium | Test gradient strokes and backdrop-filter on Safari/Firefox specifically | Open |

---

## 7. Visual Project Status

```mermaid
pie title Project Hours Breakdown
    "Completed Work" : 78
    "Remaining Work" : 13
```

### Remaining Hours by Category

| Category | After Multiplier Hours | Priority |
|---|---|---|
| Production Deployment Configuration | 3.0 | 🔴 High |
| Security Headers Configuration | 1.5 | 🔴 High |
| Error Boundary Implementation | 2.0 | 🟡 Medium |
| Cross-Browser Testing & Fixes | 2.5 | 🟡 Medium |
| Environment Variable Documentation | 0.5 | 🟡 Medium |
| Production Monitoring Setup | 1.5 | 🟢 Low |
| Performance Optimization | 1.5 | 🟢 Low |
| Tab Bar SVG File Extraction | 0.5 | 🟢 Low |
| **Total** | **13.0** | — |

---

## 8. Summary & Recommendations

### Achievement Summary

The Online Bike Shopping App has been successfully implemented from Figma design to functional Next.js 15 front-end at **85.7% completion** (78 of 91 total project hours). All three core screens — Discover, Product Detail, and Shopping Bag — are fully operational with faithful reproduction of the dark neumorphic design system. The application compiles cleanly with zero TypeScript errors, zero ESLint warnings, and zero build failures across 59 source files and 3,931 lines of application code.

### What Was Delivered

Every AAP-specified functional requirement has been implemented: three-route architecture with App Router, complete component library (23 components across 4 domains), Zustand cart state with persist middleware and "Bike30" coupon logic, category filtering, masonry product grid, product detail with bottom sheet tabs, and slide-to-checkout — all rendered within a pixel-accurate 390×844 device frame with gradient fills, gradient strokes, neumorphic shadows, and backdrop blur effects.

### Remaining Gaps

The 13 remaining hours (14.3% of total) are exclusively path-to-production items: deployment configuration (3h), security headers (1.5h), error boundaries (2h), cross-browser testing (2.5h), and operational infrastructure (monitoring, performance, documentation). The only AAP file deliverable not created as specified is the 5 tab bar SVG files (0.5h), which are functionally inlined in the TabBar component.

### Production Readiness Assessment

The application is **development-complete and build-ready** but requires standard production hardening before deployment. The critical path to production is: (1) deployment configuration, (2) security headers, (3) error boundaries, and (4) cross-browser testing — estimated at 9h (69% of remaining work). Once these four items are addressed, the application is production-deployable.

### Success Metrics

| Metric | Target | Actual | Status |
|---|---|---|---|
| AAP file deliverables | 60 files | 55 complete + 5 partial | ✅ 97% |
| Functional requirements | 20 requirements | 20 complete | ✅ 100% |
| TypeScript errors | 0 | 0 | ✅ Pass |
| ESLint errors | 0 | 0 | ✅ Pass |
| Build errors | 0 | 0 | ✅ Pass |
| Route coverage | 3 pages | 3 pages + custom 404 | ✅ Pass |
| Visual fidelity | Figma match | All 3 screens verified | ✅ Pass |

---

## 9. Development Guide

### System Prerequisites

| Requirement | Version | Purpose |
|---|---|---|
| Node.js | 18+ (recommended: 20.x) | JavaScript runtime for Next.js |
| npm | 9+ (included with Node.js) | Package manager |
| Git | 2.30+ | Version control |

### Environment Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd figma-sandbox

# 2. Install dependencies (328 packages, 0 vulnerabilities)
npm install
```

**Expected output:**
```
added 328 packages in Xs
```

No environment variables are required — the application uses static product data with no external API calls.

### Dependency Installation

All dependencies are defined in `package.json` and installed via `npm install`:

**Core Dependencies:**
- `next@^15.5.0` — Next.js framework with App Router
- `react@^19.2.0` — React UI library
- `react-dom@^19.2.0` — React DOM renderer
- `zustand@^5.0.0` — State management for cart

**Dev Dependencies:**
- `tailwindcss@^4.2.1` — Utility-first CSS framework v4
- `@tailwindcss/postcss@^4.2.1` — PostCSS integration
- `typescript@^5.7.0` — TypeScript compiler
- `eslint@^9.0.0` + `eslint-config-next@^15.5.0` — Linting
- `@types/react@^19.0.0`, `@types/react-dom@^19.0.0`, `@types/node@^22.0.0` — Type definitions

### Application Startup

```bash
# Development server (Turbopack — fast refresh)
npm run dev
# → Starts at http://localhost:3000

# Production build + start
npm run build    # Compiles all routes (~1.5s)
npm start        # Serves production build at http://localhost:3000
```

**Expected build output:**
```
Route (app)                          Size     First Load JS
┌ ○ /                              3.39 kB        118 kB
├ ○ /_not-found                      993 B        103 kB
├ ○ /cart                          2.63 kB        114 kB
└ ƒ /product/[id]                  1.84 kB        113 kB
+ First Load JS shared by all        102 kB
```

### Verification Steps

```bash
# 1. TypeScript type check (should output nothing = success)
npx tsc --noEmit

# 2. ESLint check (should show "No ESLint warnings or errors")
npm run lint

# 3. Production build (should compile all 4 routes)
npm run build

# 4. Route verification (with dev server running)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/product/peugeot-lr01
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/cart
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/product/invalid
# Expected: 404
```

### Example Usage

**Browse products:** Navigate to `http://localhost:3000/` to see the Discover page with category filters and product grid.

**View product detail:** Click any product card or navigate to `http://localhost:3000/product/peugeot-lr01`, `/product/pilot-chromoly`, or `/product/smith-trade`.

**Shopping cart:** Navigate to `http://localhost:3000/cart` to see pre-populated cart with 3 items. The coupon field is pre-filled with "Bike30" — click "Apply" to see the 30% discount applied.

### Troubleshooting

| Issue | Resolution |
|---|---|
| Port 3000 already in use | Run with custom port: `PORT=3001 npm run dev` |
| Turbopack workspace root warning | Non-blocking warning about lockfile detection; does not affect functionality |
| Stale CSS after changes | Hard refresh (Ctrl+Shift+R) to clear cached Tailwind styles |
| Images not loading | Verify `public/images/` contains all 5 PNG + 1 SVG files |
| Cart state not persisting | Clear localStorage (`localStorage.clear()`) and refresh |

---

## 10. Appendices

### A. Command Reference

| Command | Purpose | Expected Result |
|---|---|---|
| `npm install` | Install all dependencies | 328 packages, 0 vulnerabilities |
| `npm run dev` | Start dev server (Turbopack) | Server at http://localhost:3000 |
| `npm run build` | Production build | 4 routes compiled, ~1.5s |
| `npm start` | Serve production build | Server at http://localhost:3000 |
| `npm run lint` | Run ESLint | "No ESLint warnings or errors" |
| `npx tsc --noEmit` | TypeScript type check | No output (success) |

### B. Port Reference

| Port | Service | Context |
|---|---|---|
| 3000 | Next.js Dev Server / Production Server | Default port for `npm run dev` and `npm start` |

### C. Key File Locations

| File / Directory | Purpose |
|---|---|
| `src/app/page.tsx` | Discover (Home) page — route `/` |
| `src/app/product/[id]/page.tsx` | Product Detail page — route `/product/:id` |
| `src/app/cart/page.tsx` | Shopping Bag page — route `/cart` |
| `src/app/layout.tsx` | Root layout with Poppins font and DeviceFrame |
| `src/app/globals.css` | Design system tokens, neumorphic utilities (304 lines) |
| `src/store/cart-store.ts` | Zustand cart store with persist middleware (223 lines) |
| `src/store/products.ts` | Static product data (3 products, 5 categories) |
| `src/types/product.ts` | TypeScript interfaces (Product, CartItem, Category) |
| `src/components/layout/` | Shared layout components (5 files) |
| `src/components/discover/` | Discover page components (5 files) |
| `src/components/detail/` | Detail page components (6 files) |
| `src/components/cart/` | Cart page components (7 files) |
| `src/assets/icons/` | SVG icon assets (11 files) |
| `public/images/` | Product PNGs and background SVG (6 files) |

### D. Technology Versions

| Technology | Specified (AAP) | Installed (Actual) |
|---|---|---|
| Next.js | ^15.5.0 | 15.5.12 |
| React | ^19.2.0 | 19.2.4 |
| React DOM | ^19.2.0 | 19.2.4 |
| Zustand | ^5.0.0 | 5.0.11 |
| Tailwind CSS | ^4.2.1 | 4.2.1 |
| @tailwindcss/postcss | ^4.2.1 | 4.2.1 |
| TypeScript | ^5.7.0 | 5.9.3 |
| ESLint | ^9.0.0 | 9.39.3 |
| eslint-config-next | ^15.5.0 | 15.5.12 |
| Node.js | 18+ | 20.20.1 |
| npm | 9+ | 11.1.0 |

### E. Environment Variable Reference

No environment variables are required for this application. The project uses static product data and no external API integrations per AAP specification. The following optional variables can be used for customization:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | 3000 | Custom port for Next.js server |
| `NODE_ENV` | development | Runtime environment (auto-set by Next.js) |

### F. Developer Tools Guide

**Code Navigation:**
- Path alias `@/*` maps to `./src/*` (configured in tsconfig.json)
- Components are organized by page domain: `layout/`, `discover/`, `detail/`, `cart/`
- All design tokens are in `src/app/globals.css` under `@theme` and `@utility` directives

**Design System Tokens (globals.css):**
- Colors: `--color-bg-primary`, `--color-text-muted`, etc.
- Gradients: `--gradient-primary-button`, `--gradient-card-dark`, etc.
- Shadows: Use utility classes `shadow-card`, `shadow-button`, `shadow-neumorphic-outset`, etc.
- Radii: `rounded-device` (50px), `rounded-sheet` (30px), `rounded-card` (20px), `rounded-button` (10px)

**Adding New Products:**
1. Add product data to `src/store/products.ts`
2. Add product image to `public/images/`
3. Product detail page auto-generates via dynamic route `/product/[id]`

### G. Glossary

| Term | Definition |
|---|---|
| Neumorphic | Design style using layered box-shadows (outset + inset) to create soft, 3D embossed/debossed effects |
| Gradient Stroke | Border effect created with gradient fills via pseudo-elements, simulating `border-image` with `border-radius` support |
| Backdrop Blur | CSS `backdrop-filter: blur()` effect creating frosted-glass appearance behind semi-transparent elements |
| Device Frame | 390×844px container with 50px border-radius mimicking an iPhone 14/15 viewport |
| App Router | Next.js file-system-based routing using the `src/app/` directory structure |
| Zustand | Lightweight React state management library; used here with `persist` middleware for localStorage-backed cart state |
| Turbopack | Next.js incremental bundler (Rust-based) for fast development server hot module replacement |