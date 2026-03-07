'use client';

/**
 * PaginationDots — Image Pagination Indicator Dots
 *
 * Simple presentational component that renders a horizontal row of circular
 * pagination dots below the product image on the Detail page. The active dot
 * is highlighted in white while inactive dots are dimmed.
 *
 * Figma reference: Component Set "Dots" (node 1:25), Variant 1 (node 1:34).
 * Design context: 3 dots below the product image on the Detail screen (node 1:180).
 *
 * Figma tokens referenced:
 *   - Active dot fill: #FFFFFF (color-text-white)
 *   - Inactive dot fill: rgba(255, 255, 255, 0.3)
 *   - Dot size: 8px × 8px
 *   - Gap between dots: 8px
 *   - Background surface: #242C3B (color-bg-primary)
 */

/**
 * Props for the PaginationDots component.
 */
export interface PaginationDotsProps {
  /** Total number of dots to render (e.g., 3) */
  total: number;
  /** Zero-based index of the active (white-filled) dot */
  active: number;
}

/**
 * Renders a row of pagination indicator dots. The dot at the `active` index
 * displays with a solid white fill (#FFFFFF), and all other dots display
 * with a dim white fill (rgba(255, 255, 255, 0.3)).
 *
 * Container: flex row, centered, gap 8px (gap-2)
 * Active dot: 8×8px, bg-white, fully round
 * Inactive dots: 8×8px, bg-white/30, fully round
 *
 * @param props - Component props containing `total` and `active`
 * @returns A horizontal row of circular pagination indicator dots
 */
export default function PaginationDots({ total, active }: PaginationDotsProps) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="tablist"
      aria-label="Image pagination"
    >
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`block w-2 h-2 rounded-full${
            index === active ? ' bg-white' : ' bg-white/30'
          }`}
          role="tab"
          aria-selected={index === active}
          aria-label={`Image ${index + 1} of ${total}`}
        />
      ))}
    </div>
  );
}
