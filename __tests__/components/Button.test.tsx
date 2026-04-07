/**
 * Unit Tests — Button Component
 *
 * Comprehensive test suite for the pill-shaped Button component used
 * across the entire Area marketing landing page. Tests verify:
 *
 * - Three visual variants (primary, secondary, outline)
 * - Default variant fallback to "primary"
 * - Pill shape (rounded-full) consistency on ALL variants per AAP §0.7.1
 * - Dual rendering as <button> vs <a>/<Link> based on href prop
 * - Optional trailing icon slot rendering
 * - Custom className merging with base classes
 * - Accessibility (aria-label passthrough, focus-visible ring)
 * - HTML type attribute handling
 * - Click handler invocation
 *
 * @see src/components/ui/Button.tsx
 * @see src/types/index.ts — ButtonProps interface
 */

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Button } from '@/components/ui'

/* ------------------------------------------------------------------ */
/* Mock next/link — renders as a plain <a> tag for test environment    */
/* ------------------------------------------------------------------ */
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

/* ================================================================== */
/*  Test Suite                                                         */
/* ================================================================== */

describe('Button Component', () => {
  /* ---------------------------------------------------------------- */
  /*  2.1 — Variant Rendering                                         */
  /* ---------------------------------------------------------------- */
  describe('Variant Rendering', () => {
    it('renders primary variant by default when no variant is specified', () => {
      render(<Button>Click me</Button>)

      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('rounded-full')
      expect(button).toHaveClass('bg-area-olive')
      expect(button).toHaveClass('text-white')
    })

    it('renders primary variant correctly when explicitly set', () => {
      render(<Button variant="primary">Primary</Button>)

      const button = screen.getByRole('button', { name: 'Primary' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-area-olive')
      expect(button).toHaveClass('text-white')

      /* Primary variant must NOT have a border class */
      const classes = button.className.split(' ')
      expect(classes).not.toContain('border')
    })

    it('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>)

      const button = screen.getByRole('button', { name: 'Secondary' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('text-area-olive')
      expect(button).toHaveClass('border')
      expect(button).toHaveClass('border-area-olive')
    })

    it('renders outline variant correctly', () => {
      render(<Button variant="outline">Outline</Button>)

      const button = screen.getByRole('button', { name: 'Outline' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('border')
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.2 — Pill Shape Consistency                                     */
  /* ---------------------------------------------------------------- */
  describe('Pill Shape', () => {
    it('all variants have pill shape (rounded-full) per AAP §0.7.1', () => {
      const variants = ['primary', 'secondary', 'outline'] as const

      variants.forEach((variant) => {
        const { unmount } = render(
          <Button variant={variant}>{variant}</Button>,
        )

        const button = screen.getByRole('button', { name: variant })
        expect(button).toHaveClass('rounded-full')
        unmount()
      })
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.3 — Button vs Link Rendering                                   */
  /* ---------------------------------------------------------------- */
  describe('Button vs Link Rendering', () => {
    it('renders as a <button> element when no href is provided', () => {
      render(<Button>Click</Button>)

      const button = screen.getByRole('button', { name: 'Click' })
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
      expect(button).not.toHaveAttribute('href')
    })

    it('renders as an <a> / Link element when href is provided', () => {
      render(<Button href="#contact">Contact</Button>)

      const link = screen.getByRole('link', { name: 'Contact' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '#contact')
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.4 — Icon Slot                                                  */
  /* ---------------------------------------------------------------- */
  describe('Icon Slot', () => {
    it('renders icon when icon prop is provided', () => {
      const MockIcon = <span data-testid="test-icon">→</span>

      render(<Button icon={MockIcon}>With Icon</Button>)

      expect(screen.getByText('With Icon')).toBeInTheDocument()
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('does not render icon container when icon is not provided', () => {
      render(<Button>No Icon</Button>)

      expect(screen.getByText('No Icon')).toBeInTheDocument()
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.5 — className Override                                         */
  /* ---------------------------------------------------------------- */
  describe('className Override', () => {
    it('merges custom className with base classes', () => {
      render(<Button className="w-full px-10">Full Width</Button>)

      const button = screen.getByRole('button', { name: 'Full Width' })

      /* Base class must be preserved */
      expect(button).toHaveClass('rounded-full')
      /* Custom classes must be added */
      expect(button).toHaveClass('w-full')
      expect(button).toHaveClass('px-10')
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.6 — Accessibility                                              */
  /* ---------------------------------------------------------------- */
  describe('Accessibility', () => {
    it('passes aria-label through to the rendered element', () => {
      render(<Button ariaLabel="Learn more about Area">CTA</Button>)

      const button = screen.getByLabelText('Learn more about Area')
      expect(button).toBeInTheDocument()
    })

    it('has focus-visible ring classes for keyboard navigation', () => {
      render(<Button>Focus Test</Button>)

      const button = screen.getByRole('button', { name: 'Focus Test' })

      /*
       * The Button component uses focus-visible:ring-2 (not focus:ring-2)
       * for keyboard-only focus visibility. We verify the class string
       * contains the focus-visible ring token.
       */
      expect(button.className).toContain('focus-visible:ring-2')
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.7 — Type Attribute                                             */
  /* ---------------------------------------------------------------- */
  describe('Type Attribute', () => {
    it('defaults to type="button" when rendering as a button', () => {
      render(<Button>Default Type</Button>)

      const button = screen.getByRole('button', { name: 'Default Type' })
      expect(button).toHaveAttribute('type', 'button')
    })

    it('accepts a custom type attribute', () => {
      render(<Button type="submit">Submit</Button>)

      const button = screen.getByRole('button', { name: 'Submit' })
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  /* ---------------------------------------------------------------- */
  /*  2.8 — Click Handler                                              */
  /* ---------------------------------------------------------------- */
  describe('Click Handler', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn()

      render(<Button onClick={handleClick}>Click Me</Button>)

      const button = screen.getByRole('button', { name: 'Click Me' })
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
