/**
 * Unit Tests for Navbar Component
 *
 * Comprehensive test suite for the responsive navigation bar component.
 * Validates rendering, mobile hamburger toggle behaviour, navigation link
 * content driven by SITE_CONTENT.navLinks, responsive Tailwind CSS
 * visibility classes (hidden / md:flex / md:hidden), and accessibility
 * attributes (aria-label, aria-expanded).
 *
 * @module __tests__/components/Navbar.test
 * @see src/components/layout/Navbar.tsx — Component under test
 * @see src/lib/constants.ts — Content data source
 * @see AAP §0.5.1 Group 4 — Layout Components specification
 * @see AAP §0.7.3 — Semantic HTML & accessibility requirements
 */

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Navbar } from '@/components/layout/Navbar'
import { SITE_CONTENT } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Mocks — Isolate Navbar from the Next.js runtime and child components
// ---------------------------------------------------------------------------

/**
 * Mock next/link to render as a plain anchor element.
 *
 * The real Link component requires a Next.js router context that does not
 * exist inside the Jest/jsdom environment.  We replace it with a minimal
 * <a> element that forwards href, className, and other HTML attributes so
 * that attribute-level assertions work as expected.
 *
 * Using React.createElement instead of JSX inside the jest.mock factory
 * avoids issues with the react-jsx automatic runtime import being hoisted
 * after jest.mock by ts-jest.
 */
jest.mock('next/link', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode
      href: string
      [key: string]: unknown
    }) => React.createElement('a', { href, ...props }, children),
  }
})

/**
 * Mock next/image to render as a plain <img> element.
 *
 * The Logo component used inside Navbar relies on next/image for the brand
 * logo SVG. Without the Next.js image optimisation server the real Image
 * component throws.  The mock preserves src, alt, width, and height so
 * queries like getByAltText('Area') resolve correctly.
 */
jest.mock('next/image', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      width,
      height,
      ...props
    }: {
      src: string
      alt: string
      width: number
      height: number
      [key: string]: unknown
    }) => React.createElement('img', { src, alt, width, height, ...props }),
  }
})

/**
 * Mock the MobileMenu child component to isolate Navbar state testing.
 *
 * When `isOpen` is true the mock renders a minimal <div> with a
 * data-testid of "mobile-menu" and a Close button wired to onClose.
 * When `isOpen` is false nothing is rendered.  This allows Navbar tests
 * to verify toggle state round-trips without exercising the full
 * MobileMenu implementation.
 */
jest.mock('@/components/layout/MobileMenu', () => {
  const React = require('react')
  return {
    MobileMenu: ({
      isOpen,
      onClose,
    }: {
      isOpen: boolean
      onClose: () => void
    }) =>
      isOpen
        ? React.createElement(
            'div',
            { 'data-testid': 'mobile-menu', role: 'dialog' },
            React.createElement('button', { onClick: onClose }, 'Close'),
          )
        : null,
  }
})

// ---------------------------------------------------------------------------
// Test Suite
// ---------------------------------------------------------------------------

