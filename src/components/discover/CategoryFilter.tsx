'use client';

import type { Category } from '@/types/product';
import CategoryItem from '@/components/discover/CategoryItem';

/* ================================================================
   PROPS INTERFACE
   ================================================================ */

/**
 * Props for the CategoryFilter component.
 *
 * @property categories     — Ordered array of Category objects (All → Electric → Road → Mountain → Accessory)
 * @property activeCategory — The `id` of the currently selected category
 * @property onCategoryChange — Callback invoked with the tapped category's `id`
 */
interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

/* ================================================================
   COMPONENT
   ================================================================ */

/**
 * CategoryFilter — Horizontal scrollable row of category icon buttons.
 *
 * Renders a flex row of 5 CategoryItem children within the Discover page,
 * positioned between the TopCard and the ProductGrid. The first item
 * ("All") is active by default with a blue-purple gradient background;
 * inactive items use a dark gradient with a gradient stroke.
 *
 * Layout specs (Figma node 1:50, file key 6FWdXDJV3foFfDfOhmkORj):
 *   - Horizontal padding: 20px each side (token: space-page-x)
 *   - Gap between items: ~14px (estimated from Figma spacing)
 *   - Each item: 50×50, border-radius 10px
 *   - Overflow: horizontally scrollable, scrollbar hidden
 *   - Total row: 5 × 50 + 4 × 14 = 306px — fits within 350px usable
 *
 * Scrollbar hiding is handled globally via globals.css
 * (::-webkit-scrollbar, scrollbar-width: none).
 */
export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-row items-center gap-[14px] px-5 overflow-x-auto flex-nowrap"
      role="toolbar"
      aria-label="Product categories"
    >
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          isActive={category.id === activeCategory}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
}
