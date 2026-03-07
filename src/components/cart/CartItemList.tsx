'use client';

import React from 'react';
import { useCartStore } from '@/store/cart-store';
import CartItem from './CartItem';

/**
 * CartItemList — Scrollable vertical list of cart items with separators.
 *
 * Reads the full cart items array from the Zustand cart store and maps each
 * item to a `CartItem` component. Between each item (but NOT after the last),
 * a thin semi-transparent white separator line is rendered.
 *
 * Figma spec: Node 1:240 — Cart Items container (390×356 area).
 * Separator lines: 0.5px height, rgba(255,255,255,0.5), with 20px horizontal
 * margin matching the page's space-page-x token.
 *
 * This component uses `useCartStore` via selector pattern to read `items`,
 * and passes `updateQuantity` / `removeFromCart` actions as callbacks to
 * each `CartItem` component's quantity stepper controls.
 *
 * @returns The rendered cart item list with separators, or an empty
 *   container when no items are in the cart.
 */
export default function CartItemList() {
  /* ─── Store Selectors ─── */
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  /*
   * Guard: removeFromCart is accessed here per schema contract even though
   * the current CartItem UI does not expose a "remove" button. It remains
   * available for future integration (e.g., swipe-to-delete or a remove
   * icon) without requiring changes to this container component.
   */
  void removeFromCart;

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <React.Fragment key={item.product.id}>
          {/* Individual cart item row */}
          <CartItem
            item={item}
            onIncrement={() => updateQuantity(item.product.id, 1)}
            onDecrement={() => updateQuantity(item.product.id, -1)}
          />

          {/* Separator between items — NOT rendered after the last item */}
          {index < items.length - 1 && (
            <div
              className="mx-5"
              style={{
                height: '0.5px',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
