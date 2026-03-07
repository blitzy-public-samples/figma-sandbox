'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';

import StatusBar from '@/components/layout/StatusBar';
import PageHeader from '@/components/layout/PageHeader';
import ProductImageHero from '@/components/detail/ProductImageHero';
import PaginationDots from '@/components/detail/PaginationDots';
import BottomSheet from '@/components/detail/BottomSheet';
import TabToggle from '@/components/detail/TabToggle';
import ProductDescription from '@/components/detail/ProductDescription';
import BuyNowBar from '@/components/detail/BuyNowBar';
import { products } from '@/store/products';
import { useCartStore } from '@/store/cart-store';

/**
 * ProductDetailPage — Product Detail page (route: `/product/:id`).
 *
 * Next.js App Router dynamic route page component that displays a single
 * product's details within the iOS-style device frame. Reads the `[id]`
 * URL segment to look up the matching product from the static product data.
 *
 * Figma reference: Detail screen (node 1:180) in file 6FWdXDJV3foFfDfOhmkORj
 *
 * Layout structure (390×844 viewport, dark bg #242C3B):
 * 1. ProductImageHero — background layer (288×222 centered image + gradient overlay)
 * 2. StatusBar + PageHeader — overlaid at top (z-10)
 * 3. PaginationDots — positioned above the bottom sheet (3 dots, first active)
 * 4. BottomSheet (450px) — gradient fill, 30px top radius, contains tabs + content
 * 5. BuyNowBar (104px) — overlaps bottom of sheet, pill shape, price + Add to Cart
 *
 * State:
 * - `activeTab` (local): Controls Description/Specification tab toggle (default: 'description')
 * - `addToCart` (Zustand): Accessed via selector to add product to persisted cart
 *
 * Navigation:
 * - Entry: ProductCard tap on Discover page → `/product/[id]`
 * - Back: BackButton in PageHeader calls `router.back()` → returns to Discover
 * - Add to Cart: BuyNowBar button calls `addToCart(product)` → stays on Detail page
 */
