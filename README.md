# Online Bike Shopping App

A mobile-first e-commerce front-end application for browsing and purchasing bikes and accessories. Built from a Figma design featuring a dark neumorphic theme with gradient accents, backdrop blur effects, and custom shadow styling.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 (App Router) | React framework with file-system routing and server-side rendering |
| **TypeScript** | 5.7+ | Type-safe development across all source files |
| **React** | 19 | UI component library with concurrent rendering |
| **Tailwind CSS** | v4 | Utility-first CSS with custom neumorphic design system via `@theme` |
| **Zustand** | 5 | Lightweight state management for cart (items, quantities, coupons, totals) |
| **Poppins** | 400, 500, 600, 700 | Primary font family loaded via `next/font/google` |

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20.x)
- **npm** (included with Node.js) or **yarn**

### Installation

```bash
git clone <repo-url>
cd figma-sandbox
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server uses Turbopack for fast refresh.

### Production Build

```bash
npm run build
npm start
```

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start development server with Turbopack |
| `build` | `npm run build` | Create optimized production build |
| `start` | `npm start` | Start production server |
| `lint` | `npm run lint` | Run ESLint for code quality checks |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Poppins font, providers, device frame)
│   ├── page.tsx                # Discover/Home page (route: /)
│   ├── globals.css             # Global styles, Tailwind theme tokens, neumorphic utilities
│   ├── product/[id]/
│   │   └── page.tsx            # Product Detail page (route: /product/:id)
│   └── cart/
│       └── page.tsx            # Shopping Bag page (route: /cart)
├── components/
│   ├── layout/                 # Shared layout (DeviceFrame, PageHeader, BackButton, TabBar, StatusBar)
│   ├── discover/               # Discover page (TopCard, CategoryFilter, ProductGrid, ProductCard)
│   ├── detail/                 # Detail page (ProductImageHero, BottomSheet, TabToggle, BuyNowBar)
│   └── cart/                   # Cart page (CartItemList, CartItem, QuantityStepper, CouponInput, PriceSummary, CheckoutSlider)
├── store/                      # State management
│   ├── cart-store.ts           # Zustand cart store (items, quantities, coupon, totals)
│   └── products.ts             # Static product data
├── types/                      # TypeScript type definitions
│   └── product.ts              # Product, CartItem, Category interfaces
└── assets/
    └── icons/                  # SVG icon assets
public/
└── images/                     # Product images and background assets
```

## Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Discover** | Product browsing with a promotional banner (30% Off), horizontal category filters (All, Electric, Road, Mountain, Accessory), and a 2-column masonry product grid |
| `/product/[id]` | **Product Detail** | Large product image with gradient overlay, Description/Specification tab toggle in a bottom sheet, and a fixed Buy Now bar with price and Add to Cart button |
| `/cart` | **Shopping Bag** | Cart item list with quantity steppers, coupon code input (pre-filled "Bike30" for 30% off), price summary (Subtotal, Delivery Fee, Discount), total display, and slide-to-checkout control |

## Design System

The application implements a custom dark neumorphic design system faithfully reproducing the Figma specifications:

- **Primary Background:** `#242C3B` — dark navy/slate surface color used across all screens
- **Primary Gradient:** `linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)` — cyan-to-purple accent for buttons, active states, and highlights
- **Card Surfaces:** Gradient fills (`#353F54` → `#222834`) with gradient border strokes (white-to-black at varying angles) and multi-layer box shadows
- **Neumorphic Effects:** Combined outset and inset `box-shadow` values creating raised/recessed 3D appearances on interactive elements
- **Backdrop Blur:** Multiple blur levels (30px, 40px, 100px) providing depth hierarchy across cards and overlays
- **Typography:** Poppins font family at weights 400 (regular), 500 (medium), 600 (semi-bold), and 700 (bold) with consistent 1.5em line-height
- **Mobile Viewport:** 390×844px (iPhone 14/15 form factor) rendered within a device frame with 50px border-radius

## Product Data

The app ships with three static products matching the Figma design:

| Product | Category | Price |
|---|---|---|
| PEUGEOT — LR01 | Road Bike | $1,999.99 |
| PILOT — Chromoly 520 | Mountain Bike | $3,999.99 |
| SMITH — Trade | Road Helmet | $120.00 |

Cart calculations use the coupon code **Bike30** for a 30% discount, with free delivery ($0).

## License

This project is private and not licensed for distribution.
