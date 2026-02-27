// @vitest-environment jsdom

/**
 * Unit tests for the Screen1 page component.
 *
 * Screen1 renders the "Welcome Home" page, which is mapped to the
 * default home route (`/`). It features a hero section with an
 * indigo accent theme, three feature highlight cards (Projects,
 * Analytics, Collaboration), a recent-activity feed, and a
 * quick-actions sidebar.
 *
 * Tests verify:
 * - Component renders without errors
 * - Heading and label text are present
 * - All three feature cards display expected content
 * - Recent activity section is rendered with event entries
 * - Quick actions section contains expected action items
 * - Footer note is present
 * - Correct number of semantic sections are rendered
 */

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Screen1 from '../Screen1'

/**
 * Explicit cleanup after each test to ensure the rendered DOM is reset.
 * Required because vitest does not enable globals by default, so
 * @testing-library/react's auto-cleanup (which relies on a global
 * afterEach) does not activate automatically.
 */
afterEach(() => {
  cleanup()
})

describe('Screen1', () => {
  it('renders without crashing', () => {
    // Mounting the component should not throw any errors
    const { container } = render(<Screen1 />)
    expect(container).toBeTruthy()
  })

  it('displays the main heading "Welcome Home"', () => {
    render(<Screen1 />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Welcome Home')
  })

  it('displays the "Screen 1" label text', () => {
    render(<Screen1 />)
    expect(screen.getByText('Screen 1')).toBeInTheDocument()
  })

  it('renders the hero section description', () => {
    render(<Screen1 />)
    expect(
      screen.getByText(
        /your central hub for managing projects, tracking progress, and collaborating with your team/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the "Get Started" section heading', () => {
    render(<Screen1 />)
    expect(
      screen.getByRole('heading', { name: /get started/i }),
    ).toBeInTheDocument()
  })

  it('renders all three feature card headings', () => {
    render(<Screen1 />)
    expect(
      screen.getByRole('heading', { name: /^projects$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^analytics$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^collaboration$/i }),
    ).toBeInTheDocument()
  })

  it('renders feature card descriptions', () => {
    render(<Screen1 />)
    expect(
      screen.getByText(
        /organise work into projects with milestones, deadlines, and team assignments/i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /monitor key metrics and trends to make data-driven decisions/i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /bring your team together with real-time updates, comments, and shared workspaces/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the "Recent Activity" section heading', () => {
    render(<Screen1 />)
    expect(
      screen.getByRole('heading', { name: /recent activity/i }),
    ).toBeInTheDocument()
  })

  it('renders recent activity event descriptions', () => {
    render(<Screen1 />)
    expect(
      screen.getByText(/website redesign/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/set up ci pipeline/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/q1 planning/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/alpha release/i),
    ).toBeInTheDocument()
  })

  it('renders recent activity timestamps', () => {
    render(<Screen1 />)
    expect(screen.getByText('Just now')).toBeInTheDocument()
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('Yesterday')).toBeInTheDocument()
    expect(screen.getByText('2 days ago')).toBeInTheDocument()
  })

  it('renders the "Quick Actions" section heading', () => {
    render(<Screen1 />)
    expect(
      screen.getByRole('heading', { name: /quick actions/i }),
    ).toBeInTheDocument()
  })

  it('renders all quick action items', () => {
    render(<Screen1 />)
    expect(screen.getByText('Create New Project')).toBeInTheDocument()
    expect(screen.getByText('Invite Team Member')).toBeInTheDocument()
    expect(screen.getByText('Generate Report')).toBeInTheDocument()
  })

  it('renders the footer note', () => {
    render(<Screen1 />)
    expect(
      screen.getByText(
        /this placeholder will be replaced with the actual figma screen 1/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the feature highlights section with accessible label', () => {
    render(<Screen1 />)
    const featuresSection = screen.getByLabelText('Feature highlights')
    expect(featuresSection).toBeInTheDocument()
  })

  it('renders the correct number of sections', () => {
    const { container } = render(<Screen1 />)
    // Hero <section>, Feature highlights <section>,
    // Recent Activity <section>, Quick Actions <section> = 4 sections
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBe(4)
  })

  it('renders three feature card articles', () => {
    const { container } = render(<Screen1 />)
    // Each feature card is an <article> element
    const articles = container.querySelectorAll('article')
    expect(articles.length).toBe(3)
  })

  it('renders four recent activity list items', () => {
    render(<Screen1 />)
    // The recent activity list has 4 <li> items plus 3 quick action <li> items = 7 total
    // Target just the recent activity section's list items
    const recentActivityHeading = screen.getByRole('heading', {
      name: /recent activity/i,
    })
    const recentActivitySection = recentActivityHeading.closest('section')
    expect(recentActivitySection).not.toBeNull()
    const listItems = recentActivitySection!.querySelectorAll('li')
    expect(listItems.length).toBe(4)
  })
})
