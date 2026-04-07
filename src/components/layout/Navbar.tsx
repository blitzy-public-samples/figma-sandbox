'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Logo, Button } from '@/components/ui'
import { MobileMenu } from './MobileMenu'
import { SITE_CONTENT } from '@/lib/constants'
import type { NavLink } from '@/types'

// ---------------------------------------------------------------------------
// Navbar Component
// ---------------------------------------------------------------------------

/**
 * Responsive top navigation bar for the Area marketing landing page.
 *
 * Adapts across three breakpoints defined in globals.css @theme:
 * - **Mobile** (default, <800px): Logo on the left, hamburger icon on the
 *   right. Desktop nav links and CTA button are hidden. Tapping the hamburger
 *   opens the full-screen MobileMenu drawer.
 * - **Tablet** (md: ≥800px): Logo on the left, condensed nav links in the
 *   center, and a primary "Learn More" CTA button on the right. Hamburger
 *   icon is hidden.
 * - **Desktop** (lg: ≥1280px): Full layout with generous spacing between
 *   nav links, increased horizontal padding, and a taller bar height.
 *
 * Uses `'use client'` for the interactive `useState` hamburger toggle.
 * All textual content is sourced from `SITE_CONTENT.navLinks` per AAP §0.7.3
 * (content separation). Colors reference Tailwind theme tokens exclusively —
 * no hardcoded hex values per AAP §0.7.1.
 *
 * @see src/components/layout/MobileMenu.tsx — Slide-out drawer controlled by this component
 * @see src/lib/constants.ts — navLinks data array
 * @see AAP §0.5.1 Group 4 — Layout Components specification
 * @see AAP §0.5.3 Responsive Layout — Breakpoint behavior table
 * @see AAP §0.5.3 Icon Mapping — Hamburger → Menu from lucide-react
 *
 * @example
 * ```tsx
 * // In src/app/page.tsx
 * import { Navbar } from '@/components/layout/Navbar'
 * <Navbar />
 * ```
 */
export function Navbar() {
  // -------------------------------------------------------------------------
  // State — Mobile menu open/close toggle
  // -------------------------------------------------------------------------
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  /** Extracts the navLinks array from centralized content data */
  const { navLinks } = SITE_CONTENT

  /** Toggles the mobile menu between open and closed states */
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  /** Closes the mobile menu — passed as onClose callback to MobileMenu */
  const closeMenu = () => setIsMenuOpen(false)

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <>
      <nav
        aria-label="Main navigation"
        className="sticky top-0 z-50 w-full bg-area-cream/95 backdrop-blur-sm"
      >
      {/* Inner container — max-width centered with responsive horizontal padding */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Flex row: Logo | Nav Links | CTA / Hamburger */}
        <div className="flex h-16 items-center justify-between md:h-18 lg:h-20">

          {/* ----------------------------------------------------------------
              Logo Section (Left) — Always visible across all breakpoints
              ---------------------------------------------------------------- */}
          <Logo />

          {/* ----------------------------------------------------------------
              Desktop / Tablet Navigation Links (Center)
              Hidden on mobile (<800px), flex row on tablet and desktop.
              Uses condensed gap-6 on tablet, expanded gap-8 on desktop.
              ---------------------------------------------------------------- */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-area-black transition-colors duration-200 hover:text-area-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ----------------------------------------------------------------
              Right Section — CTA button (tablet+) and hamburger (mobile)
              ---------------------------------------------------------------- */}
          <div className="flex items-center gap-2">
            {/* CTA Button — visible on tablet (md:) and desktop (lg:) */}
            <div className="hidden md:block">
              <Button variant="primary" href="#contact">
                Learn More
              </Button>
            </div>

            {/* Hamburger Toggle — visible only on mobile (<800px) */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              className="rounded-lg p-2 text-area-black transition-colors duration-200 hover:bg-area-sage-light/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:ring-offset-2 md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      </nav>

      {/* ------------------------------------------------------------------
          Mobile Menu Drawer — Full-screen slide-out overlay
          Rendered as a sibling OUTSIDE the <nav> element to avoid the CSS
          containing block created by backdrop-filter: blur() on the nav.
          This ensures position: fixed; inset: 0 resolves relative to the
          viewport rather than the 64px-tall nav bar.
          ------------------------------------------------------------------ */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
