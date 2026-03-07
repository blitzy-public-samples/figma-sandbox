'use client';

/**
 * TotalDisplay — Total Price Display for the Shopping Bag screen.
 *
 * Renders the "Total:" label on the left and the computed cart total
 * (formatted as "$X,XXX.XX") in accent blue (#38B8EA) on the right.
 *
 * Reads the total from the Zustand cart store via `getTotal()`, which
 * computes: subtotal × (1 - discount) + deliveryFee, rounded to 2dp.
 *
 * Figma reference: node 1:337 in the Shopping Bag screen (1:214).
 *
 * @module components/cart/TotalDisplay
 */

import React from 'react';
import { useCartStore } from '@/store/cart-store';

/**
 * Renders a flex row containing the "Total:" label and the computed
 * cart total price in accent blue.
 *
 * - "Total:" label: Poppins 500 (font-medium), 15px, rgba(255,255,255,0.87)
 * - Total amount: Poppins 700 (font-bold), 17px, #38B8EA (color-accent-blue-3)
 * - Layout: flex row, justify-between, items-center, mx-5 (20px side padding)
 */
export default function TotalDisplay(): React.JSX.Element {
  /**
   * Select the COMPUTED total value (number) from the Zustand cart store.
   *
   * CRITICAL: The selector calls `state.getTotal()` — invoking the getter
   * function inside the selector — so that Zustand receives the numeric
   * result and can detect changes via `Object.is()` comparison. Selecting
   * the function reference (`state.getTotal`) instead would return a stable
   * identity that never changes, preventing re-renders when only the coupon
   * or discount state changes (without an accompanying `items` mutation).
   */
  const totalValue = useCartStore((state) => state.getTotal());

  /**
   * Format the computed total as a USD string with commas and 2 decimals.
   * Example: 4283.99 → "4,283.99"
   */
  const formattedTotal = totalValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex items-center justify-between mx-5">
      {/* "Total:" label — left-aligned, color-text-semi token */}
      <span
        className="font-medium text-[15px] leading-[1.5em] text-text-semi"
      >
        Total:
      </span>

      {/* Computed total amount — right-aligned, accent blue (#38B8EA) */}
      <span className="font-bold text-[17px] leading-[1.5em] text-[#38B8EA]">
        ${formattedTotal}
      </span>
    </div>
  );
}
