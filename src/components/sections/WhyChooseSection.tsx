/**
 * WhyChooseSection — "Why Choose Area?" Comparison Section
 *
 * Renders the competitive comparison section of the Area landing page,
 * featuring a "More" section label, "Why Choose Area?" heading, descriptive
 * text, a "Discover More" CTA button, and a responsive feature comparison
 * table (Area vs WebSurge vs HyperView) with check/cross marks.
 *
 * Content is sourced entirely from {@link SITE_CONTENT.whyChoose} — no
 * hardcoded strings appear in this component per AAP §0.7.3 content
 * separation rule.
 *
 * Responsive Behaviour
 * ────────────────────
 * • Mobile  (<800px)  — Stacked layout: label → heading → description →
 *                        CTA → horizontally scrollable comparison table
 * • Tablet  (≥800px)  — Same stacked layout with larger heading, full
 *                        table visible without horizontal scroll
 * • Desktop (≥1280px) — Generous spacing, comfortable table column widths
 *
 * @see src/lib/constants.ts — SITE_CONTENT.whyChoose data source
 * @see src/components/ui/SectionLabel.tsx — Section label component
 * @see src/components/ui/ComparisonTable.tsx — Comparison table component
 * @see src/components/ui/Button.tsx — CTA button component
 * @see src/types/index.ts — ComparisonFeature, ComparisonTableProps
 * @module components/sections/WhyChooseSection
 */

import { ArrowRight } from 'lucide-react';

import { SITE_CONTENT } from '@/lib/constants';
import { SectionLabel, ComparisonTable, Button } from '@/components/ui';

/**
 * "Why Choose Area?" landing page section.
 *
 * Composes the {@link SectionLabel}, {@link Button}, and
 * {@link ComparisonTable} UI primitives into a complete page section.
 * All text, feature data, and product lists are read from the centralized
 * `SITE_CONTENT.whyChoose` constant — the component itself contains only
 * structural markup and Tailwind utility classes for layout and styling.
 *
 * @returns A `<section>` element containing the header, CTA, and table
 */
export function WhyChooseSection() {
  /* Destructure for concise template access */
  const { label, heading, description, ctaText, features, products } =
    SITE_CONTENT.whyChoose;

  return (
    <section
      aria-label="Why Choose Area"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      {/* Inner max-width container with responsive horizontal padding */}
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* -----------------------------------------------------------
            Section Header: label, heading, description, and CTA
            ----------------------------------------------------------- */}
        <div className="max-w-2xl">
          {/* Small uppercase label — "More" */}
          <SectionLabel text={label} />

          {/* Section heading — "Why Choose Area?" */}
          <h2 className="mt-3 font-serif text-3xl font-bold text-area-black md:text-4xl">
            {heading}
          </h2>

          {/* Descriptive body text */}
          <p className="mt-4 text-base leading-relaxed text-area-gray">
            {description}
          </p>

          {/* CTA button — "Discover More" with trailing arrow icon */}
          <div className="mt-6">
            <Button
              variant="primary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {ctaText}
            </Button>
          </div>
        </div>

        {/* -----------------------------------------------------------
            Comparison Table
            The ComparisonTable component handles its own responsive
            scrolling behaviour (horizontally scrollable on mobile,
            full table on tablet/desktop).
            ----------------------------------------------------------- */}
        <div className="mt-10 lg:mt-12">
          <ComparisonTable features={features} products={products} />
        </div>
      </div>
    </section>
  );
}
