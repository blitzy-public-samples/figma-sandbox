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
 * (upward + downward) and a gradient stroke via the ::before pseudo-element
 * technique (gradient-stroke-button utility, since CSS border-image does
 * not work with border-radius).
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

  /* Main button — gradient fill with ::before pseudo-element gradient stroke.
     Design system classes applied:
     - bg-gradient-primary: blue-to-purple gradient fill
     - shadow-button: neumorphic dual-direction shadow
     - gradient-stroke-button: ::before pseudo-element 1px gradient stroke */
  return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Go back"
        className="relative w-[44px] h-[44px] shrink-0 rounded-[10px] flex items-center justify-center cursor-pointer border-none bg-gradient-primary shadow-button gradient-stroke-button outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
  );
}
