'use client';

/**
 * DiscoverPage — Home/Browse screen for the Online Bike Shopping App.
 *
 * Route: `/` (root route via Next.js 15 App Router)
 *
 * This is the primary landing page where users browse products by category
 * and view a staggered product grid. It composes the following child
 * components in a vertical stack within the 390×844 device frame:
 *
 *   1. StatusBar — Decorative iOS status bar ("9:41", signal, wifi, battery)
 *   2. PageHeader — "Choose Your Bike" title + gradient search button
 *   3. TopCard — Promotional "30% Off" banner card (350×240)
 *   4. CategoryFilter — 5 category icon buttons (All active by default)
 *   5. ProductGrid — 2-column staggered/masonry product card grid
 *   6. TabBar — Bottom tab navigation (5 tabs, home active)
 *
 * State management:
 * - Local `useState` for the active category filter (default: 'all')
 * - Category changes trigger filtered product re-rendering in ProductGrid
 *
 * Navigation:
 * - ProductCard click → `/product/[id]` (handled by ProductCard's Link)
 * - Cart tab → `/cart` (handled by TabBar's Link)
 *
 * Figma reference: Discover screen (Node 1:42, file key: 6FWdXDJV3foFfDfOhmkORj)
 * Background: #242C3B (handled by DeviceFrame in layout.tsx)
 *
 * @module app/page
 */

import { useState } from 'react';

import StatusBar from '@/components/layout/StatusBar';
import PageHeader from '@/components/layout/PageHeader';
import TabBar from '@/components/layout/TabBar';
import TopCard from '@/components/discover/TopCard';
import CategoryFilter from '@/components/discover/CategoryFilter';
import ProductGrid from '@/components/discover/ProductGrid';
import { products, categories } from '@/store/products';

/**
 * DiscoverPage — Default export for the `/` route.
 *
 * Manages the active category filter state and renders the full
 * Discover screen layout inside the DeviceFrame provided by layout.tsx.
 *
 * The page structure uses a flex column with:
 * - StatusBar at the top (non-scrollable)
 * - Scrollable content area in the middle (flex-1, overflow-y-auto)
 * - TabBar absolutely positioned at the bottom
 *
 * Bottom padding on the scrollable area ensures the ProductGrid
 * content is not hidden behind the overlapping TabBar (103px height).
 */
export default function DiscoverPage() {
  /**
   * Active category filter state.
   * Default: 'all' — shows all products in the grid.
   * Updated via the onCategoryChange callback in CategoryFilter.
   * Possible values: 'all', 'electric', 'road', 'mountain', 'accessory'
   */
  const [activeCategory, setActiveCategory] = useState('all');

  /**
   * Filtered products array based on the active category selection.
   *
   * Filtering strategy maps category IDs to product category strings:
   * - 'all' → shows all products (no filter)
   * - 'road' → matches "Road Bike" and "Road Helmet" (includes "Road")
   * - 'mountain' → matches "Mountain Bike" (includes "Mountain")
   * - 'electric' → matches "Electric" in category (none in current data)
   * - 'accessory' → matches "Helmet" or "Accessory" products
   *
   * The matching is case-insensitive using .toLowerCase().includes().
   * The 'accessory' category receives special handling to match helmet
   * products which are classified as "Road Helmet" rather than "Accessory".
   */
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => {
          const cat = p.category.toLowerCase();
          if (activeCategory === 'accessory') {
            return cat.includes('helmet') || cat.includes('accessory');
          }
          return cat.includes(activeCategory.toLowerCase());
        });

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* ──────────────────────────────────────────────────────
          FIXED TOP — Decorative iOS Status Bar
          Non-scrollable, sits at the very top of the device frame.
          Renders "9:41" time with signal/wifi/battery icons.
          Figma node 1:45 (instance of component 1:7).
          ────────────────────────────────────────────────────── */}
      <StatusBar />

      {/* ──────────────────────────────────────────────────────
          SCROLLABLE CONTENT AREA
          Occupies all space between StatusBar and TabBar.
          - flex-1: fills remaining vertical space
          - overflow-y-auto: enables vertical scrolling
          - pb-[104px]: bottom padding prevents content from being
            hidden behind the absolutely-positioned TabBar (103px)
          ────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[104px]">
        {/* Page Header — "Choose Your Bike" + gradient search button
            Search mode: title left, 44×44 gradient button right.
            Spacing: ~8-10px below StatusBar (mt-2.5 = 10px).
            Figma node 1:46 CONFIRMED. */}
        <div className="mt-2.5">
          <PageHeader title="Choose Your Bike" showSearch />
        </div>

        {/* Top Promotional Card — "30% Off" banner
            350×240 card centered with 20px horizontal margins.
            Uses default props (discount="30% Off", promo image).
            Spacing: ~20px below PageHeader (mt-5 = 20px).
            Figma node 1:143 CONFIRMED. */}
        <div className="mt-5">
          <TopCard />
        </div>

        {/* Category Filter Row — 5 category icon buttons
            Horizontal row: All (active), Electric, Road, Mountain, Accessory.
            Each item 50×50 with 14px gap between items.
            Spacing: ~24px below TopCard (mt-6 = 24px).
            Figma node 1:50 CONFIRMED. */}
        <div className="mt-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Product Grid — 2-column staggered/masonry layout
            Renders ProductCard for each filtered product.
            Right column has 20px top offset for masonry effect.
            Spacing: ~20px below CategoryFilter (mt-5 = 20px).
            Figma node 1:71 CONFIRMED. */}
        <div className="mt-5">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────
          FIXED BOTTOM — Tab Bar Navigation
          Positioned absolutely at the bottom of the device frame.
          Overlays the scrollable content area (hence the pb-[104px]
          bottom padding on the content container above).
          5 tab icons: Home (active), Map, Cart, Profile, Bookmark.
          Cart tab links to /cart route via Next.js Link.
          Figma node 1:150 CONFIRMED.
          ────────────────────────────────────────────────────── */}
      <TabBar />
    </div>
  );
}
