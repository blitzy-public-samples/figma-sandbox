'use client';

import type { Category } from '@/types/product';

/**
 * Inline SVG icon components for each product category.
 *
 * These replicate the downloaded Figma assets in src/assets/icons/category-*.svg
 * and use currentColor for dynamic color theming — white (#FFFFFF) when active,
 * muted (rgba(255,255,255,0.6)) when inactive. Inline SVGs avoid the need
 * for SVGR configuration or serving from public/.
 */
const categoryIcons: Record<string, React.ReactNode> = {
  'category-all': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Bicycle icon — "All" category */}
      <circle cx="6.5" cy="17" r="3.5" />
      <circle cx="17.5" cy="17" r="3.5" />
      <polyline points="6.5,17 10,9 17.5,17" />
      <line x1="10" y1="9" x2="15" y2="9" />
      <line x1="15" y1="9" x2="17.5" y2="17" />
      <line x1="15" y1="9" x2="17" y2="7" />
      <line x1="9" y1="8" x2="11" y2="8" />
      <line x1="10" y1="9" x2="10" y2="8" />
    </svg>
  ),

  'category-electric': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Electric scooter icon with lightning bolt */}
      <line x1="7" y1="16" x2="17" y2="16" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <line x1="17" y1="16" x2="19" y2="8" />
      <line x1="17.5" y1="8" x2="20.5" y2="8" />
      <polyline points="11,6 9,11 12,11 10,15" />
    </svg>
  ),

  'category-road': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Cycling helmet icon — Road category */}
      <path d="M4 14c0-5 3.5-8 8-8s8 3 8 8" />
      <path d="M4 14c0 1.5 1 3 3 3h10c2 0 3-1.5 3-3" />
      <line x1="8" y1="10" x2="9.5" y2="8" />
      <line x1="11" y1="9" x2="12" y2="7" />
      <line x1="14" y1="9" x2="15" y2="7.5" />
    </svg>
  ),

  'category-mountain': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Mountain peaks icon */}
      <polyline points="2,20 9,6 16,20" />
      <polyline points="12,20 17,10 22,20" />
      <polyline points="7,10 9,6 11,10" />
    </svg>
  ),

  'category-accessory': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Wrench/tool accessory icon */}
      <path d="M5 3l-2 2c-1 1-1 2.5 0 3.5l1 1c1 1 2.5 1 3.5 0l2-2" />
      <line x1="8" y1="8" x2="16" y2="16" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="18" cy="18" r="1.2" />
    </svg>
  ),
};

/* ================================================================
   PROPS INTERFACE
   ================================================================ */

/**
 * Props for the CategoryItem component.
 */
interface CategoryItemProps {
  /** Category data object containing id, name, and icon identifier */
  category: Category;
  /** Whether this category is currently selected/active */
  isActive: boolean;
  /** Click handler fired when the user taps this category button */
  onClick: () => void;
}

/* ================================================================
   COMPONENT
   ================================================================ */

/**
 * CategoryItem — Individual 50×50 category icon button.
 *
 * Used as a child of CategoryFilter to render one category in the
 * horizontal filter row on the Discover page. Supports two visual states:
 *
 * **Active** (selected):
 *   - Fill: gradient-primary-button (142deg, #34C8E8 → #4E4AF2)
 *   - Icon: white (#FFFFFF)
 *   - No gradient stroke
 *
 * **Inactive** (unselected):
 *   - Fill: gradient-card-darker (154deg, #363E51 → #191E26)
 *   - Stroke: gradient stroke-category (108deg, #FFF 8% → #000 82%) via ::before
 *   - Icon: muted white (rgba(255,255,255,0.6))
 *   - Backdrop filter: blur(30px)
 *
 * Figma reference: Nodes 1:51–1:68, File Key 6FWdXDJV3foFfDfOhmkORj
 */
export default function CategoryItem({
  category,
  isActive,
  onClick,
}: CategoryItemProps) {
  /* Resolve the inline SVG icon from the category.icon identifier */
  const icon = categoryIcons[category.icon] ?? null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={category.name}
      aria-pressed={isActive}
      className={[
        /* Common properties — both states */
        'w-[50px] h-[50px] shrink-0',
        'rounded-[10px]',
        'flex items-center justify-center',
        'cursor-pointer',
        /* Accessible focus indicator — visible ring on keyboard navigation */
        'focus-visible:ring-2 focus-visible:ring-[#34C8E8] focus-visible:outline-none',
        /* Active state: gradient fill, white icon, no stroke */
        isActive && 'bg-gradient-primary text-white',
        /* Inactive state: dark fill, gradient stroke, muted icon, blur */
        !isActive && [
          'bg-gradient-card-darker',
          'gradient-stroke-category',
          'blur-category',
          'text-white/60',
        ],
      ]
        .flat()
        .filter(Boolean)
        .join(' ')}
    >
      {icon}
    </button>
  );
}
