/**
 * Site Footer Component — Area Marketing Landing Page
 *
 * Renders the page footer with the Area brand logo, a horizontal row of
 * navigation links, and copyright text. Uses a dark olive background
 * (`--color-area-olive-dark`) with light text for strong visual contrast
 * against the rest of the page.
 *
 * Layout is responsive using mobile-first CSS:
 * - Mobile (< 800px): Vertically stacked — logo, links, then copyright,
 *   all center-aligned
 * - Tablet (800px+): Horizontal single-row with logo left, links center,
 *   copyright right
 * - Desktop (1280px+): Wider horizontal layout with more generous spacing
 *
 * This is a **server component** — no `'use client'` directive is needed
 * because the footer contains no interactive state or event handlers.
 *
 * @see AAP §0.5.1 Group 4 — Footer specification
 * @see AAP §0.5.3 Color Palette — `--color-area-olive-dark` for footer bg
 * @see AAP §0.5.3 Responsive Layout — Footer breakpoint behavior
 * @see AAP §0.7.1 Design Fidelity — Theme token–only colors
 * @see AAP §0.7.3 Code Quality — Semantic HTML, content from constants
 *
 * @module components/layout/Footer
 */

import Link from 'next/link';
import { Logo } from '@/components/ui';
import { SITE_CONTENT } from '@/lib/constants';
import type { NavLink } from '@/types';

/**
 * Area site footer with brand logo, navigation links, and copyright notice.
 *
 * All textual content is sourced from `SITE_CONTENT.footer` to maintain
 * content-presentation separation (AAP §0.7.3). The footer is rendered
 * inside a semantic `<footer>` landmark with a nested `<nav>` for the
 * navigation links, satisfying WCAG landmark and semantic HTML requirements.
 *
 * @example
 * ```tsx
 * // Used as the last child in the page composition
 * <main>…</main>
 * <Footer />
 * ```
 */
export function Footer() {
  const { links, copyright } = SITE_CONTENT.footer;

  return (
    <footer className="w-full bg-area-olive-dark">
      {/* Inner container — max-width for content readability, centered */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        {/*
          Responsive layout wrapper:
          - Mobile: vertical stack, center-aligned
          - Tablet+: horizontal row with space-between
        */}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:gap-4 md:text-start">
          {/* ----- Logo (left on tablet+) ----- */}
          <Logo size="sm" className="brightness-0 invert" />

          {/* ----- Navigation links (center on tablet+) ----- */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-6 lg:gap-x-8"
          >
            {links.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded text-sm text-area-cream/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-area-olive-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ----- Copyright text (right on tablet+) ----- */}
          <p className="text-xs text-area-cream/70">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
