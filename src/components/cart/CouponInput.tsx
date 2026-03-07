'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';

/**
 * CouponInput — Coupon code input field with gradient "Apply" button.
 *
 * Renders a neumorphic recessed text input (pre-filled with "Bike30") alongside
 * a primary gradient Apply button. The input uses an inset shadow against the
 * dark background (#242C3B) to create a sunken/recessed appearance. The Apply
 * button uses the blue-to-purple gradient (#34C8E8 → #4E4AF2) with a subtle
 * gradient stroke overlay.
 *
 * Interacts with the Zustand cart store to validate and apply coupon codes.
 * The "Bike30" code grants a 30% discount on the cart subtotal.
 *
 * Figma Reference: Node 1:217 — Shopping Bag screen coupon section
 * Container: 350×44 (390px parent - 40px horizontal margins)
 *
 * @module components/cart/CouponInput
 */
export default function CouponInput() {
  /* Local state for the coupon code input — pre-filled with "Bike30" per Figma */
  const [code, setCode] = useState('Bike30');

  /* Cart store action: validates code (case-insensitive "Bike30") and applies 30% discount */
  const applyCoupon = useCartStore((state) => state.applyCoupon);

  return (
    <div className="flex items-center mx-5 h-[44px]">
      {/* ─── Coupon Code Input Field ───
          Fill: #242C3B (bg-primary) — same as page bg for sunken effect
          Radius: 8px left-side only (flat right edge meets button)
          Shadow: inset 4px 10px 30px rgba(25,30,41,1) — neumorphic recess
          Text: Poppins 400, 13px, rgba(255,255,255,0.6)
          Letter-spacing: -0.62% (-0.0062em) */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon Code"
        aria-label="Coupon code"
        className="flex-1 min-w-0 h-full bg-bg-primary rounded-l-[8px] px-4 font-normal text-[13px] leading-[1.5em] tracking-[-0.0062em] text-text-muted placeholder:text-text-muted outline-none border-none shadow-coupon-inset"
      />

      {/* ─── Apply Button ───
          Size: 114×44px
          Fill: linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)
          Radius: 10px (all corners)
          Stroke: 1px gradient (white-to-black at 135deg) via pseudo-element
          Text: Poppins 700, 13px, #FFFFFF
          Letter-spacing: -0.62% (-0.0062em) */}
      <button
        type="button"
        onClick={() => applyCoupon(code)}
        className="relative w-[114px] h-[44px] rounded-button bg-gradient-primary gradient-stroke-button font-bold text-[13px] leading-[1.5em] tracking-[-0.0062em] text-white flex-shrink-0 flex items-center justify-center"
      >
        Apply
      </button>
    </div>
  );
}
