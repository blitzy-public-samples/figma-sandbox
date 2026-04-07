/**
 * Home Page — Area Marketing Landing Page
 *
 * Main entry point for the Area marketing landing page built with the Next.js
 * App Router. Composes all 12 visual sections in their correct top-to-bottom
 * order as defined by the Figma design specification.
 *
 * This is a **server component** — it performs no client-side interactivity and
 * simply composes child components. Each child section handles its own
 * responsive layout, state, and styling. The page is responsible only for
 * structural composition and the inline full-width aerial landscape image
 * placed between MapSuccessSection and ConnectSection.
 *
 * Section order (AAP §0.6.1):
 *  1. Navbar          — Top navigation bar (outside <main>)
 *  2. HeroSection     — "Browse everything." hero banner
 *  3. TrustedBySection — Partner logo bar
 *  4. BenefitsSection  — "We've cracked the code." with 4 feature cards
 *  5. PhotoGallery     — Multi-image landscape gallery
 *  6. BigPictureSection — "See the Big Picture" with 4 numbered steps
 *  7. WhyChooseSection  — "Why Choose Area?" with comparison table
 *  8. TestimonialSection — Customer testimonial quote
 *  9. MapSuccessSection  — "Map Your Success" with 3 steps
 * 10. Full-width aerial landscape image (inline, not a separate component)
 * 11. ConnectSection    — "Connect with us" CTA
 * 12. Footer           — Links and copyright (outside <main>)
 *
 * @see AAP §0.5.1 Group 8 — Home Page Assembly
 * @see AAP §0.4.2 — Component Composition Chain
 * @see AAP §0.7.3 — Code Quality (semantic HTML, component composition)
 *
 * @module app/page
 */

import Image from 'next/image'

import {
  HeroSection,
  TrustedBySection,
  BenefitsSection,
  PhotoGallery,
  BigPictureSection,
  WhyChooseSection,
  TestimonialSection,
  MapSuccessSection,
  ConnectSection,
} from '@/components/sections'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

/**
 * Home page component — default export required by Next.js App Router.
 *
 * Renders the complete Area marketing landing page by composing all section
 * components in their visual order. Navbar and Footer are placed outside the
 * `<main>` landmark to maintain correct ARIA landmark structure:
 * `<nav>` → `<main>` → `<footer>`.
 *
 * The full-width aerial landscape image between MapSuccessSection and
 * ConnectSection is rendered inline using the Next.js `<Image>` component
 * with responsive height classes and `object-cover` for aspect-ratio
 * preservation.
 *
 * @returns The complete landing page markup
 */
export default function Home() {
  return (
    <>
      {/* ----------------------------------------------------------------
          Navigation — <nav> landmark (outside <main>)
          ---------------------------------------------------------------- */}
      <Navbar />

      {/* ----------------------------------------------------------------
          Primary Content — <main> landmark wrapping all page sections
          ---------------------------------------------------------------- */}
      <main>
        {/* Hero — "Browse everything." headline with dashboard mockup */}
        <HeroSection />

        {/* Partner logos — "Trusted by:" horizontal logo bar */}
        <TrustedBySection />

        {/* Benefits — "We've cracked the code." with 4 feature cards */}
        <BenefitsSection />

        {/* Gallery — Full-width and multi-image landscape photographs */}
        <PhotoGallery />

        {/* Big Picture — "See the Big Picture" with 4 numbered steps */}
        <BigPictureSection />

        {/* Comparison — "Why Choose Area?" with competitor feature table */}
        <WhyChooseSection />

        {/* Testimonial — Customer quote with attribution */}
        <TestimonialSection />

        {/* Success Steps — "Map Your Success" with 3 numbered steps */}
        <MapSuccessSection />

        {/* Full-width aerial landscape photograph
            Positioned between MapSuccessSection and ConnectSection per
            the Figma design layout. Responsive height:
            - Mobile:  h-64  (256px)
            - Tablet:  h-80  (320px)
            - Desktop: h-96  (384px) */}
        <section aria-label="Landscape" className="w-full">
          <Image
            src="/images/aerial-landscape.webp"
            alt="Aerial view of a beautiful landscape representing Area's comprehensive data coverage"
            width={1920}
            height={600}
            className="h-64 w-full object-cover md:h-80 lg:h-96"
          />
        </section>

        {/* CTA — "Connect with us" call-to-action section */}
        <ConnectSection />
      </main>

      {/* ----------------------------------------------------------------
          Footer — <footer> landmark (outside <main>)
          ---------------------------------------------------------------- */}
      <Footer />
    </>
  )
}
