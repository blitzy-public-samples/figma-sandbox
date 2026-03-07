/**
 * Central cart state management store for the Online Bike Shopping App.
 *
 * Uses Zustand v5 with the `persist` middleware to maintain cart state
 * (items, coupon code, coupon application status) across page navigations
 * and browser refreshes via localStorage.
 *
 * Consumers:
 * - BuyNowBar (Detail page) — calls addToCart(product)
 * - CartItemList, CartItem (Cart page) — reads items
 * - QuantityStepper (Cart page) — calls updateQuantity(id, delta)
 * - CouponInput (Cart page) — calls applyCoupon(code)
 * - PriceSummary (Cart page) — reads getSubtotal(), getDeliveryFee(), getDiscount()
 * - TotalDisplay (Cart page) — reads getTotal()
 * - TabBar (Discover page) — optionally reads items.length for cart badge
 *
 * @module store/cart-store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types/product';

/**
 * Complete shape of the cart store state, including data properties,
 * mutation actions, and computed value getters.
 *
 * All prices are numeric (e.g., 1999.99), never formatted strings.
 * Coupon "Bike30" is the only supported code (case-insensitive).
 * Delivery fee is always $0 (free shipping).
 */
export interface CartState {
  /** Array of cart items, each pairing a full Product object with its quantity. */
  items: CartItem[];

  /** The current coupon code string entered by the user (empty string by default). */
  couponCode: string;

  /** Whether the current coupon code has been validated and applied successfully. */
  isCouponApplied: boolean;

  /**
   * Adds a product to the cart. If the product already exists (matched by
   * product.id), increments its quantity by 1. Otherwise, creates a new
   * CartItem with quantity 1.
   */
  addToCart: (product: Product) => void;

  /**
   * Removes an item from the cart entirely by filtering out the item
   * whose product.id matches the given id.
   */
  removeFromCart: (id: string) => void;

  /**
   * Adjusts the quantity of a cart item by the given delta (+1 or -1 typically).
   * If the resulting quantity drops to 0 or below, the item is removed entirely.
   */
  updateQuantity: (id: string, delta: number) => void;

  /**
   * Validates and applies a coupon code. Only "Bike30" (case-insensitive)
   * is a valid code, granting a 30% discount. Invalid codes are stored
   * but not applied.
   */
  applyCoupon: (code: string) => void;

  /**
   * Computes the subtotal by summing (product.price × quantity) for all
   * items in the cart. Returns 0 for an empty cart.
   */
  getSubtotal: () => number;

  /**
   * Returns the delivery fee. Always returns 0 (free shipping) as per
   * the Figma design specification.
   */
  getDeliveryFee: () => number;

  /**
   * Returns the discount rate as a decimal. Returns 0.30 when a valid
   * coupon is applied ("Bike30"), otherwise returns 0.
   */
  getDiscount: () => number;

  /**
   * Computes the final total using the formula:
   * total = subtotal × (1 - discount) + deliveryFee
   *
   * When "Bike30" coupon is applied: total = subtotal × 0.70
   * Rounds to 2 decimal places to avoid floating-point precision issues.
   */
  getTotal: () => number;
}

/**
 * Zustand cart store hook with localStorage persistence.
 *
 * Created using the Zustand v5 double-parenthesis pattern:
 * create<CartState>()(persist((set, get) => ({ ... }), { name: 'cart-storage' }))
 *
 * The persist middleware automatically saves and restores the full store
 * state to/from localStorage under the key "cart-storage".
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      /* ─── Initial State ─── */
      items: [],
      couponCode: '',
      isCouponApplied: false,

      /* ─── Mutation Actions ─── */

      addToCart: (product: Product): void => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingIndex !== -1) {
          // Product already in cart — increment its quantity by 1
          const updatedItems = items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: updatedItems });
        } else {
          // New product — add with quantity 1
          set({ items: [...items, { product, quantity: 1 }] });
        }
      },

      removeFromCart: (id: string): void => {
        const { items } = get();
        const filteredItems = items.filter(
          (item) => item.product.id !== id
        );
        set({ items: filteredItems });
      },

      updateQuantity: (id: string, delta: number): void => {
        const { items } = get();
        const updatedItems = items
          .map((item) => {
            if (item.product.id === id) {
              const newQuantity = item.quantity + delta;
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);

        set({ items: updatedItems });
      },

      applyCoupon: (code: string): void => {
        const isValid = code.toLowerCase() === 'bike30';
        set({
          couponCode: code,
          isCouponApplied: isValid,
        });
      },

      /* ─── Computed Value Getters ─── */

      getSubtotal: (): number => {
        const { items } = get();
        if (items.length === 0) {
          return 0;
        }
        const sum = items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        // Round to 2 decimal places to prevent IEEE 754 floating-point
        // precision drift when summing monetary values (e.g., $1999.99 +
        // $3999.99 + $120 should yield exactly $6119.98, not 6119.9799…)
        return Math.round(sum * 100) / 100;
      },

      getDeliveryFee: (): number => {
        // Free shipping — per Figma design: "Delivery Fee: $0"
        // and "Your cart qualifies for free shipping"
        return 0;
      },

      getDiscount: (): number => {
        const { isCouponApplied } = get();
        return isCouponApplied ? 0.30 : 0;
      },

      getTotal: (): number => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const deliveryFee = get().getDeliveryFee();

        // Formula: total = subtotal × (1 - discount) + deliveryFee
        // Round to 2 decimal places to prevent floating-point precision issues
        const total = subtotal * (1 - discount) + deliveryFee;
        return Math.round(total * 100) / 100;
      },
    }),
    {
      name: 'cart-storage',
      /**
       * skipHydration prevents the persist middleware from auto-reading
       * localStorage during SSR (server-side rendering), which avoids
       * React hydration mismatches in Next.js App Router.
       *
       * Consumer components must call `useCartStore.persist.rehydrate()`
       * inside a client-side `useEffect` to restore persisted state:
       *
       * @example
       * ```tsx
       * useEffect(() => { useCartStore.persist.rehydrate(); }, []);
       * ```
       */
      skipHydration: true,
    }
  )
);
