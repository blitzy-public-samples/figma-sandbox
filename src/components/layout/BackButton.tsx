'use client';

import { useRouter } from 'next/navigation';

/**
 * BackButtonProps — Props interface for the BackButton component.
 *
 * @property onClick - Optional click handler; when omitted, defaults to router.back()
 */
interface BackButtonProps {
  onClick?: () => void;
}

/**
 * BackButton — A 44×44px gradient back navigation button with a white
 * left-pointing chevron icon.
 *
 * Design Tokens (from AAP Token Manifest):
 * - gradient-primary-button: linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)
 * - stroke-button: linear-gradient(135deg, #FFF 0%, #000 100%) 1px
 * - shadow-button: 0px 20px 30px rgba(16,20,28,1), 0px -20px 30px rgba(43,52,69,0.5)
 * - radius-button: 10px
 * - color-text-white: #FFFFFF
 *
 * Used by PageHeader in "back mode" on the Detail and Shopping Bag screens.
 * Implements the neumorphic raised button effect with dual box-shadow
 * (upward + downward) and a gradient stroke via a pseudo-element wrapper
 * technique (CSS border-image does not work with border-radius).
 */
export default function BackButton({ onClick }: BackButtonProps) {
  const router = useRouter();

  /** Navigate back using the provided handler or default router.back() */
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      className="relative w-[44px] h-[44px] shrink-0 rounded-[10px]"
      style={{
        boxShadow:
          '0px 20px 30px rgba(16, 20, 28, 1), 0px -20px 30px rgba(43, 52, 69, 0.5)',
      }}
    >
      {/* Gradient stroke layer — 1px gradient border effect using absolute
          positioning. Extends 1px beyond the button on all sides (inset: -1px)
          with border-radius 11px (10px button radius + 1px stroke width).
          Sits behind the button (z-0) to create the gradient border appearance.
          BLITZY [LAYOUT]: Gradient stroke via wrapper div — CSS border-image
          is incompatible with border-radius. */}
      <div
        className="absolute inset-[-1px] rounded-[11px]"
        style={{
          background: 'linear-gradient(135deg, #FFF 0%, #000 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main button — blue-to-purple gradient fill, above stroke layer */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Go back"
        className="relative z-10 w-full h-full rounded-[10px] flex items-center justify-center cursor-pointer border-none outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{
          background: 'linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)',
        }}
      >
        {/* White left-pointing chevron icon — inline SVG matching the
            Figma-exported chevron-left.svg (node 4:1395).
            Uses currentColor pattern with explicit white stroke.
            Sized at 20×20px, proportional to the 44×44 button. */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polyline
            points="15 6 9 12 15 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
