/**
 * Unit Tests — HeroSection Component
 *
 * Comprehensive test suite for the primary above-the-fold hero banner on the
 * Area marketing landing page. Verifies:
 *
 * - "Browse everything." h1 heading renders correctly with serif typography
 * - Descriptive subtext paragraph renders from centralized content data
 * - Dashboard mockup image renders with correct src, alt, and priority attrs
 * - Stat callout badge ("78% Efficiency Improvements") renders both values
 * - Responsive Tailwind classes are applied for Mobile / Tablet / Desktop
 * - Semantic HTML: <section> with aria-label, single <h1> per page
 * - Background/theme class application (bg-area-cream)
 *
 * All assertions reference {@link SITE_CONTENT.hero} from `@/lib/constants`
 * to ensure content-driven rendering as required by AAP §0.7.3.
 *
 * @see src/components/sections/HeroSection.tsx — Component under test
 * @see src/lib/constants.ts — Content data source
 * @see AAP §0.5.1 Group 5 — HeroSection specification
 * @see AAP §0.5.3 — Typography, Color Palette, and Button Styles
 * @see AAP §0.7.3 — Semantic HTML and content separation
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HeroSection } from '@/components/sections';
import { SITE_CONTENT } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/* Mock next/image — renders as a plain <img> for the test env         */
/* Next.js Image component requires server/build context that is       */
/* unavailable in jsdom. The mock preserves all relevant attributes     */
/* including the `priority` prop as a data-attribute for assertion.     */
/* ------------------------------------------------------------------ */
jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    width,
    height,
    priority,
    className,
    ...props
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
    className?: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority ? 'true' : undefined}
      {...props}
    />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

/* ================================================================== */
/*  Test Suite                                                         */
/* ================================================================== */

describe('HeroSection Component', () => {
  /* ---------------------------------------------------------------- */
  /*  2.1 — Heading Rendering                                          */
  /* ---------------------------------------------------------------- */
  describe('Heading', () => {
    it('renders "Browse everything." heading correctly', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(SITE_CONTENT.hero.headline);
    });

    it('renders exactly one h1 element for proper heading hierarchy', () => {
      const { container } = render(<HeroSection />);

      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements).toHaveLength(1);
    });

    it('h1 text matches SITE_CONTENT.hero.headline exactly', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe(SITE_CONTENT.hero.headline);
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.2 — Subtext Rendering                                          */
  /* ---------------------------------------------------------------- */
  describe('Subtext', () => {
    it('renders descriptive subtext paragraph from SITE_CONTENT', () => {
      render(<HeroSection />);

      const subtext = screen.getByText(SITE_CONTENT.hero.subtext);
      expect(subtext).toBeInTheDocument();
    });

    it('subtext is rendered in a paragraph element', () => {
      render(<HeroSection />);

      const subtext = screen.getByText(SITE_CONTENT.hero.subtext);
      expect(subtext.tagName).toBe('P');
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.3 — Dashboard Image                                            */
  /* ---------------------------------------------------------------- */
  describe('Dashboard Image', () => {
    it('renders dashboard mockup image with correct src', () => {
      render(<HeroSection />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/images/hero-dashboard.webp');
    });

    it('renders dashboard image with descriptive alt text', () => {
      render(<HeroSection />);

      const image = screen.getByAltText(
        'Area analytics dashboard showing data insights and visualizations'
      );
      expect(image).toBeInTheDocument();
    });

    it('dashboard image alt text is a non-empty descriptive string', () => {
      render(<HeroSection />);

      const image = screen.getByRole('img');
      const altText = image.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    });

    it('dashboard image has priority loading attribute for LCP', () => {
      render(<HeroSection />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('data-priority', 'true');
    });

    it('dashboard image has explicit width and height attributes', () => {
      render(<HeroSection />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.4 — Stat Callout Badge                                         */
  /* ---------------------------------------------------------------- */
  describe('Stat Callout', () => {
    it('renders stat callout with "78%" value', () => {
      render(<HeroSection />);

      const stat = screen.getByText(SITE_CONTENT.hero.stat);
      expect(stat).toBeInTheDocument();
    });

    it('renders stat label "Efficiency Improvements"', () => {
      render(<HeroSection />);

      const statLabel = screen.getByText(SITE_CONTENT.hero.statLabel);
      expect(statLabel).toBeInTheDocument();
    });

    it('stat value and label are both visible in the document', () => {
      render(<HeroSection />);

      expect(screen.getByText('78%')).toBeInTheDocument();
      expect(screen.getByText('Efficiency Improvements')).toBeInTheDocument();
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.5 — Responsive Class Application                               */
  /* ---------------------------------------------------------------- */
  describe('Responsive Classes', () => {
    it('hero section inner container has responsive layout classes', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      const innerDiv = section.firstElementChild as HTMLElement;

      /* The inner container must include responsive Tailwind prefixes
         for tablet (md:) and desktop (lg:) breakpoints per AAP §0.7.2 */
      expect(innerDiv.className).toMatch(/md:/);
      expect(innerDiv.className).toMatch(/lg:/);
    });

    it('heading has serif font-family class from Figma typography', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-serif');
    });

    it('heading has responsive text size classes for all breakpoints', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });

      /* Mobile base: text-4xl, Tablet: md:text-5xl, Desktop: lg:text-6xl
         per AAP §0.5.3 Typography Scale: "Header: Large serif/display font" */
      expect(heading.className).toMatch(/text-4xl/);
      expect(heading.className).toMatch(/md:text-5xl/);
      expect(heading.className).toMatch(/lg:text-6xl/);
    });

    it('heading uses bold font weight and tight tracking', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('tracking-tight');
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.6 — Semantic HTML and Accessibility                            */
  /* ---------------------------------------------------------------- */
  describe('Semantic HTML and Accessibility', () => {
    it('renders as a section element with aria-label "Hero"', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-label', 'Hero');
    });

    it('section element is a <section> HTML tag', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      expect(section.tagName).toBe('SECTION');
    });

    it('h1 heading is present within the section', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      const h1 = section.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1!.textContent).toBe(SITE_CONTENT.hero.headline);
    });

    it('image element is present within the section', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      const img = section.querySelector('img');
      expect(img).not.toBeNull();
    });
  });

  /* ---------------------------------------------------------------- */
  /*  2.7 — Background and Theme                                       */
  /* ---------------------------------------------------------------- */
  describe('Background and Theme', () => {
    it('hero section uses bg-area-cream background class', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      expect(section).toHaveClass('bg-area-cream');
    });

    it('hero section applies overflow-hidden for clean edges', () => {
      render(<HeroSection />);

      const section = screen.getByRole('region', { name: /hero/i });
      expect(section).toHaveClass('overflow-hidden');
    });

    it('heading text uses area-black color class', () => {
      render(<HeroSection />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-area-black');
    });
  });
});
