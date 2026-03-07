'use client';

/**
 * CartPage — Shopping Bag page component (Route: `/cart`).
 *
 * Renders the complete shopping cart experience as a vertically-stacked
 * mobile layout within the 390×844 device frame. Composes 7 child
 * components and one inline free-shipping banner in this order:
 *
 * 1. StatusBar — Decorative iOS status bar
 * 2. PageHeader — Back button + "My Shopping Cart" title
 * 3. CartItemList — 3 cart items with quantity steppers and separators
 * 4. Free Shipping Banner — inline text message
 * 5. CouponInput — "Bike30" input + Apply button
 * 6. PriceSummary — Subtotal, Delivery Fee, Discount rows
 * 7. TotalDisplay — Computed total in accent blue
 * 8. CheckoutSlider — Slide-to-checkout control
 *
 * Cart state is managed via Zustand (`useCartStore`) with localStorage
 * persistence. On first mount, the cart is pre-populated with 3 demo
 * products and the "Bike30" coupon is pre-applied to match the Figma
 * design showing a 30% discount.
 *
 * Figma reference: Node 1:214, Shopping Bag screen
 * (File key: 6FWdXDJV3foFfDfOhmkORj)
 *
 * @module app/cart/page
 */

import { useEffect } from 'react';
import StatusBar from '@/components/layout/StatusBar';
import PageHeader from '@/components/layout/PageHeader';
import CartItemList from '@/components/cart/CartItemList';
import CouponInput from '@/components/cart/CouponInput';
import PriceSummary from '@/components/cart/PriceSummary';
import TotalDisplay from '@/components/cart/TotalDisplay';
import CheckoutSlider from '@/components/cart/CheckoutSlider';
import { useCartStore } from '@/store/cart-store';
import { products } from '@/store/products';

/**
 * CartPage — Default page export for the `/cart` route.
 *
 * This is a client component (marked with `'use client'`) because it:
 * - Reads from the Zustand cart store via React hooks
 * - Uses `useEffect` for cart initialization and store rehydration
 * - Handles interactive actions (checkout callback)
 *
 * The component owns cart initialization logic (populating demo data)
 * while delegating store reads/writes to individual child components
 * (CartItemList, CouponInput, PriceSummary, TotalDisplay).
 */
export default function CartPage() {
  /* ─── Store Selectors ───
     Access cart store values via Zustand selector pattern.
     - `items`: Subscribes to cart item changes for reactive re-renders
     - `addToCart`: Called during mount-only initialization
     - `applyCoupon`: Called to pre-apply "Bike30" on first load */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const applyCoupon = useCartStore((state) => state.applyCoupon);

  /* ─── Cart Initialization & Store Rehydration ───
     On first mount:
     1. Rehydrate the Zustand persist store from localStorage.
        Required because cart-store uses `skipHydration: true` to
        prevent SSR hydration mismatches in Next.js App Router.
     2. After rehydration, check if the cart is empty. If so,
        populate with 3 demo products matching the Figma design
        and pre-apply the "Bike30" coupon for 30% discount.

     Uses `useCartStore.getState()` for the emptiness check to read
     the post-rehydration state accurately (closure-captured `items`
     would still hold the pre-rehydration value of `[]`). */
  useEffect(() => {
    /* Step 1: Rehydrate persisted state from localStorage */
    useCartStore.persist.rehydrate();

    /* Step 2: Initialize cart with demo products if still empty.
       Reads items via getState() for post-rehydration accuracy
       (closure-captured `items` still holds pre-rehydration []).
       Uses selector-derived addToCart/applyCoupon — these are stable
       function references that always operate on current store state. */
    const currentItems = useCartStore.getState().items;
    if (currentItems.length === 0) {
      products.forEach((product) => addToCart(product));
      applyCoupon('Bike30');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Checkout Handler ───
     Placeholder callback for the CheckoutSlider component.
     Per AAP Section 0.7.2: "Checkout flow beyond the slider" is
     explicitly out of scope. This handler demonstrates the
     interaction works without implementing actual checkout logic. */
  const handleCheckout = () => {
    alert('Checkout initiated!');
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-y-auto">
      {/* ─── 1. Status Bar ───
          Decorative iOS status bar at the very top (~44px height).
          No props — purely visual element (SF Pro Text "9:41", signal/wifi/battery). */}
      <StatusBar />

      {/* ─── 2. Page Header (Back Mode) ───
          Back button (44×44 gradient) + "My Shopping Cart" title.
          Gap: 56px between BackButton and title (handled by PageHeader).
          Title: Poppins 700 20px #FFFFFF.
          Figma: ~12px gap below StatusBar (y:~56 for navigation start). */}
      <div className="mt-3">
        <PageHeader title="My Shopping Cart" showBack />
      </div>

      {/* ─── 3. Cart Items List ───
          3 cart items (PEUGEOT LR01, PILOT Chromoly 520, SMITH Trade)
          with 0.5px semi-transparent white separators between items.
          Each item: product image (100×90), name, price, QuantityStepper.
          Reads from Zustand store — no props needed.
          Figma: Cart Items at y:136. Gap from PageHeader: ~36px. */}
      <div className="mt-9">
        <CartItemList />
      </div>

      {/* ─── 4. Free Shipping Banner ───
          Inline text — NOT a separate component (single text line per Figma node 1:216).
          Font: Poppins 400 15px / 1.5em, letter-spacing: -2%.
          Color: rgba(255,255,255,0.6) — color-text-muted token.
          Horizontal margin: 20px (mx-5) matching space-page-x token.
          Figma: y:516, ~24px gap below CartItemList bottom. */}
      <div className="mt-6 mx-5">
        <p
          className="font-normal text-[15px] leading-[1.5em] tracking-[-0.02em] text-text-muted"
        >
          Your cart qualifies for free shipping
        </p>
      </div>

      {/* ─── 5. Coupon Input Section ───
          Pre-filled with "Bike30", manages own state and store interaction.
          Input: bg #242C3B, radius 8px, inset shadow.
          Apply button: 114×44, gradient fill, radius 10px.
          Calls applyCoupon(code) from cart-store on Apply click.
          Figma: y:563, ~24px gap below FreeShipping. */}
      <div className="mt-6">
        <CouponInput />
      </div>

      {/* ─── 6. Price Summary Breakdown ───
          Three rows: "Subtotal:" / "$6119.99", "Delivery Fee:" / "$0", "Discount:" / "30%".
          Labels: Poppins 500 15px rgba(255,255,255,0.87).
          Values: Poppins 400 15px rgba(255,255,255,0.6).
          Reads computed values from Zustand store.
          Figma: y:623, ~16px gap below Coupon. */}
      <div className="mt-4">
        <PriceSummary />
      </div>

      {/* ─── 7. Total Display ───
          "Total:" label + computed total (e.g., "$4,283.99").
          Total amount: Poppins 700 17px #38B8EA (color-accent-blue-3).
          Reads from Zustand store getTotal(). */}
      <div className="mt-4">
        <TotalDisplay />
      </div>

      {/* ─── 8. Checkout Slider ───
          174×44, radius 10px, inset shadow.
          "Checkout" muted text + 44×44 gradient draggable handle.
          Centered via mx-auto in CheckoutSlider component.
          Figma: y:770, ~20px gap below Total.
          pb-8 adds bottom safe area padding within device frame. */}
      <div className="mt-5 pb-8">
        <CheckoutSlider onCheckout={handleCheckout} />
      </div>
    </div>
  );
}
