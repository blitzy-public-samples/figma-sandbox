'use client';

/**
 * ProductDescription — Product Title and Body Description Text
 *
 * Presentational component rendered inside the Bottom Sheet on the Detail page.
 * Displays a product name heading and description paragraph with exact Figma
 * typography specifications from the Phase 2 Reconciled Specification (node 1:199).
 *
 * Figma tokens referenced:
 *   - text-section-heading: Poppins / 700 / 17px / 1.5em / -1.76%
 *   - text-body: Poppins / 400 / 15px / 1.5em / -2%
 *   - color-text-white: #FFFFFF
 *   - color-text-muted: rgba(255, 255, 255, 0.6)
 *   - space-page-x: 20px
 */

/**
 * Props for the ProductDescription component.
 */
export interface ProductDescriptionProps {
  /** Product name displayed as the title heading (e.g., "PEUGEOT - LR01") */
  name: string;
  /** Product body description paragraph text */
  description: string;
}

/**
 * Renders the product title and description body text inside the Detail page's
 * Bottom Sheet. Uses semantic HTML (<h2> for title, <p> for body) with exact
 * Figma typography specifications.
 *
 * Container: flex column, gap 12px (gap-3), horizontal padding 20px (px-5)
 * Title: Poppins 700 17px #FFFFFF, letter-spacing -1.76%, line-height 1.5em
 * Body: Poppins 400 15px rgba(255,255,255,0.6), letter-spacing -2%, line-height 1.5em, max-width 335px
 */
export default function ProductDescription({ name, description }: ProductDescriptionProps) {
  return (
    <div className="flex flex-col gap-3 px-5">
      {/* Product title — text-section-heading token */}
      <h2 className="text-[17px] font-bold leading-[1.5em] tracking-[-0.0176em] text-white">
        {name}
      </h2>

      {/* Product description body — text-body token */}
      <p className="text-[15px] font-normal leading-[1.5em] tracking-[-0.02em] text-white/60 max-w-[335px]">
        {description}
      </p>
    </div>
  );
}
