/**
 * HeroSection — Full-width hero banner for the Area marketing landing page.
 *
 * Renders the primary above-the-fold content including:
 * - "Browse everything." display heading in large serif typography
 * - Descriptive subtext paragraph
 * - Stat callout badge ("78% Efficiency Improvements") with olive/sage treatment
 * - Dashboard mockup image via Next.js optimized Image component
 *
 * Layout:
 * - Mobile (default, <800px): Stacked vertically — heading → subtext → stat → image
 * - Tablet  (md: 800px+):    Side-by-side — text column (50%) + image column (50%)
 * - Desktop (lg: 1280px+):   Full side-by-side — text (5/12) + image (7/12)
 *
 * All text content is sourced from {@link SITE_CONTENT.hero} to maintain the
 * content-separation pattern required by AAP §0.7.3. No hardcoded strings.
 *
 * @module components/sections/HeroSection
 * @see src/lib/constants.ts — Content data source
 * @see src/app/globals.css — Design token definitions (colors, fonts, breakpoints)
 */

import Image from 'next/image';
import { SITE_CONTENT } from '@/lib/constants';

/**
 * Hero banner section — the first visual section after the Navbar.
 *
 * Displays the primary value proposition ("Browse everything."), supporting
 * description, a key statistic badge, and a dashboard mockup image. Uses
 * semantic HTML (`<section>`, `<h1>`) and accessible attributes.
 *
 * @returns The rendered hero section React element
 */
export function HeroSection() {
  const { headline, subtext, stat, statLabel } = SITE_CONTENT.hero;

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-area-cream"
    >
      {/* Inner container: max-width constrained with responsive padding */}
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-16 md:flex-row md:items-center md:gap-8 md:px-8 md:py-20 lg:gap-12 lg:py-24">
        {/* ----------------------------------------------------------------
            Text Content Column (Left on tablet/desktop)
            Mobile: full width, stacked above image
            Tablet: 50% width
            Desktop: 5/12 width (~42%)
        ---------------------------------------------------------------- */}
        <div className="mb-8 md:mb-0 md:w-1/2 lg:w-5/12">
          {/* Main page headline — only <h1> on the page */}
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-area-black md:text-5xl lg:text-6xl">
            {headline}
          </h1>

          {/* Descriptive subtext — "Body" typography style */}
          <p className="mt-4 text-base leading-relaxed text-area-gray md:mt-6 md:text-lg">
            {subtext}
          </p>

          {/* Stat callout badge — olive/sage background treatment */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-area-sage-light/30 px-5 py-3 md:mt-8">
            <span className="text-3xl font-bold text-area-olive">
              {stat}
            </span>
            <span className="text-sm font-medium text-area-olive-dark">
              {statLabel}
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------------------
            Dashboard Image Column (Right on tablet/desktop)
            Mobile: full width, stacked below text
            Tablet: 50% width
            Desktop: 7/12 width (~58%)
        ---------------------------------------------------------------- */}
        <div className="md:w-1/2 lg:w-7/12">
          <Image
            src="/images/hero-dashboard.webp"
            alt="Area analytics dashboard showing data insights and visualizations"
            width={800}
            height={500}
            className="h-auto w-full rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
