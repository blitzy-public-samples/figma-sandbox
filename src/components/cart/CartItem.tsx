import React from 'react';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/product';
import QuantityStepper from './QuantityStepper';

/**
 * Props interface for the CartItem component.
 *
 * @property item - Cart item containing full Product data and quantity
 * @property onIncrement - Callback fired when quantity is increased via the stepper
 * @property onDecrement - Callback fired when quantity is decreased via the stepper
 */
export interface CartItemProps {
  /** The cart item data including product details and current quantity. */
  item: CartItemType;
  /** Callback invoked when the user taps the increment (+) button on the quantity stepper. */
  onIncrement: () => void;
  /** Callback invoked when the user taps the decrement (−) button on the quantity stepper. */
  onDecrement: () => void;
}

/**
 * Formats a numeric price for display following Figma specifications.
 *
 * - Whole numbers display without decimals: 120 → "120"
 * - Fractional values display with 2 decimals: 1999.99 → "1,999.99"
 * - Commas are inserted as thousands separators
 *
 * @param price - Numeric price value from the Product interface
 * @returns Formatted price string without the "$" prefix
 */
function formatPrice(price: number): string {
  const isWholeNumber = price % 1 === 0;
  return price.toLocaleString('en-US', {
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: isWholeNumber ? 0 : 2,
  });
}

/**
 * CartItem — Individual cart item row component.
 *
 * Renders a horizontal flex row containing:
 * - Left: Product image (100×90px, 10px border-radius, dark gradient background)
 * - Center: Text column with product name (Poppins 700 15px rgba(255,255,255,0.87))
 *   and price (Poppins 400 13px #3C9EEA)
 * - Right: QuantityStepper control for quantity adjustment
 *
 * Figma spec: Within Cart Items container (node 1:240), each row uses
 * horizontal flex layout with items-center alignment and 20px horizontal
 * padding matching the page's space-page-x token.
 *
 * This component does NOT use the 'use client' directive — it is rendered
 * within CartItemList which handles the client boundary.
 */
const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center px-5 py-4">
      {/* Product Image — 100×90px container with dark gradient fill and 10px radius */}
      <div className="relative w-[100px] h-[90px] rounded-[10px] overflow-hidden bg-gradient-to-br from-[#353F54] to-[#222834] flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={100}
          height={90}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Text Column — product name and price stacked vertically */}
      <div className="flex-1 flex flex-col ml-3">
        {/* Product Name: Poppins 700, 15px, color-text-semi (rgba(255,255,255,0.87))
            Uses cartName (if defined) for screen-specific Figma text fidelity,
            falling back to the standard name. See AAP §0.5.1 Shopping Bag:
            "PEUGEOT- LR01" (no space before hyphen) vs Detail "PEUGEOT - LR01". */}
        <span
          className="font-bold text-[15px] leading-[1.5em] tracking-[-0.02em] text-text-semi"
        >
          {item.product.cartName ?? item.product.name}
        </span>

        {/* Product Price: Poppins 400, 13px, #3C9EEA with "$ " prefix */}
        <span className="font-normal text-[13px] leading-[1.5em] text-[#3C9EEA]">
          $ {formatPrice(item.product.price)}
        </span>
      </div>

      {/* Quantity Stepper — positioned at the right end of the row */}
      <QuantityStepper
        value={item.quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
};

export default CartItem;