export default function ProductDetailPage() {
  /* ──────────────────────────────────────────────────────────────────
     HOOKS — called unconditionally before any conditional logic
     (React Rules of Hooks compliance)
     ────────────────────────────────────────────────────────────── */

  /** Dynamic route parameter — reads the [id] URL segment */
  const params = useParams();

  /** Local tab toggle state — default to 'description' (Figma node 1:188 active) */
  const [activeTab, setActiveTab] = useState('description');

  /** Cart store addToCart action via selector (Zustand best practice) */
  const addToCart = useCartStore((state) => state.addToCart);

  /**
   * Rehydrate cart store from localStorage on mount.
   * Required because cart-store uses skipHydration: true to prevent
   * React hydration mismatches during SSR in Next.js App Router.
   * Without this, persisted cart items would not be restored.
   */
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  /* ──────────────────────────────────────────────────────────────────
     PRODUCT LOOKUP — from static data using URL parameter
     ────────────────────────────────────────────────────────────── */

  /** Extract the product ID from the URL parameters */
  const id = params.id as string;

  /** Find the matching product from the static catalog */
  const product = products.find((p) => p.id === id);

  /**
   * Handle invalid product IDs — triggers Next.js built-in 404 page.
   * notFound() returns `never`, so TypeScript narrows `product` to
   * `Product` (non-undefined) after this guard.
   */
  if (!product) {
    notFound();
  }

  /* ──────────────────────────────────────────────────────────────────
     CALLBACKS
     ────────────────────────────────────────────────────────────── */

  /**
   * Handles the "Add to Cart" button tap in BuyNowBar.
   * Adds the full product object to the Zustand cart store.
   * If the product already exists in the cart, the store increments
   * its quantity by 1. If new, it creates a CartItem with quantity 1.
   */
  const handleAddToCart = () => {
    addToCart(product);
  };

  /* ──────────────────────────────────────────────────────────────────
     RENDER — Detail screen layout matching Figma node 1:180
     ────────────────────────────────────────────────────────────── */

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg-primary">
      {/* ── Layer 1: Product Image Hero (background, bottom layer) ────
       * Positioned absolutely behind all other layers using inset-0.
       * The ProductImageHero component renders at 394px height with
       * the product image centered and a diagonal blue gradient overlay.
       * Figma: node 1:202 (product image) + node 1:182 (background)
       */}
      <div className="absolute inset-0">
        <ProductImageHero image={product.image} name={product.name} />
      </div>

      {/* ── Layer 2: Status Bar + Navigation (overlaid on image) ──────
       * Uses relative positioning with z-10 to sit above the image.
       * StatusBar: decorative iOS bar with "9:41" time (node 1:181)
       * PageHeader: back mode — 44×44 gradient BackButton + product
       *   name title with 56px gap (node 1:210)
       */}
      <div className="relative z-10">
        <StatusBar />
        <PageHeader title={product.name} showBack />
      </div>

      {/* ── Layer 3: Pagination Dots (above the bottom sheet) ─────────
       * Positioned absolutely at ~360px from top, which places the dots
       * just above the 30px border-radius curve of the bottom sheet
       * (sheet starts at y:394 in Figma). Three dots total, first active
       * (white #FFFFFF), others inactive (rgba(255,255,255,0.3)).
       * Figma: Instance of component set "Dots" (node 1:25)
       */}
      <div
        className="absolute left-0 right-0 z-10"
        style={{ top: '360px' }}
      >
        <PaginationDots total={3} active={0} />
      </div>

      {/* ── Layer 4: Bottom Sheet (anchored at bottom) ────────────────
       * The BottomSheet component (390×450px) renders with gradient fill,
       * 30px top border-radius, upward shadow, and gradient top-edge stroke.
       * Positioned at the bottom of the device frame (y:394 to y:844).
       * Contains: TabToggle + conditional tab content.
       * Figma: node 1:184 (Bottom Sheet)
       */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <BottomSheet>
          {/* Tab toggle: Description (active) / Specification (inactive)
           * Figma node 1:186 — neumorphic outset/inset shadows with
           * gradient text for active tab */}
          <TabToggle
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={['Description', 'Specification']}
          />

          {/* Tab content — conditional rendering based on activeTab */}
          {activeTab === 'description' ? (
            /* Description tab content (DEFAULT — shown in Figma)
             * Figma node 1:199: title + body paragraph */
            <div role="tabpanel" id="tabpanel-description">
              <ProductDescription
                name={product.name}
                description={product.description}
              />
            </div>
          ) : (
            /* Specification tab content (PLACEHOLDER)
             * Per AAP §0.7.2: "the Specification tab can be left as a
             * placeholder" — only the Description tab has content in Figma.
             * Typography matches text-body token: Poppins 400 15px
             * rgba(255,255,255,0.6), letter-spacing -2%, 20px padding. */
            <div
              className="px-5"
              role="tabpanel"
              id="tabpanel-specification"
            >
              <p className="text-[15px] font-normal leading-[1.5em] tracking-[-0.02em] text-white/60">
                Specifications coming soon.
              </p>
            </div>
          )}
        </BottomSheet>
      </div>

      {/* ── Layer 5: Buy Now Bar (overlaps bottom of sheet) ───────────
       * Positioned at the very bottom with z-30 (above the sheet's z-20).
       * The BuyNowBar (390×104px) visually overlaps the bottom ~104px of
       * the BottomSheet, creating a pill-shaped purchase bar with:
       *   - Price display: "$ 1,999.99" in Poppins 400 24px #3D9CEA
       *   - "Add to Cart" button: 160×44 gradient, Poppins 500 15px #FFF
       * Figma: node 1:192 (Buy Now Section)
       */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <BuyNowBar price={product.price} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}
