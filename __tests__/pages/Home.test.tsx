/**
 * Integration Tests — Home Page
 *
 * Comprehensive integration test suite for the complete Area marketing landing
 * page (`src/app/page.tsx`). Verifies that all 12 page sections render in the
 * correct order, semantic HTML landmarks are used properly, heading hierarchy
 * is maintained (exactly one `<h1>`), section anchor IDs exist for navigation,
 * and the page renders without runtime errors.
 *
 * This is the most comprehensive test in the project, exercising the full
 * component composition chain from `page.tsx` through every section and layout
 * component down to reusable UI primitives.
 *
 * Test data is hardcoded in each test case (not imported from `constants.ts`)
 * to keep test assertions independent of implementation details. If content
 * changes in the constants module the tests will intentionally fail, flagging
 * the need for a corresponding content review.
 *
 * @module __tests__/pages/Home.test
 * @see src/app/page.tsx — Component under test
 * @see AAP §0.5.1 Group 9 — "Integration test verifying all sections render"
 * @see AAP §0.6.1 — All 12 page sections must render in order
 * @see AAP §0.7.3 — TypeScript strict mode, semantic HTML, single `<h1>`
 */

import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '@/app/page'

/* ================================================================== */
/*  Mocks — Isolate the page from the Next.js runtime                  */
/* ================================================================== */

/**
 * Mock `next/image` to render a plain `<img>` element.
 *
 * The real Image component requires the Next.js image optimisation server
 * which is unavailable in the Jest / jsdom environment. The mock preserves
 * standard HTML image attributes (`src`, `alt`, `width`, `height`,
 * `className`) while stripping Next.js-specific props (`priority`,
 * `quality`, `placeholder`, `blurDataURL`, `fill`, `sizes`, `loader`,
 * `unoptimized`) to prevent React warnings about non-boolean DOM attrs.
 */
jest.mock('next/image', () => {
  const ReactModule = require('react')
  return {
    __esModule: true,
    default: (allProps: Record<string, unknown>) => {
      /* Strip Next.js-specific Image props that would cause React DOM warnings */
      const {
        priority,
        quality,
        placeholder,
        blurDataURL,
        fill,
        sizes,
        loader,
        unoptimized,
        ...htmlProps
      } = allProps
      void priority
      void quality
      void placeholder
      void blurDataURL
      void fill
      void sizes
      void loader
      void unoptimized
      return ReactModule.createElement('img', htmlProps)
    },
  }
})

/**
 * Mock `next/link` to render a plain `<a>` element.
 *
 * The real Link component requires the Next.js router context which does
 * not exist inside Jest / jsdom. The mock forwards `href` and all other
 * HTML attributes so link queries and navigation assertions work.
 */
jest.mock('next/link', () => {
  const ReactModule = require('react')
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
    }) => ReactModule.createElement('a', { href, ...props }, children),
  }
})

/* ================================================================== */
/*  Test Suite                                                         */
/* ================================================================== */

