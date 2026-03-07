/**
 * ProductCard — Individual product card for the Discover page grid.
 *
 * Renders a neumorphic dark card with:
 * - Gradient fill (159deg, #353F54 → #222834)
 * - 2px gradient stroke via mask-composite (115deg, #FFF → #000)
 * - Dual neumorphic box-shadow for floating effect
 * - Backdrop-filter blur(40px) for frosted glass depth
 * - Heart outline icon (decorative, top-right)
 * - Product image centered (Next.js optimized <Image>)
 * - Category label, product name, and formatted price
 *
 * The entire card is wrapped in a Next.js <Link> for navigation
 * to the product detail page at /product/[id].
 *
 * Design tokens from globals.css:
 * - bg-gradient-card-dark, gradient-stroke-card, shadow-card, blur-card
 *
 * @module components/discover/ProductCard
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';

/**
 * Props for the ProductCard component.
 */
interface ProductCardProps {
  /** Product data object containing id, name, category, price, image */
  product: Product;
  /** Optional decorative favorite state — visual only, no toggle functionality */
  isFavorited?: boolean;
}

/**
 * Formats a numeric price into a display string with dollar sign and commas.
 *
 * Handles both decimal prices (1999.99 → "$ 1,999.99") and whole number
 * prices (120 → "$ 120") to match Figma text content exactly.
 *
 * Uses string manipulation instead of toLocaleString for deterministic
 * SSR/client output consistency.
 *
 * @param price - Numeric price value from the Product interface
 * @returns Formatted price string with dollar sign, space, and comma separators
 */
function formatPrice(price: number): string {
  const parts = price.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] ? `.${parts[1]}` : '';
  return `$ ${integerPart}${decimalPart}`;
}

/**
 * ProductCard component renders a single product card in the masonry grid.
 *
 * This is a server component — Link and Image both work without 'use client'.
 * The card uses Tailwind CSS v4 custom utilities from globals.css for all
 * neumorphic styling, gradient fills, gradient strokes, and backdrop blur.
 *
 * @param props - ProductCardProps containing product data
 * @returns JSX element representing the product card
 */
export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatPrice(product.price);

  return (
    <Link
      href={`/product/${product.id}`}
      className="block"
    >
      {/* Card container with neumorphic styling
          - bg-gradient-card-dark: linear-gradient(159deg, #353F54 27%, #222834 85%)
          - gradient-stroke-card: 2px gradient stroke via ::before mask-composite
          - shadow-card: 0px 20px 60px rgba(16,20,28,1), 0px -20px 40px rgba(43,52,69,0.5)
          - blur-card: backdrop-filter blur(40px) with -webkit- prefix */}
      <div className="relative rounded-[20px] bg-gradient-card-dark gradient-stroke-card shadow-card blur-card overflow-hidden p-3">

        {/* Heart icon — decorative only, no toggle functionality per AAP scope.
            Positioned absolutely at top-right corner with 12px offset.
            Uses inline SVG matching src/assets/icons/heart-outline.svg path data.
            stroke="currentColor" inherits white from parent text-white class. */}
        <div
          className="absolute top-3 right-3 z-10 text-white"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Product image — centered in upper portion of card (~60% of height).
            Uses Next.js <Image> with fill mode for automatic optimization,
            lazy loading, and proper aspect ratio handling.
            object-contain preserves bike/helmet aspect ratio within the
            sized container. */}
        <div className="relative w-full h-[140px] flex items-center justify-center my-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="140px"
            className="object-contain"
          />
        </div>

        {/* Category label — Poppins 500 13px rgba(255,255,255,0.6)
            Token: text-small-label, color-text-muted */}
        <p className="text-[13px] font-medium leading-[1.5em] text-white/60">
          {product.category}
        </p>

        {/* Product name — Poppins 700 15px #FFFFFF, letter-spacing -2%
            Token: text-product-name, color-text-white */}
        <h3 className="text-[15px] font-bold leading-[1.5em] text-white tracking-[-0.02em]">
          {product.name}
        </h3>

        {/* Price — Poppins 500 13px rgba(255,255,255,0.6)
            Token: text-small-label, color-text-muted
            Format: "$ 1,999.99" with commas and optional decimals */}
        <p className="text-[13px] font-medium leading-[1.5em] text-white/60">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
}
