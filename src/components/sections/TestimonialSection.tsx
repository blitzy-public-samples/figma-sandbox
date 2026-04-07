/**
 * TestimonialSection — Customer Testimonial Quote Block
 *
 * A visually prominent section showcasing a customer endorsement of the Area
 * platform. Uses a dark olive background with large serif italic typography
 * for the quote, and light-colored attribution text below.
 *
 * Design references:
 * - AAP §0.5.1 Group 5 — "Large testimonial quote block with customer quote
 *   text and attribution (name, title)"
 * - AAP §0.5.3 Typography Scale — Serif display font for quote text
 * - AAP §0.7.1 Design Fidelity — Colors from theme tokens
 * - AAP §0.7.2 Responsive Design — Mobile-first, breakpoints at 800px / 1280px
 *
 * @module components/sections/TestimonialSection
 */

import { SITE_CONTENT } from '@/lib/constants';

/**
 * Renders a full-width testimonial section with a customer quote and
 * author attribution on a dark olive background.
 *
 * Content is sourced from {@link SITE_CONTENT.testimonial} — no hardcoded
 * strings per AAP §0.7.3 content separation rule.
 *
 * Responsive behavior:
 * - Mobile (< 800px): `text-xl` quote, compact padding
 * - Tablet (800–1279px): `text-2xl` quote, increased padding
 * - Desktop (1280px+): `text-3xl` quote, generous spacing
 */
export function TestimonialSection() {
  const { quote, authorName, authorTitle } = SITE_CONTENT.testimonial;

  return (
    <section
      aria-label="Testimonial"
      className="bg-area-olive-dark py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        {/* Decorative opening quotation mark — purely visual, hidden from
            assistive technology */}
        <div
          className="mb-4 font-serif text-6xl leading-none text-area-sage opacity-50 md:text-7xl"
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Semantic blockquote with the testimonial text and attribution */}
        <blockquote>
          <p className="font-serif text-xl italic leading-relaxed text-white md:text-2xl lg:text-3xl">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Attribution footer inside blockquote for semantic correctness */}
          <footer className="mt-6 md:mt-8">
            <cite className="not-italic">
              <span className="block text-base font-bold text-white">
                {authorName}
              </span>
              <span className="mt-1 block text-sm text-area-sage-light">
                {authorTitle}
              </span>
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