describe('Navbar Component', () => {
  // -----------------------------------------------------------------------
  // 1. Basic Rendering
  // -----------------------------------------------------------------------
  describe('Basic Rendering', () => {
    it('renders the navigation element with the Area logo', () => {
      render(<Navbar />)

      // The <nav> should be accessible by its aria-label
      const nav = screen.getByRole('navigation', {
        name: /main navigation/i,
      })
      expect(nav).toBeInTheDocument()

      // Logo component renders an <img> with alt="Area" via mocked next/image
      expect(screen.getByAltText('Area')).toBeInTheDocument()
    })

    it('renders all navigation links from SITE_CONTENT', () => {
      render(<Navbar />)

      SITE_CONTENT.navLinks.forEach((link) => {
        expect(screen.getByText(link.label)).toBeInTheDocument()
      })
    })

    it('renders the CTA button with "Learn More" text', () => {
      render(<Navbar />)

      // CTA is a Button with href — rendered as an anchor via mocked Link
      expect(screen.getByText('Learn More')).toBeInTheDocument()
    })
  })

  // -----------------------------------------------------------------------
  // 2. Mobile Hamburger Menu Toggle
  // -----------------------------------------------------------------------
  describe('Mobile Menu Toggle', () => {
    it('renders the hamburger toggle button', () => {
      render(<Navbar />)

      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })
      expect(hamburger).toBeInTheDocument()
    })

    it('mobile menu is initially closed', () => {
      render(<Navbar />)

      // Mocked MobileMenu should not render when isOpen is false
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()

      // Hamburger button should signal the collapsed state
      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })
      expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    })

    it('clicking the hamburger opens the mobile menu', () => {
      render(<Navbar />)

      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })
      fireEvent.click(hamburger)

      // Mocked MobileMenu should now render
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

      // Hamburger should signal the expanded state
      expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    })

    it('mobile menu can be closed via the close button', () => {
      render(<Navbar />)

      // Open the menu first
      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })
      fireEvent.click(hamburger)
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

      // Click the Close button inside the mocked MobileMenu
      fireEvent.click(screen.getByText('Close'))

      // Menu should be dismissed
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()

      // Hamburger should revert to the collapsed state
      expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  // -----------------------------------------------------------------------
  // 3. Navigation Links Content
  // -----------------------------------------------------------------------
  describe('Navigation Links', () => {
    it('each navigation link matches SITE_CONTENT.navLinks label and href', () => {
      render(<Navbar />)

      SITE_CONTENT.navLinks.forEach((link) => {
        const element = screen.getByText(link.label)
        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('href', link.href)
      })
    })

    it('renders exactly the correct number of desktop navigation links', () => {
      render(<Navbar />)

      // Map each expected nav link to its rendered element
      const renderedLinks = SITE_CONTENT.navLinks.map((link) =>
        screen.getByText(link.label),
      )
      expect(renderedLinks).toHaveLength(SITE_CONTENT.navLinks.length)
    })
  })

  // -----------------------------------------------------------------------
  // 4. Responsive Visibility (Tailwind CSS class assertions)
  // -----------------------------------------------------------------------
  describe('Responsive Visibility', () => {
    it('desktop nav links container has hidden and md:flex classes', () => {
      render(<Navbar />)

      // The first nav link's parent <div> is the desktop links container
      const firstLink = screen.getByText(SITE_CONTENT.navLinks[0].label)
      const navLinksContainer = firstLink.parentElement as HTMLElement

      // hidden = invisible on mobile (<800px)
      expect(navLinksContainer).toHaveClass('hidden')

      // md:flex = flex row on tablet (≥800px) and desktop (≥1280px)
      expect(navLinksContainer).toHaveClass('md:flex')
    })

    it('hamburger button has md:hidden class for mobile-only visibility', () => {
      render(<Navbar />)

      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })

      // md:hidden = hidden on tablet and desktop, visible on mobile only
      expect(hamburger).toHaveClass('md:hidden')
    })
  })

  // -----------------------------------------------------------------------
  // 5. Accessibility
  // -----------------------------------------------------------------------
  describe('Accessibility', () => {
    it('nav element has "Main navigation" aria-label', () => {
      render(<Navbar />)

      const nav = screen.getByRole('navigation', {
        name: /main navigation/i,
      })
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('hamburger button has dynamic aria-expanded attribute', () => {
      render(<Navbar />)

      const hamburger = screen.getByRole('button', {
        name: /open navigation menu/i,
      })

      // Initially collapsed
      expect(hamburger).toHaveAttribute('aria-expanded', 'false')

      // Open the menu
      fireEvent.click(hamburger)
      expect(hamburger).toHaveAttribute('aria-expanded', 'true')

      // Close via the mocked MobileMenu's Close button
      fireEvent.click(screen.getByText('Close'))
      expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    })

    it('hamburger button has a descriptive aria-label', () => {
      render(<Navbar />)

      const hamburger = screen.getByLabelText('Open navigation menu')
      expect(hamburger).toBeInTheDocument()
    })
  })
})
