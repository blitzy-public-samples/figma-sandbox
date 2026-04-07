/**
 * StepCard — Numbered Step Card Component
 *
 * A reusable, purely presentational component that renders a numbered
 * step card with a prominent circular badge, bold title, and descriptive
 * body text. Used in two distinct sections of the Area landing page:
 *
 * - **"See the Big Picture"** section — 4 steps:
 *   Spot Trends in Seconds, Get Everyone on the Same Page,
 *   Make Presentations Pop, Your Global Snapshot
 *
 * - **"Map Your Success"** section — 3 steps:
 *   Get Started, Customize and Configure, Grow Your Business
 *
 * The component is self-contained and layout-agnostic — the parent
 * section component controls whether steps are arranged in a horizontal
 * row (desktop) or stacked vertically (mobile).
 *
 * Design token usage (all from globals.css @theme):
 *   - Step badge: `bg-area-olive` background, white text, fully rounded
 *   - Title:     `text-area-black`, bold, "Key Point" typography style
 *   - Body:      `text-area-gray`, regular weight, "Body" typography style
 *
 * @example
 * ```tsx
 * <StepCard stepNumber={1} title="Get Started" description="Sign up and configure your dashboard in minutes." />
 * ```
 *
 * @see src/types/index.ts — StepCardData interface
 * @see src/components/sections/BigPictureSection.tsx — consumer (4 steps)
 * @see src/components/sections/MapSuccessSection.tsx — consumer (3 steps)
 * @module components/ui/StepCard
 */

import type { StepCardData } from '@/types';

/**
 * Renders a numbered step card with a circular badge, heading, and description.
 *
 * All content is received via props — no internal data or side effects.
 * The card adapts its padding across breakpoints while keeping the badge
 * size consistent for visual continuity.
 *
 * @param props - {@link StepCardData}
 * @returns A styled card `<div>` containing the step number badge, title, and description
 */
export function StepCard({ stepNumber, title, description }: StepCardData) {
  return (
    <div className="p-4 md:p-5 lg:p-6">
      {/* Circular step number badge — olive brand background with centered white text */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full bg-area-olive font-sans text-sm font-bold text-white mb-3"
        aria-hidden="true"
      >
        {stepNumber}
      </div>

      {/* Step title — semantic h3 using "Key Point" typography style */}
      <h3 className="font-sans text-lg font-bold text-area-black mb-2">
        <span className="sr-only">Step {stepNumber}: </span>
        {title}
      </h3>

      {/* Step description — "Body" typography style with relaxed line height */}
      <p className="font-sans text-sm leading-relaxed text-area-gray">
        {description}
      </p>
    </div>
  );
}
