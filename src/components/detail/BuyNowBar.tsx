'use client';

/**
 * BuyNowBar — Fixed bottom purchase bar for the Product Detail page.
 *
 * Renders the product price (formatted with dollar sign, comma separators,
 * and 2 decimal places) on the left and an "Add to Cart" gradient button
 * on the right. The bar uses a pill shape (50 px radius), upward box-shadow,
 * and a gradient stroke overlay for the neumorphic design language.
 *
 * This component does NOT import the cart store directly — the parent page
 * passes an `onAddToCart` callback, keeping the component testable and
 * decoupled from global state.
 *
 * Figma reference: node 1:192 (Buy Now Section) in file 6FWdXDJV3foFfDfOhmkORj
 */

/* ------------------------------------------------------------------ */
/*  Props interface                                                    */
/* ------------------------------------------------------------------ */

/** Props accepted by the BuyNowBar component. */
export interface BuyNowBarProps {
  /** Product price as a numeric value (e.g. 1999.99). */
  price: number;
  /** Callback invoked when the user taps "Add to Cart". */
  onAddToCart: () => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Formats a numeric price into the display string shown in the Figma design.
 *
 * Examples:
 *   1999.99  → "$ 1,999.99"
 *   3999.99  → "$ 3,999.99"
 *   120      → "$ 120.00"
 */
function formatPrice(value: number): string {
  return `$ ${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * BuyNowBar — fixed bottom bar with price and "Add to Cart" button.
 *
 * Design tokens (from AAP Token Manifest §0.5.2):
 *   - Bar bg        : #262E3D  (color-surface-sheet)
 *   - Bar radius    : 50px     (radius-device)
 *   - Bar shadow    : 0px -10px 40px rgba(28,34,46,1)  (shadow-buynow)
 *   - Bar stroke    : linear-gradient(180deg, #FFF 0%, #000 69%) 2px (stroke-buynow)
 *   - Price color   : #3D9CEA  (color-accent-blue-1)
 *   - Price font    : Poppins 400 24px / 1.5em / ls -1.25%
 *   - Button bg     : linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%) (gradient-primary-button)
 *   - Button radius : 10px     (radius-button)
 *   - Button shadow : 0px 30px 60px rgba(26,31,44,1)  (shadow-cta)
 *   - Button stroke : linear-gradient(135deg, #FFF 0%, #000 100%) 1px (stroke-button — kept as 2px per reconciled spec)
 *   - Button font   : Poppins 500 15px / 1.5em / ls -2% / #FFFFFF
 */
export default function BuyNowBar({ price, onAddToCart }: BuyNowBarProps) {
  return (
    /* Bar container:
     * - bg-surface-sheet: #262E3D fill
     * - rounded-device: 50px pill radius
     * - shadow-buynow: 0px -10px 40px rgba(28,34,46,1) upward shadow
     * - gradient-stroke-buynow: 2px stroke via ::before pseudo-element
     *   using var(--stroke-buynow) = linear-gradient(180deg, #FFF 0%, #000 69%)
     *   with mask-composite technique (AAP Rule #2)
     */
    <div
      className="relative w-full h-[104px] rounded-device flex items-center justify-between px-5 z-30 bg-surface-sheet shadow-buynow gradient-stroke-buynow"
    >
      {/* ── Price display (left side) ────────────────────────────── */}
      <span
        className="relative z-10 text-[24px] font-normal leading-[1.5em] tracking-[-0.0125em] text-accent-blue-1"
      >
        {formatPrice(price)}
      </span>

      {/* ── "Add to Cart" button (right side) ────────────────────── */}
      {/*
       * - bg-gradient-primary: linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)
       * - shadow-cta: 0px 30px 60px rgba(26,31,44,1)
       * - gradient-stroke-button: 1px stroke via ::before pseudo-element
       *   using var(--stroke-button) = linear-gradient(135deg, #FFF 0%, #000 100%)
       * - rounded-button: 10px radius
       */}
      <button
        type="button"
        onClick={onAddToCart}
        className="relative z-10 w-[160px] h-[44px] rounded-button text-[15px] font-medium leading-[1.5em] tracking-[-0.02em] text-white cursor-pointer bg-gradient-primary shadow-cta gradient-stroke-button"
      >
        Add to Cart
      </button>
    </div>
  );
}
