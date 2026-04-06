/**
 * MapSuccessSection — "Map Your Success" Three-Step Process Section
 *
 * Renders a full-width section with a serif heading, a primary "Discover More"
 * CTA button with a trailing arrow icon, and three numbered StepCard components
 * laid out in a responsive grid.
 *
 * Steps displayed:
 *   1. Get Started
 *   2. Customize and Configure
 *   3. Grow Your Business
 *
 * The section uses `id="how-to"` for anchor-based navigation from the
 * top Navbar "How-to" link.
 *
 * Layout:
 *   - Mobile  (<800px): Heading, CTA, and steps stacked vertically in a single column
 *   - Tablet  (≥800px): Heading + CTA stacked, steps in a 3-column grid
 *   - Desktop (≥1280px): Same 3-column grid with increased vertical padding
 *
 * All textual content is sourced from {@link SITE_CONTENT.mapSuccess} to
 * enforce content-separation per AAP §0.7.3.
 *
 * @module components/sections/MapSuccessSection
 * @see src/lib/constants.ts — SITE_CONTENT.mapSuccess data source
 * @see src/components/ui/StepCard.tsx — Numbered step card component
 * @see src/components/ui/Button.tsx — Pill-shaped CTA button component
 */

import { ArrowRight } from 'lucide-react';

import { SITE_CONTENT } from '@/lib/constants';
import { Button, StepCard } from '@/components/ui';

/**
 * "Map Your Success" landing-page section.
 *
 * No props are required — all content is derived from the centralised
 * {@link SITE_CONTENT} constant. Renders as a `<section>` landmark
 * with `aria-label` for assistive-technology identification.
 */
export function MapSuccessSection() {
  const { heading, ctaText, steps } = SITE_CONTENT.mapSuccess;

  return (
    <section
      id="how-to"
      aria-label="Map Your Success"
      className="bg-area-cream py-16 md:py-20 lg:py-24"
    >
      {/* Constrained inner container with responsive horizontal padding */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Section header: heading + CTA button                            */}
        {/* ---------------------------------------------------------------- */}
        <h2 className="font-serif text-3xl font-bold text-area-black md:text-4xl">
          {heading}
        </h2>

        <div className="mt-6">
          <Button
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {ctaText}
          </Button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Step cards: 1-col mobile → 3-col tablet/desktop                 */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
