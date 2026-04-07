'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

import { Button } from '@/components/ui'
import { SITE_CONTENT } from '@/lib/constants'
import type { NavLink } from '@/types'

// ---------------------------------------------------------------------------
// Props Interface
// ---------------------------------------------------------------------------

/**
 * Props for the MobileMenu component.
 *
 * Controlled by the parent Navbar component which manages the open/closed
 * state and provides the close callback.
 */
interface MobileMenuProps {
  /** Whether the mobile drawer menu is currently visible */
  isOpen: boolean
  /** Callback to close the menu (sets parent state to false) */
  onClose: () => void
}

// ---------------------------------------------------------------------------
// MobileMenu Component
// ---------------------------------------------------------------------------

/**
 * Full-screen slide-out drawer overlay for mobile navigation.
 *
 * Features a semi-transparent backdrop with opacity animation, a slide-in
 * panel from the right edge containing navigation links and a "Learn More"
 * CTA button, and a close button using the lucide-react X icon.
 *
 * The component is always mounted in the DOM to enable smooth CSS transitions
 * for enter/exit animations. When closed, the overlay is invisible
 * (`opacity-0`) and non-interactive (`pointer-events-none`).
 *
 * Accessibility features:
 * - `role="dialog"` and `aria-modal="true"` communicate modal semantics
 * - `aria-label` on close button and `<nav>` element
 * - Escape key dismisses the menu
 * - Body scroll is locked when the menu is open
 * - Backdrop click provides an alternative close method
 *
 * @see AAP §0.5.1 Group 4 — Layout Components
 * @see AAP §0.5.3 Icon Mapping — Close/X → X from lucide-react
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { navLinks } = SITE_CONTENT

  // -----------------------------------------------------------------------
  // Side Effect — Body scroll lock
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // -----------------------------------------------------------------------
  // Side Effect — Escape key dismissal
  // -----------------------------------------------------------------------
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
    >
      {/* Backdrop — semi-transparent overlay; click to close */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel — enters from the right edge */}
      <div
        className={`absolute top-0 end-0 h-full w-4/5 max-w-sm bg-area-cream p-6 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button — top right corner of the panel */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-full border border-area-olive hover:bg-area-sage-light/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:ring-offset-2"
          aria-label="Close navigation menu"
          type="button"
        >
          <X className="w-6 h-6 text-area-black" aria-hidden="true" />
        </button>

        {/* Navigation links — vertical list with touch-friendly sizing */}
        <nav aria-label="Mobile navigation" className="mt-12 flex flex-col gap-4">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-medium text-area-black hover:text-area-olive transition-colors duration-200 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* "Learn More" CTA — full-width primary button */}
        <div className="mt-8">
          <Button
            variant="primary"
            href="#contact"
            onClick={onClose}
            className="w-full"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}
