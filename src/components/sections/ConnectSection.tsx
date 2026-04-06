/**
 * ConnectSection — "Connect with us" Call-to-Action Section
 *
 * The final content section before the footer, serving as the primary
 * call-to-action for visitor conversion. Renders a centered heading,
 * descriptive body text, and a wide pill-shaped "Learn More" CTA button.
 *
 * - `id="contact"` enables anchor navigation from the navbar's "Contact Us" link
 * - All text content sourced from `SITE_CONTENT.connect` — no hardcoded strings
 * - CTA button uses the "CTA Wide" variant: wider padding than standard buttons
 * - Responsive across mobile (<800px), tablet (800–1279px), and desktop (≥1280px)
 *
 * @module components/sections/ConnectSection
 * @see AAP §0.5.1 Group 5 — Connect Section requirements
 * @see AAP §0.5.3 — Button Styles (CTA Wide)
 */

import { SITE_CONTENT } from '@/lib/constants'
import { Button } from '@/components/ui'

/**
 * "Connect with us" CTA section component.
 *
 * Renders a clean, centered layout with a prominent heading, supporting
 * description text, and a wide primary CTA button. The section has a white
 * background to create visual separation from surrounding sections.
 *
 * @example
 * ```tsx
 * <ConnectSection />
 * ```
 */
export function ConnectSection() {
  return (
    <section
      id="contact"
      aria-label="Connect with us"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      {/* Centered inner container with constrained width for focused reading */}
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        {/* Section heading — serif display font, responsive sizing */}
        <h2 className="font-serif text-3xl font-bold text-area-black md:text-4xl lg:text-5xl">
          {SITE_CONTENT.connect.heading}
        </h2>

        {/* Description body text — secondary color, relaxed line-height */}
        <p className="mt-4 text-base leading-relaxed text-area-gray md:text-lg">
          {SITE_CONTENT.connect.description}
        </p>

        {/* Wide CTA button — primary variant with extra-wide padding */}
        <div className="mt-8">
          <Button
            variant="primary"
            className="px-10 py-3 text-base md:px-12 md:py-4 md:text-lg"
          >
            {SITE_CONTENT.connect.ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
