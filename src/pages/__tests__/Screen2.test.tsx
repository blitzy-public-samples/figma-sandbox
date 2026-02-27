// @vitest-environment jsdom

/**
 * Unit tests for the Screen2 page component.
 *
 * Screen2 renders the "Analytics Dashboard" page, which is mapped
 * to the `/screen-2` route. It features a hero section with a
 * violet accent theme, four key metric cards (Total Views, Conversions,
 * Bounce Rate, Avg. Duration), a bar-chart traffic overview, a top-pages
 * ranked list, and a recent-activity table.
 *
 * Tests verify:
 * - Component renders without errors
 * - Heading and label text are present
 * - All four metric cards display expected values
 * - Traffic overview section is rendered
 * - Top pages section contains ranked entries
 * - Recent activity table displays event rows and status badges
 * - Footer note is present
 */

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Screen2 from '../Screen2'

/**
 * Explicit cleanup after each test to ensure the rendered DOM is reset.
 * Required because vitest does not enable globals by default, so
 * @testing-library/react's auto-cleanup (which relies on a global
 * afterEach) does not activate automatically.
 */
afterEach(() => {
  cleanup()
})

describe('Screen2', () => {
  it('renders without crashing', () => {
    // Mounting the component should not throw any errors
    const { container } = render(<Screen2 />)
    expect(container).toBeTruthy()
  })

  it('displays the main heading "Analytics Dashboard"', () => {
    render(<Screen2 />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Analytics Dashboard')
  })

  it('displays the "Screen 2" label text', () => {
    render(<Screen2 />)
    expect(screen.getByText('Screen 2')).toBeInTheDocument()
  })

  it('renders the hero section description', () => {
    render(<Screen2 />)
    expect(
      screen.getByText(
        /track key performance metrics, monitor trends over time, and gain actionable insights/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders all four metric card labels', () => {
    render(<Screen2 />)
    expect(screen.getByText('Total Views')).toBeInTheDocument()
    expect(screen.getByText('Conversions')).toBeInTheDocument()
    expect(screen.getByText('Bounce Rate')).toBeInTheDocument()
    expect(screen.getByText('Avg. Duration')).toBeInTheDocument()
  })

  it('renders metric card values', () => {
    render(<Screen2 />)
    expect(screen.getByText('24,812')).toBeInTheDocument()
    expect(screen.getByText('1,429')).toBeInTheDocument()
    expect(screen.getByText('32.1%')).toBeInTheDocument()
    expect(screen.getByText('4m 32s')).toBeInTheDocument()
  })

  it('renders metric change percentages', () => {
    render(<Screen2 />)
    expect(screen.getByText('12.5% from last month')).toBeInTheDocument()
    expect(screen.getByText('8.2% from last month')).toBeInTheDocument()
    expect(screen.getByText('3.1% from last month')).toBeInTheDocument()
    expect(screen.getByText('1.4% from last month')).toBeInTheDocument()
  })

  it('renders the Traffic Overview section heading', () => {
    render(<Screen2 />)
    expect(
      screen.getByRole('heading', { name: /traffic overview/i }),
    ).toBeInTheDocument()
  })

  it('renders the "Last 30 days" badge in the traffic overview', () => {
    render(<Screen2 />)
    expect(screen.getByText('Last 30 days')).toBeInTheDocument()
  })

  it('renders the bar chart with accessible label', () => {
    render(<Screen2 />)
    expect(
      screen.getByRole('img', {
        name: /bar chart showing traffic over the last 12 periods/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders chart month labels', () => {
    render(<Screen2 />)
    expect(screen.getByText('Jan')).toBeInTheDocument()
    expect(screen.getByText('Jun')).toBeInTheDocument()
    expect(screen.getByText('Dec')).toBeInTheDocument()
  })

  it('renders the Top Pages section heading', () => {
    render(<Screen2 />)
    expect(
      screen.getByRole('heading', { name: /top pages/i }),
    ).toBeInTheDocument()
  })

  it('renders all five top page entries', () => {
    render(<Screen2 />)
    expect(screen.getByText('/home')).toBeInTheDocument()
    expect(screen.getByText('/pricing')).toBeInTheDocument()
    expect(screen.getByText('/about')).toBeInTheDocument()
    expect(screen.getByText('/blog')).toBeInTheDocument()
    expect(screen.getByText('/contact')).toBeInTheDocument()
  })

  it('renders top page view counts', () => {
    render(<Screen2 />)
    expect(screen.getByText('8,241')).toBeInTheDocument()
    expect(screen.getByText('5,117')).toBeInTheDocument()
    expect(screen.getByText('3,890')).toBeInTheDocument()
    expect(screen.getByText('2,654')).toBeInTheDocument()
    expect(screen.getByText('1,910')).toBeInTheDocument()
  })

  it('renders the Recent Activity section heading', () => {
    render(<Screen2 />)
    expect(
      screen.getByRole('heading', { name: /recent activity/i }),
    ).toBeInTheDocument()
  })

  it('renders activity table column headers', () => {
    render(<Screen2 />)
    expect(screen.getByText('Event')).toBeInTheDocument()
    expect(screen.getByText('Source')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  it('renders activity table event names', () => {
    render(<Screen2 />)
    expect(screen.getByText('Page viewed')).toBeInTheDocument()
    expect(screen.getByText('Form submitted')).toBeInTheDocument()
    expect(screen.getByText('File downloaded')).toBeInTheDocument()
    expect(screen.getByText('Account signup')).toBeInTheDocument()
  })

  it('renders activity table source values', () => {
    render(<Screen2 />)
    expect(screen.getByText('Organic search')).toBeInTheDocument()
    expect(screen.getByText('Direct')).toBeInTheDocument()
    expect(screen.getByText('Referral')).toBeInTheDocument()
    expect(screen.getByText('Social media')).toBeInTheDocument()
  })

  it('renders activity status badges', () => {
    render(<Screen2 />)
    // Two "Completed" badges, one "Processing", one "Pending"
    const completedBadges = screen.getAllByText('Completed')
    expect(completedBadges).toHaveLength(2)
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('renders activity date timestamps', () => {
    render(<Screen2 />)
    expect(screen.getByText('2 min ago')).toBeInTheDocument()
    expect(screen.getByText('15 min ago')).toBeInTheDocument()
    expect(screen.getByText('1 hour ago')).toBeInTheDocument()
    expect(screen.getByText('3 hours ago')).toBeInTheDocument()
  })

  it('renders the footer note', () => {
    render(<Screen2 />)
    expect(
      screen.getByText(
        /this placeholder will be replaced with the actual figma screen 2/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the correct number of sections', () => {
    const { container } = render(<Screen2 />)
    // Hero <section>, Key metrics <section>, Chart <section>,
    // Top Pages <section>, Recent Activity <section> = 5 sections
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBe(5)
  })

  it('renders the key metrics section with accessible label', () => {
    render(<Screen2 />)
    const metricsSection = screen.getByLabelText('Key metrics')
    expect(metricsSection).toBeInTheDocument()
  })
})
