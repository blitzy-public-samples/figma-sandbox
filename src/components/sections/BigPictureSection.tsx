/**
 * BigPictureSection — "See the Big Picture" Landing Page Section
 *
 * Renders the data-insight section of the Area marketing landing page,
 * featuring:
 *   - A "Understand the Data" section label
 *   - "See the Big Picture" display heading
 *   - Descriptive paragraph
 *   - Four numbered {@link StepCard} components arranged in a responsive
 *     grid (1-col mobile → 2-col tablet → 4-col desktop)
 *   - "Discover More" primary CTA button with trailing arrow icon
 *   - 3D product visualization image rendered via Next.js Image
 *
 * The `id="specifications"` attribute provides anchor navigation from
 * the Navbar's "Specifications" link (`#specifications`).
 *
 * All textual content is consumed from {@link SITE_CONTENT.bigPicture}
 * in `src/lib/constants.ts` — no hardcoded strings in this file
 * (AAP §0.7.3 content separation).
 *
 * Responsive breakpoints (AAP §0.7.2):
 *   - Mobile (default, <800px): stacked single-column layout
 *   - Tablet (md: ≥800px):      2-column step grid, larger heading
 *   - Desktop (lg: ≥1280px):    4-column horizontal step row
 *
 * @see src/lib/constants.ts — Content data source
 * @see src/components/ui/StepCard.tsx — Numbered step card component
 * @see src/components/ui/SectionLabel.tsx — Section label component
 * @see src/components/ui/Button.tsx — CTA button component
 * @module components/sections/BigPictureSection
 */

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { SITE_CONTENT } from '@/lib/constants';
import { SectionLabel, StepCard, Button } from '@/components/ui';

/**
 * Renders the "See the Big Picture" section with numbered insight steps,
 * a call-to-action button, and a 3D product visualization image.
 *
 * This is a server component — no client-side state or effects are needed.
 * Content is read from the centralized constants module at render time.
 *
 * @returns The fully composed "See the Big Picture" section element
 */
export function BigPictureSection() {
  const { label, heading, description, steps, ctaText } =
    SITE_CONTENT.bigPicture;

  return (
    <section
      id="specifications"
      aria-label={heading}
      className="bg-area-cream py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ----------------------------------------------------------------
            Section Header — Label, Heading, Description
            ---------------------------------------------------------------- */}
        <div>
          <SectionLabel text={label} />

          <h2 className="mt-3 font-serif text-3xl font-bold text-area-black md:text-4xl lg:text-5xl">
            {heading}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-area-gray">
            {description}
          </p>
        </div>

        {/* ----------------------------------------------------------------
            Step Cards Grid — Responsive columns per breakpoint:
              Mobile:  1 column  (grid-cols-1)
              Tablet:  2 columns (md:grid-cols-2)
              Desktop: 4 columns (lg:grid-cols-4)
            ---------------------------------------------------------------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        {/* ----------------------------------------------------------------
            CTA Button — "Discover More" with trailing ArrowRight icon
            ---------------------------------------------------------------- */}
        <div className="mt-8">
          <Button
            variant="primary"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {ctaText}
          </Button>
        </div>

        {/* ----------------------------------------------------------------
            3D Product Visualization Image
            Centered with responsive max-width sizing.
            Uses Next.js Image for optimized loading and CLS prevention.
            ---------------------------------------------------------------- */}
        <div className="mt-10 flex justify-center lg:mt-12">
          <Image
            src="/images/3d-product.webp"
            alt="Area 3D product visualization showing data analytics capabilities"
            width={500}
            height={400}
            className="h-auto w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
