/**
 * Central Type Definitions for the Area Landing Page
 *
 * This module exports all shared TypeScript interfaces used across the
 * Area marketing landing page project. It serves as the foundational type
 * layer consumed by components, constants, and page files.
 *
 * @module types
 */

import type { ComponentType, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Data Types — Pure data shapes used in constants and passed as props
// ---------------------------------------------------------------------------

/**
 * Navigation link data used in Navbar, MobileMenu, and Footer components.
 *
 * @see src/components/layout/Navbar.tsx
 * @see src/components/layout/MobileMenu.tsx
 * @see src/components/layout/Footer.tsx
 */
export interface NavLink {
  /** Display text for the navigation link (e.g., "Benefits", "Specifications") */
  label: string;
  /** URL or anchor hash for the link target (e.g., "#benefits", "/contact") */
  href: string;
}

/**
 * Data structure for Benefits section feature cards.
 *
 * Each feature card displays an icon, title, and description in the
 * Benefits grid layout. The `icon` property accepts a React component
 * reference (not an element instance) so the consuming FeatureCard
 * component retains control over icon sizing and styling.
 *
 * @see src/components/ui/FeatureCard.tsx
 * @see src/components/sections/BenefitsSection.tsx
 */
export interface FeatureCardData {
  /**
   * A lucide-react icon component passed as a component reference.
   * Accepts a className prop for the consuming component to control
   * icon sizing and styling (e.g., TrendingUp, Eye, Building, Settings).
   */
  icon: ComponentType<{ className?: string }>;
  /** Feature card title (e.g., "Amplify Insights", "Visualize Growth") */
  title: string;
  /** Feature card description text */
  description: string;
}

/**
 * Data structure for comparison table rows in the "Why Choose Area?" section.
 *
 * Each row represents a feature and whether each competing product supports it.
 * Boolean values map to check marks (true) or X marks (false) in the UI.
 *
 * @see src/components/ui/ComparisonTable.tsx
 * @see src/components/sections/WhyChooseSection.tsx
 */
export interface ComparisonFeature {
  /** Name of the feature being compared (e.g., "Ultra-fast browsing") */
  feature: string;
  /** Whether Area supports this feature */
  area: boolean;
  /** Whether WebSurge supports this feature */
  webSurge: boolean;
  /** Whether HyperView supports this feature */
  hyperView: boolean;
}

/**
 * Data structure for numbered step cards used in both the
 * "See the Big Picture" and "Map Your Success" sections.
 *
 * @see src/components/ui/StepCard.tsx
 * @see src/components/sections/BigPictureSection.tsx
 * @see src/components/sections/MapSuccessSection.tsx
 */
export interface StepCardData {
  /** The step number (e.g., 1, 2, 3, 4) */
  stepNumber: number;
  /** Step title (e.g., "Spot Trends in Seconds", "Get Started") */
  title: string;
  /** Step description text */
  description: string;
}

/**
 * Data structure for testimonial quotes displayed in the
 * TestimonialSection component.
 *
 * @see src/components/sections/TestimonialSection.tsx
 */
export interface TestimonialData {
  /** The testimonial quote text */
  quote: string;
  /** Name of the person giving the testimonial */
  authorName: string;
  /** Title or role of the testimonial author */
  authorTitle: string;
}

// ---------------------------------------------------------------------------
// Aggregate Type — Top-level content structure for the entire landing page
// ---------------------------------------------------------------------------

/**
 * Top-level interface aggregating ALL content data for the Area landing page.
 *
 * This is the type for the main exported constant from `src/lib/constants.ts`.
 * Each property corresponds to a page section and contains the textual content,
 * data arrays, and configuration needed to render that section.
 *
 * @see src/lib/constants.ts
 */
export interface SiteContent {
  /** SEO metadata for the page */
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  /** Array of navigation links for Navbar and Footer */
  navLinks: NavLink[];
  /** Hero section content */
  hero: {
    headline: string;
    subtext: string;
    stat: string;
    statLabel: string;
  };
  /** Trusted-by partner logos section */
  trustedBy: {
    label: string;
    logos: {
      name: string;
      src: string;
      alt: string;
    }[];
  };
  /** Benefits section with feature cards */
  benefits: {
    label: string;
    heading: string;
    description: string;
    features: FeatureCardData[];
  };
  /** "See the Big Picture" section with numbered steps */
  bigPicture: {
    label: string;
    heading: string;
    description: string;
    steps: StepCardData[];
    ctaText: string;
  };
  /** "Why Choose Area?" section with comparison table */
  whyChoose: {
    label: string;
    heading: string;
    description: string;
    ctaText: string;
    features: ComparisonFeature[];
    products: string[];
  };
  /** Testimonial section data */
  testimonial: TestimonialData;
  /** "Map Your Success" section with numbered steps */
  mapSuccess: {
    heading: string;
    ctaText: string;
    steps: StepCardData[];
  };
  /** "Connect with us" CTA section */
  connect: {
    heading: string;
    description: string;
    ctaText: string;
  };
  /** Footer section content */
  footer: {
    links: NavLink[];
    copyright: string;
  };
}

// ---------------------------------------------------------------------------
// Component Props — React component prop contracts
// ---------------------------------------------------------------------------

/**
 * Props for the Button component.
 *
 * Supports primary, secondary, and outline variants with optional icon,
 * link behavior (via href), and full accessibility support.
 *
 * @see src/components/ui/Button.tsx
 */
export interface ButtonProps {
  /** Button style variant; defaults to 'primary' in the component */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button content (text, icons, or any renderable React nodes) */
  children: ReactNode;
  /** Optional icon element to render alongside button text */
  icon?: ReactNode;
  /** Optional additional CSS classes for customization */
  className?: string;
  /** Optional URL; when provided, the button renders as a link */
  href?: string;
  /** Optional click handler for action buttons */
  onClick?: () => void;
  /** Optional HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Optional ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Props for the SectionLabel component.
 *
 * Renders a small uppercase label above section headings
 * (e.g., "Benefits", "More", "Understand the Data").
 *
 * @see src/components/ui/SectionLabel.tsx
 */
export interface SectionLabelProps {
  /** The label text to display */
  text: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Props for the ComparisonTable component.
 *
 * Renders a responsive feature comparison table with check/cross marks
 * for Area vs competitor products.
 *
 * @see src/components/ui/ComparisonTable.tsx
 */
export interface ComparisonTableProps {
  /** Array of comparison feature rows */
  features: ComparisonFeature[];
  /** Array of product names for column headers (e.g., ["Area", "WebSurge", "HyperView"]) */
  products: string[];
}

/**
 * Props for the Logo component.
 *
 * Renders the Area brand logo with the stylized human figure icon
 * alongside "Area" text, in configurable sizes.
 *
 * @see src/components/ui/Logo.tsx
 */
export interface LogoProps {
  /** Optional additional CSS classes */
  className?: string;
  /** Optional size variant for the logo */
  size?: 'sm' | 'md' | 'lg';
}
