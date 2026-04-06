/**
 * BenefitsSection — Benefits Feature Grid Section
 *
 * Displays the "Benefits" section of the Area marketing landing page with
 * a SectionLabel, "We've cracked the code." heading, body description text,
 * and a responsive grid of 4 FeatureCard components:
 *   1. Amplify Insights (TrendingUp icon)
 *   2. Control Your Global Presence (Building icon)
 *   3. Remove Language Barriers (LayoutGrid icon)
 *   4. Visualize Growth (Eye icon)
 *
 * Layout strategy:
 *   - Mobile (default, <800px): Stacked — label → heading → description → single column cards
 *   - Tablet (md: 800px+): Stacked — label → heading → description → 2-column card grid
 *   - Desktop (lg: 1280px+): Side-by-side — text column (left ~42%) + 2×2 card grid (right ~58%)
 *
 * The section has `id="benefits"` for anchor navigation from the navbar.
 *
 * @see src/lib/constants.ts — SITE_CONTENT.benefits for all text content
 * @see src/components/ui/FeatureCard.tsx — Individual card component
 * @see src/components/ui/SectionLabel.tsx — Section label component
 * @module components/sections/BenefitsSection
 */

import { SITE_CONTENT } from '@/lib/constants';
import { SectionLabel, FeatureCard } from '@/components/ui';

/**
 * Renders the Benefits section with a heading, description, and a
 * responsive grid of feature cards.
 *
 * Content is sourced entirely from SITE_CONTENT.benefits — no hardcoded
 * strings. Composes SectionLabel and FeatureCard UI components to
 * maintain the component composition pattern.
 *
 * @returns The complete Benefits section element
 */
export function BenefitsSection() {
  const { label, heading, description, features } = SITE_CONTENT.benefits;

  return (
    <section
      id="benefits"
      aria-label="Benefits"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/*
          Desktop (lg:): Two-column layout — text left, cards right
          Mobile/Tablet: Stacked — text above, cards below
        */}
        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* ----------------------------------------------------------------
              Text Column — SectionLabel, Heading, and Description
              On desktop, this sits to the left and optionally sticks while
              the user scrolls through the card grid.
          ---------------------------------------------------------------- */}
          <div className="mb-10 lg:mb-0 lg:w-5/12 lg:sticky lg:top-24">
            <SectionLabel text={label} />

            <h2 className="mt-3 font-serif text-3xl font-bold text-area-black md:text-4xl">
              {heading}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-area-gray">
              {description}
            </p>
          </div>

          {/* ----------------------------------------------------------------
              Cards Column — 2×2 grid of FeatureCard components
              Mobile: single column (grid-cols-1)
              Tablet+: two columns (md:grid-cols-2)
          ---------------------------------------------------------------- */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
