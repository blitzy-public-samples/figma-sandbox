'use client';

import React from 'react';

/**
 * Props interface for the QuantityStepper component.
 *
 * @property value - Current quantity count displayed in the stepper
 * @property onIncrement - Callback fired when the "+" (plus) button is pressed
 * @property onDecrement - Callback fired when the "−" (minus) button is pressed
 */
export interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

/**
 * QuantityStepper — Neumorphic quantity increment/decrement control.
 *
 * Renders a compact 79×30px stepper with:
 * - Left: dark "−" decrement button (no gradient)
 * - Center: quantity count display (Poppins 600, 13px, white)
 * - Right: gradient "+" increment button (linear-gradient 142deg, #34C8E8 → #4E4AF2)
 *
 * The container uses an inset neumorphic shadow to create a recessed appearance,
 * with 8px border-radius and overflow-hidden for corner clipping.
 *
 * Figma spec: within Cart Item rows (node 1:240), 79×30px, radius 8px,
 * shadow-stepper-inset: inset 2px 2px 4px rgba(30,37,49,1),
 *                       inset -2px -2px 4px rgba(39,48,65,1)
 */
const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div
      className="flex items-center w-[79px] h-[30px] rounded-input overflow-hidden shadow-stepper-inset"
    >
      {/* Minus / Decrement Button — dark background, no gradient */}
      <button
        type="button"
        onClick={onDecrement}
        className="flex items-center justify-center flex-1 h-full text-white/60 transition-colors bg-transparent"
        aria-label="Decrease quantity"
      >
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="12" x2="18" y2="12" />
        </svg>
      </button>

      {/* Quantity Count Display */}
      <span
        className="text-white text-center select-none font-semibold text-[13px] leading-[1.5em] tracking-[-0.023em] min-w-[24px]"
      >
        {value}
      </span>

      {/* Plus / Increment Button — primary gradient fill */}
      <button
        type="button"
        onClick={onIncrement}
        className="flex items-center justify-center flex-1 h-full text-white transition-colors bg-gradient-primary"
        aria-label="Increase quantity"
      >
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="12" x2="18" y2="12" />
          <line x1="12" y1="6" x2="12" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default QuantityStepper;
