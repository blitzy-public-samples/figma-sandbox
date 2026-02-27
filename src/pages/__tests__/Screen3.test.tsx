// @vitest-environment jsdom

/**
 * Unit tests for the Screen3 page component.
 *
 * Screen3 renders the "Settings & Preferences" page, which is mapped
 * to the `/screen-3` route. It features a hero section with an
 * emerald accent theme and four settings cards: Profile, Notifications,
 * Security, and Appearance.
 *
 * Tests verify:
 * - Component renders without errors
 * - Heading and label text are present
 * - All four settings sections are rendered with expected content
 * - Profile, notification, security, and appearance details are displayed
 */

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Screen3 from '../Screen3'

/**
 * Explicit cleanup after each test to ensure the rendered DOM is reset.
 * Required because vitest does not enable globals by default, so
 * @testing-library/react's auto-cleanup (which relies on a global
 * afterEach) does not activate automatically.
 */
afterEach(() => {
  cleanup()
})

describe('Screen3', () => {
  it('renders without crashing', () => {
    // Mounting the component should not throw any errors
    const { container } = render(<Screen3 />)
    expect(container).toBeTruthy()
  })

  it('displays the main heading "Settings & Preferences"', () => {
    render(<Screen3 />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Settings & Preferences')
  })

  it('displays the "Screen 3" label text', () => {
    render(<Screen3 />)
    expect(screen.getByText('Screen 3')).toBeInTheDocument()
  })

  it('renders the hero section description', () => {
    render(<Screen3 />)
    expect(
      screen.getByText(
        /manage your account configuration, notification preferences, and application settings/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders all four settings section headings', () => {
    render(<Screen3 />)
    expect(
      screen.getByRole('heading', { name: /^profile$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^notifications$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^security$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^appearance$/i }),
    ).toBeInTheDocument()
  })

  it('renders profile information details', () => {
    render(<Screen3 />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.getByText('Administrator')).toBeInTheDocument()
  })

  it('renders notification preference items', () => {
    render(<Screen3 />)
    expect(screen.getByText('Email notifications')).toBeInTheDocument()
    expect(screen.getByText('Push notifications')).toBeInTheDocument()
    expect(screen.getByText('Weekly digest')).toBeInTheDocument()
  })

  it('renders security information items', () => {
    render(<Screen3 />)
    expect(screen.getByText('Two-factor auth')).toBeInTheDocument()
    expect(screen.getByText('Password updated')).toBeInTheDocument()
    expect(screen.getByText('Active sessions')).toBeInTheDocument()
  })

  it('renders appearance settings items', () => {
    render(<Screen3 />)
    expect(screen.getByText('Theme')).toBeInTheDocument()
    expect(screen.getByText('Accent color')).toBeInTheDocument()
    expect(screen.getByText('Density')).toBeInTheDocument()
  })

  it('renders notification status badges', () => {
    render(<Screen3 />)
    // Verify enabled/disabled status badges exist
    const enabledBadges = screen.getAllByText('Enabled')
    expect(enabledBadges).toHaveLength(2)
    expect(screen.getByText('Disabled')).toBeInTheDocument()
  })

  it('renders security status information', () => {
    render(<Screen3 />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('12 days ago')).toBeInTheDocument()
  })

  it('renders appearance setting values', () => {
    render(<Screen3 />)
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Emerald')).toBeInTheDocument()
    expect(screen.getByText('Comfortable')).toBeInTheDocument()
  })

  it('renders the footer note', () => {
    render(<Screen3 />)
    expect(
      screen.getByText(
        /this placeholder will be replaced with the actual figma screen 3/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders profile description text', () => {
    render(<Screen3 />)
    expect(
      screen.getByText(
        /update your personal information, avatar, and public-facing display name/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the correct number of settings cards', () => {
    const { container } = render(<Screen3 />)
    // There are 4 settings cards, each rendered as a <section> inside the grid
    // Plus the hero <section>, totalling 5 section elements
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBe(5)
  })
})
