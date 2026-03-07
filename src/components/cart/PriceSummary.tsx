'use client';

/**
 * PriceSummary — Price breakdown rows for the Shopping Bag page.
 *
 * Renders three label-value rows:
 * - Subtotal: computed sum of (price × quantity) for all cart items
 * - Delivery Fee: always $0 (free shipping)
 * - Discount: percentage based on applied coupon (30% for "Bike30")
 *
 * Reads from the Zustand cart store via selector pattern.
 * Labels use Poppins 500 (font-medium) 15px rgba(255,255,255,0.87).
 * Values use Poppins 400 (font-normal) 15px rgba(255,255,255,0.6).
 *
 * Figma reference: node 1:223 within Shopping Bag screen (1:214).
 *
 * @module components/cart/PriceSummary
 */

import React from 'react';
import { useCartStore } from '@/store/cart-store';

/**
 * PriceSummary component displays the price breakdown section of the
 * Shopping Bag page with Subtotal, Delivery Fee, and Discount rows.
 *
 * Each row renders a left-aligned label and a right-aligned value using
 * flex layout with justify-between alignment. The container applies
 * 20px horizontal margin (mx-5) matching the page's consistent padding.
 *
 * @returns JSX element containing three price breakdown rows
 */
function PriceSummary(): React.JSX.Element {
  /**
   * Read computed price values from Zustand cart store via reactive selectors.
   *
   * Each selector calls the getter function INSIDE the selector so that
   * Zustand compares the returned numeric VALUE (not the function reference).
   * This ensures the component re-renders when underlying data changes
   * (e.g., after store rehydration or cart modifications).
   */
  const subtotalValue = useCartStore((state) => state.getSubtotal());
  const deliveryFeeValue = useCartStore((state) => state.getDeliveryFee());
  const discountValue = useCartStore((state) => state.getDiscount());

  /**
   * Format subtotal as "$" + number with 2 decimal places.
   * Matches Figma text "$6119.99" (no comma separator per design).
   */
  const formattedSubtotal = `$${subtotalValue.toFixed(2)}`;

  /**
   * Format delivery fee as "$0" (not "$0.00").
   * Per Figma design and cart store logic, delivery is always free.
   */
  const formattedDeliveryFee = `$${deliveryFeeValue}`;

  /**
   * Format discount as a percentage string.
   * Returns "30%" when Bike30 coupon is applied, "0%" otherwise.
   */
  const formattedDiscount = `${Math.round(discountValue * 100)}%`;

  return (
    <div className="mx-5 space-y-2">
      {/* Subtotal Row */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-[15px] leading-[1.5em] text-text-semi">
          Subtotal:
        </span>
        <span className="font-normal text-[15px] leading-[1.5em] text-text-muted">
          {formattedSubtotal}
        </span>
      </div>

      {/* Delivery Fee Row */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-[15px] leading-[1.5em] text-text-semi">
          Delivery Fee:
        </span>
        <span className="font-normal text-[15px] leading-[1.5em] text-text-muted">
          {formattedDeliveryFee}
        </span>
      </div>

      {/* Discount Row */}
      <div className="flex items-center justify-between">
        <span className="font-medium text-[15px] leading-[1.5em] text-text-semi">
          Discount:
        </span>
        <span className="font-normal text-[15px] leading-[1.5em] text-text-muted">
          {formattedDiscount}
        </span>
      </div>
    </div>
  );
}

export default PriceSummary;