describe('Home Page', () => {
  /* ---------------------------------------------------------------- */
  /*  3.12 — Page Renders Without Errors                               */
  /* ---------------------------------------------------------------- */
  it('renders without throwing errors', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => render(<Home />)).not.toThrow()
    expect(consoleSpy).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  /* ---------------------------------------------------------------- */
  /*  3.1 — All 12 Page Sections Render                               */
  /* ---------------------------------------------------------------- */
  it('renders all page sections', () => {
    render(<Home />)

    /* 1. Navbar — <nav> with aria-label="Main navigation" */
    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument()

    /* 2. HeroSection — <h1> "Browse everything." */
    expect(
      screen.getByRole('heading', { level: 1, name: /browse everything/i })
    ).toBeInTheDocument()

    /* 3. TrustedBySection — "Trusted by:" label text */
    expect(screen.getByText('Trusted by:')).toBeInTheDocument()

    /* 4. BenefitsSection — "We've cracked the code." heading */
    expect(
      screen.getByRole('heading', { name: /we've cracked the code/i })
    ).toBeInTheDocument()

    /* 5. PhotoGallery — aria-label="Photo gallery" region */
    expect(
      screen.getByRole('region', { name: /photo gallery/i })
    ).toBeInTheDocument()

    /* 6. BigPictureSection — "See the Big Picture" heading */
    expect(
      screen.getByRole('heading', { name: /see the big picture/i })
    ).toBeInTheDocument()

    /* 7. WhyChooseSection — "Why Choose Area?" heading */
    expect(
      screen.getByRole('heading', { name: /why choose area/i })
    ).toBeInTheDocument()

    /* 8. TestimonialSection — blockquote within testimonial region */
    const testimonialRegion = screen.getByRole('region', {
      name: /testimonial/i,
    })
    expect(
      testimonialRegion.querySelector('blockquote')
    ).toBeInTheDocument()

    /* 9. MapSuccessSection — "Map Your Success" heading */
    expect(
      screen.getByRole('heading', { name: /map your success/i })
    ).toBeInTheDocument()

    /* 10. Aerial Landscape Image — alt text contains "aerial" */
    expect(screen.getByAltText(/aerial/i)).toBeInTheDocument()

    /* 11. ConnectSection — "Connect with us" heading */
    expect(
      screen.getByRole('heading', { name: /connect with us/i })
    ).toBeInTheDocument()

    /* 12. Footer — site footer identified via unique copyright text.
       Note: the TestimonialSection's <blockquote> also contains a semantic
       <footer> for the author attribution. Both get the ARIA `contentinfo`
       role in jsdom, so we verify the site footer through its copyright. */
    expect(
      screen.getByText(/© Area · 2025 · All Rights Reserved/)
    ).toBeInTheDocument()

    /* Negative assertion — no placeholder content should remain */
    expect(screen.queryByText(/lorem ipsum/i)).not.toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.2 — Semantic HTML Landmarks                                    */
  /* ---------------------------------------------------------------- */
  it('uses correct semantic HTML landmarks', () => {
    const { container } = render(<Home />)

    /* <main> wrapping all primary content sections */
    expect(screen.getByRole('main')).toBeInTheDocument()

    /* <nav> for top navigation */
    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument()

    /* <footer> for site footer — verified via unique copyright text
       because jsdom maps both the site <footer> and the <blockquote>
       attribution <footer> to the `contentinfo` role. */
    const footers = container.querySelectorAll('footer')
    expect(footers.length).toBeGreaterThanOrEqual(1)

    /* Multiple <section> elements — at least one per visual section */
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(8)
  })

  /* ---------------------------------------------------------------- */
  /*  3.3 — Exactly One <h1> Heading                                   */
  /* ---------------------------------------------------------------- */
  it('contains exactly one h1 heading', () => {
    render(<Home />)

    const h1Elements = screen.getAllByRole('heading', { level: 1 })
    expect(h1Elements).toHaveLength(1)
    expect(h1Elements[0]).toHaveTextContent(/browse everything/i)
  })

  /* ---------------------------------------------------------------- */
  /*  3.4 — Section IDs for Anchor Navigation                          */
  /* ---------------------------------------------------------------- */
  it('has section IDs for anchor navigation', () => {
    const { container } = render(<Home />)

    /*
     * Each ID maps to a navbar link:
     *   Benefits       → #benefits
     *   Specifications → #specifications
     *   How-to         → #how-to
     *   Contact Us     → #contact
     */
    expect(container.querySelector('#benefits')).toBeInTheDocument()
    expect(container.querySelector('#specifications')).toBeInTheDocument()
    expect(container.querySelector('#how-to')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.5 — Benefits Section with 4 Feature Cards                      */
  /* ---------------------------------------------------------------- */
  it('renders BenefitsSection with 4 feature cards', () => {
    render(<Home />)

    const benefitsRegion = screen.getByRole('region', { name: /benefits/i })
    const scoped = within(benefitsRegion)

    /* Verify all 4 feature card titles appear within the section */
    expect(scoped.getByText('Amplify Insights')).toBeInTheDocument()
    expect(
      scoped.getByText('Control Your Global Presence')
    ).toBeInTheDocument()
    expect(
      scoped.getByText('Remove Language Barriers')
    ).toBeInTheDocument()
    expect(scoped.getByText('Visualize Growth')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.6 — BigPicture Section with 4 Numbered Steps                   */
  /* ---------------------------------------------------------------- */
  it('renders BigPictureSection with 4 numbered steps', () => {
    render(<Home />)

    /* Verify all 4 step titles appear on the page */
    expect(screen.getByText('Spot Trends in Seconds')).toBeInTheDocument()
    expect(
      screen.getByText('Get Everyone on the Same Page')
    ).toBeInTheDocument()
    expect(screen.getByText('Make Presentations Pop')).toBeInTheDocument()
    expect(screen.getByText('Your Global Snapshot')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.7 — WhyChoose Section with Comparison Table                    */
  /* ---------------------------------------------------------------- */
  it('renders WhyChooseSection with comparison table', () => {
    render(<Home />)

    /* Section heading */
    expect(
      screen.getByRole('heading', { name: /why choose area\?/i })
    ).toBeInTheDocument()

    /* Product names visible within the comparison region */
    const whyChooseRegion = screen.getByRole('region', {
      name: /why choose area/i,
    })
    const scoped = within(whyChooseRegion)

    expect(scoped.getByText('Area')).toBeInTheDocument()
    expect(scoped.getByText('WebSurge')).toBeInTheDocument()
    expect(scoped.getByText('HyperView')).toBeInTheDocument()

    /* At least one feature row present */
    expect(scoped.getByText('Ultra-fast browsing')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.8 — Testimonial Section with Customer Quote                    */
  /* ---------------------------------------------------------------- */
  it('renders TestimonialSection with customer quote', () => {
    render(<Home />)

    const testimonialRegion = screen.getByRole('region', {
      name: /testimonial/i,
    })

    /* Verify the blockquote element is present */
    expect(
      testimonialRegion.querySelector('blockquote')
    ).toBeInTheDocument()

    /* Verify quote text (partial match avoids fragile full-string assertions) */
    expect(
      screen.getByText(/area completely transformed/i)
    ).toBeInTheDocument()

    /* Verify author attribution */
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(
      screen.getByText('VP of Analytics, TechForward Inc.')
    ).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.9 — MapSuccess Section with 3 Steps                            */
  /* ---------------------------------------------------------------- */
  it('renders MapSuccessSection with 3 steps', () => {
    render(<Home />)

    const mapRegion = screen.getByRole('region', {
      name: /map your success/i,
    })
    const scoped = within(mapRegion)

    expect(scoped.getByText('Get Started')).toBeInTheDocument()
    expect(
      scoped.getByText('Customize and Configure')
    ).toBeInTheDocument()
    expect(scoped.getByText('Grow Your Business')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.10 — Connect Section with CTA                                  */
  /* ---------------------------------------------------------------- */
  it('renders ConnectSection with CTA', () => {
    render(<Home />)

    /* Section heading */
    expect(
      screen.getByRole('heading', { name: /connect with us/i })
    ).toBeInTheDocument()

    /* CTA button text within the Connect section */
    const connectRegion = screen.getByRole('region', {
      name: /connect with us/i,
    })
    expect(within(connectRegion).getByText('Learn More')).toBeInTheDocument()
  })

  /* ---------------------------------------------------------------- */
  /*  3.11 — Footer with Navigation Links and Copyright                */
  /* ---------------------------------------------------------------- */
  it('renders Footer with navigation links and copyright', () => {
    render(<Home />)

    /* Locate the site footer — multiple <footer> elements exist because
       the TestimonialSection's <blockquote> contains a semantic <footer>
       for author attribution. Both receive the ARIA `contentinfo` role in
       jsdom.  We identify the site footer by finding the one that contains
       the copyright text. */
    const allFooters = screen.getAllByRole('contentinfo')
    const siteFooter = allFooters.find((el) =>
      el.textContent?.includes('© Area')
    )
    expect(siteFooter).toBeTruthy()

    /* Copyright text — contains Unicode middle dots (·) from constants */
    expect(
      within(siteFooter!).getByText(/© Area · 2025 · All Rights Reserved/)
    ).toBeInTheDocument()

    /* Footer navigation links within the footer <nav> */
    const footerNav = within(siteFooter!).getByRole('navigation', {
      name: /footer navigation/i,
    })
    expect(within(footerNav).getByText('Benefits')).toBeInTheDocument()
    expect(
      within(footerNav).getByText('Specifications')
    ).toBeInTheDocument()
    expect(within(footerNav).getByText('How-to')).toBeInTheDocument()
    expect(within(footerNav).getByText('Contact Us')).toBeInTheDocument()
  })
})
