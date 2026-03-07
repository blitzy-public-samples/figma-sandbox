/**
 * ProductGrid — 2-Column Staggered/Masonry Product Card Grid
 *
 * Renders a Pinterest-style masonry layout with two columns of ProductCard
 * components. Products are distributed by alternating indices (even → left,
 * odd → right), with the right column offset by 20px to create the visual
 * stagger effect matching the Figma design (Node 1:71).
 *
 * Layout specifications from Figma Phase 2 Reconciliation:
 * - Horizontal padding: 20px each side (token: space-page-x → px-5)
 * - Column gap: ~14px between left and right columns
 * - Row gap: ~14px between cards within the same column
 * - Stagger offset: ~20px top padding on right column
 * - Usable width: 350px (390px device − 40px padding)
 * - Each column: ~168px (flex: 1 shares remaining space equally)
 *
 * This is a server component — no client-side interactivity required.
 * Each ProductCard internally handles its own Link navigation.
 *
 * @module components/discover/ProductGrid
 */

import type { Product } from '@/types/product';
import ProductCard from '@/components/discover/ProductCard';

/**
 * Props for the ProductGrid component.
 */
interface ProductGridProps {
  /** Array of Product objects to render in the masonry grid */
  products: Product[];
}

/**
 * ProductGrid renders products in a 2-column staggered masonry layout.
 *
 * The component splits products by index parity — even indices go to the
 * left column, odd indices to the right column. The right column receives
 * a 20px top offset to create the characteristic masonry stagger effect
 * visible in the Figma design.
 *
 * Handles any number of products gracefully:
 * - 0 products → returns null (no empty state in Figma)
 * - 1 product → single card in left column
 * - N products → distributed across two columns
 *
 * @param props - ProductGridProps containing the products array
 * @returns JSX element representing the masonry grid, or null if empty
 */
export default function ProductGrid({ products }: ProductGridProps) {
  /* Empty state: show a user-friendly message when no products match the
     active category filter. Styled to match the dark theme with muted text
     (Poppins 400 15px rgba(255,255,255,0.6)) and centered within the grid area. */
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center px-5 py-12">
        <p className="text-[15px] font-normal leading-[1.5em] tracking-[-0.02em] text-white/60 text-center">
          No products found in this category.
        </p>
      </div>
    );
  }

  /* Split products into two columns by index parity.
     Even indices (0, 2, 4…) → left column
     Odd indices  (1, 3, 5…) → right column
     This matches the Figma arrangement:
       Left:  PEUGEOT LR01 (0), SMITH Trade (2), Items 5 (4)
       Right: PILOT Chromoly (1), Items 9 (3), Items 6 (5) */
  const leftColumn = products.filter((_, index) => index % 2 === 0);
  const rightColumn = products.filter((_, index) => index % 2 !== 0);

  return (
    <div className="flex gap-[14px] px-5 justify-center">
      {/* Left column — explicit 165px width per Figma spec (node 1:71).
          flex-1 previously produced ~168px from (350−14)/2; the fixed width
          ensures pixel-perfect 165px card width matching the Figma design. */}
      <div className="flex w-[165px] flex-col gap-[14px]">
        {leftColumn.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Right column — 20px top padding creates the masonry stagger offset.
          This makes the right column start lower than the left, producing
          the Pinterest/masonry visual effect from the Figma design. */}
      <div className="flex w-[165px] flex-col gap-[14px] pt-[20px]">
        {rightColumn.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
