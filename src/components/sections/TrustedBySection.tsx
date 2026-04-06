/**
 * TrustedBySection — Partner Logo Bar
 *
 * Displays a horizontal row of partner/client logos under a "Trusted by:"
 * label.  On narrow viewports the logos wrap to multiple lines; on tablet
 * and desktop they sit in a single centred row.
 *
 * All textual content and logo data are imported from the centralised
 * constants file so the component contains only layout and styling logic.
 *
 * @module components/sections/TrustedBySection
 * @see src/lib/constants.ts — SITE_CONTENT.trustedBy
 */

import Image from 'next/image';
import { SITE_CONTENT } from '@/lib/constants';

/**
 * Renders the "Trusted by:" partner logo bar section.
 *
 * - Semantic `<section>` with `aria-label` for assistive technology.
 * - Responsive flex layout: wraps on mobile, single row from tablet up.
 * - Logos rendered via Next.js `Image` for automatic optimisation and
 *   CLS prevention (explicit width/height).
 * - Grayscale + reduced-opacity treatment keeps visual focus on primary
 *   page content while revealing full logos on hover.
 */
export function TrustedBySection() {
  const { label, logos } = SITE_CONTENT.trustedBy;

  return (
    <section
      aria-label="Trusted by"
      className="bg-white py-10 md:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ----------------------------------------------------------------
            "Trusted by:" label — centred, secondary-weight, muted colour
            ---------------------------------------------------------------- */}
        <p className="mb-6 text-center text-sm font-medium text-area-gray md:mb-8">
          {label}
        </p>

        {/* ----------------------------------------------------------------
            Logo row — flex-wrap on mobile, single row on wider screens
            ---------------------------------------------------------------- */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex-shrink-0 opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto md:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
