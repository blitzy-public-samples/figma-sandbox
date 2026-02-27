// @vitest-environment jsdom
/**
 * App.test.tsx — Integration tests for React Router routing configuration.
 *
 * Verifies that the App component correctly maps URL paths to their
 * corresponding page components and that the shared Layout/Navigation
 * components render on every route.
 *
 * Route mapping under test:
 *  | Path        | Component | Verification                         |
 *  |-------------|-----------|--------------------------------------|
 *  | `/`         | Screen1   | Contains "Welcome Home" heading      |
 *  | `/screen-2` | Screen2   | Contains "Analytics Dashboard" heading|
 *  | `/screen-3` | Screen3   | Contains "Settings & Preferences" h. |
 *
 * Uses MemoryRouter (not BrowserRouter) so tests run in a Node/jsdom
 * environment without the browser History API.
 */

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'

/**
 * Helper that renders the App component inside a MemoryRouter initialised
 * to a specific URL path.  Using a helper keeps each test focused on
 * assertions rather than boilerplate setup.
 *
 * @param initialPath - The URL path to simulate (e.g. "/" or "/screen-2").
 */
function renderAppAtRoute(initialPath: string): void {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing configuration', () => {
  /**
   * Explicitly tear down the rendered DOM after every test so that
   * elements from one test do not leak into the next.  Although
   * @testing-library/react can auto-detect some frameworks, calling
   * cleanup() directly is the most reliable approach in vitest.
   */
  afterEach(() => {
    cleanup()
  })

  // ---------------------------------------------------------------
  // Route → Component Rendering
  // ---------------------------------------------------------------

  it('renders Screen1 on the default route "/"', () => {
    renderAppAtRoute('/')

    // Screen1 contains an h1 with text "Welcome Home"
    const heading = screen.getByRole('heading', { name: /welcome home/i })
    expect(heading).toBeDefined()

    // The Navigation component should also be present on this route
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeDefined()
  })

  it('renders Screen2 on route "/screen-2"', () => {
    renderAppAtRoute('/screen-2')

    // Screen2 contains an h1 with text "Analytics Dashboard"
    const heading = screen.getByRole('heading', { name: /analytics dashboard/i })
    expect(heading).toBeDefined()
  })

  it('renders Screen3 on route "/screen-3"', () => {
    renderAppAtRoute('/screen-3')

    // Screen3 contains an h1 with text "Settings & Preferences"
    const heading = screen.getByRole('heading', { name: /settings & preferences/i })
    expect(heading).toBeDefined()
  })

  // ---------------------------------------------------------------
  // Navigation Links
  // ---------------------------------------------------------------

  it('renders navigation links for all 3 screens', () => {
    renderAppAtRoute('/')

    // The Navigation component renders NavLink elements labelled
    // "Screen 1", "Screen 2", and "Screen 3".
    const screen1Link = screen.getByRole('link', { name: /screen 1/i })
    const screen2Link = screen.getByRole('link', { name: /screen 2/i })
    const screen3Link = screen.getByRole('link', { name: /screen 3/i })

    expect(screen1Link).toBeDefined()
    expect(screen2Link).toBeDefined()
    expect(screen3Link).toBeDefined()
  })

  // ---------------------------------------------------------------
  // Layout Structure
  // ---------------------------------------------------------------

  it('renders the shared Layout on every route', () => {
    renderAppAtRoute('/screen-2')

    // Layout provides a footer containing "Figma Sandbox" branding
    const footerText = screen.getByText(/figma sandbox/i)
    expect(footerText).toBeDefined()

    // Layout provides a header with the Navigation component
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeDefined()
  })

  // ---------------------------------------------------------------
  // Route Navigation Link Href Attributes
  // ---------------------------------------------------------------

  it('navigation links point to the correct routes', () => {
    renderAppAtRoute('/')

    const screen1Link = screen.getByRole('link', { name: /screen 1/i })
    const screen2Link = screen.getByRole('link', { name: /screen 2/i })
    const screen3Link = screen.getByRole('link', { name: /screen 3/i })

    // Verify each link has the expected href attribute
    expect(screen1Link.getAttribute('href')).toBe('/')
    expect(screen2Link.getAttribute('href')).toBe('/screen-2')
    expect(screen3Link.getAttribute('href')).toBe('/screen-3')
  })

  // ---------------------------------------------------------------
  // Distinct Route Content (no cross-contamination)
  // ---------------------------------------------------------------

  it('does not render Screen2 or Screen3 content on the "/" route', () => {
    renderAppAtRoute('/')

    // "Analytics Dashboard" belongs to Screen2 and should NOT appear on /
    const screen2Heading = screen.queryByRole('heading', {
      name: /analytics dashboard/i,
    })
    expect(screen2Heading).toBeNull()

    // "Settings & Preferences" belongs to Screen3 and should NOT appear on /
    const screen3Heading = screen.queryByRole('heading', {
      name: /settings & preferences/i,
    })
    expect(screen3Heading).toBeNull()
  })

  it('does not render Screen1 content on the "/screen-2" route', () => {
    renderAppAtRoute('/screen-2')

    // "Welcome Home" belongs to Screen1 and should NOT appear on /screen-2
    const screen1Heading = screen.queryByRole('heading', {
      name: /welcome home/i,
    })
    expect(screen1Heading).toBeNull()
  })

  it('does not render Screen1 content on the "/screen-3" route', () => {
    renderAppAtRoute('/screen-3')

    // "Welcome Home" belongs to Screen1 and should NOT appear on /screen-3
    const screen1Heading = screen.queryByRole('heading', {
      name: /welcome home/i,
    })
    expect(screen1Heading).toBeNull()
  })
})
