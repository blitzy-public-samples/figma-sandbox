/**
 * Static product data and category definitions for the Online Bike Shopping App.
 *
 * All data in this file is hardcoded to match the Figma design screens exactly.
 * Product names, prices, categories, and image paths are derived directly from
 * the Figma specification. This is a pure data module with no runtime side effects.
 *
 * @module store/products
 */

import type { Product, Category } from '@/types/product';

/**
 * Complete catalog of products displayed in the app.
 *
 * Contains exactly 3 products matching the Figma design content:
 * - PEUGEOT - LR01 (Road Bike, $1,999.99)
 * - PILOT – CHROMOLY 520 (Mountain Bike, $3,999.99)
 * - SMITH – Trade (Road Helmet, $120)
 *
 * Consumed by:
 * - Discover page (`src/app/page.tsx`) for the product grid
 * - Detail page (`src/app/product/[id]/page.tsx`) for product lookup by ID
 */
export const products: Product[] = [
  {
    id: 'peugeot-lr01',
    name: 'PEUGEOT - LR01',
    cartName: 'PEUGEOT- LR01',
    category: 'Road Bike',
    price: 1999.99,
    image: '/images/bike-peugeot-lr01.png',
    description:
      'The LR01 is designed for those who want to get into road cycling, on a limited budget. Equipped with an aluminum frame and a carbon fork, the LR01 uses the same frame as the LR01 but with Shimano Tiagra groupset and Mavic Aksium wheels.',
  },
  {
    id: 'pilot-chromoly',
    name: 'PILOT \u2013 CHROMOLY 520',
    category: 'Mountain Bike',
    price: 3999.99,
    image: '/images/bike-pilot-chromoly.png',
    description:
      'The PILOT Chromoly 520 is a versatile mountain bike built with a durable chromoly steel frame. Designed for rugged trails and off-road adventures, it features premium suspension and reliable disc brakes for confident handling on any terrain.',
  },
  {
    id: 'smith-trade',
    name: 'SMITH \u2013 Trade',
    category: 'Road Helmet',
    price: 120,
    image: '/images/helmet-smith-trade.png',
    description:
      'The SMITH Trade helmet combines safety with aerodynamic design. Featuring MIPS technology and generous ventilation, this helmet delivers superior protection and comfort for road cycling enthusiasts.',
  },
];

/**
 * Category definitions for the Discover page horizontal filter row.
 *
 * Contains exactly 5 categories in the exact order matching the Figma
 * category filter layout (left-to-right): All, Electric, Road, Mountain, Accessory.
 *
 * The `icon` field maps to SVG files in `src/assets/icons/` — e.g.,
 * `'category-all'` resolves to `src/assets/icons/category-all.svg`.
 *
 * Consumed by:
 * - Discover page (`src/app/page.tsx`) for the category filter bar
 * - CategoryFilter component for rendering category icon buttons
 */
export const categories: Category[] = [
  { id: 'all', name: 'All', icon: 'category-all' },
  { id: 'electric', name: 'Electric', icon: 'category-electric' },
  { id: 'road', name: 'Road', icon: 'category-road' },
  { id: 'mountain', name: 'Mountain', icon: 'category-mountain' },
  { id: 'accessory', name: 'Accessory', icon: 'category-accessory' },
];
