/**
 * Centralized Content Data for the Area Landing Page
 *
 * This module is the single source of truth for ALL textual content, feature
 * data, comparison data, navigation links, and metadata used across the Area
 * marketing landing page. Components import from this file and contain only
 * structural markup and styling logic — no hardcoded content strings.
 *
 * @module lib/constants
 * @see src/types/index.ts — Type definitions consumed by this file
 */

import type { SiteContent } from '@/types';
import { TrendingUp, Building, LayoutGrid, Eye } from 'lucide-react';

// ---------------------------------------------------------------------------
// SITE_CONTENT — Master content constant for the entire landing page
// ---------------------------------------------------------------------------

/**
 * Complete content data for every section of the Area landing page.
 *
 * Typed against the {@link SiteContent} interface to guarantee compile-time
 * safety under TypeScript strict mode. Each top-level property maps 1-to-1
 * with a page section component.
 */
export const SITE_CONTENT: SiteContent = {
  // -------------------------------------------------------------------------
  // SEO Metadata
  // -------------------------------------------------------------------------
  meta: {
    title: 'Area — Browse Everything',
    description:
      'Area is a data analytics and browsing platform that helps you visualize, understand, and act on your data with powerful insights and seamless integration.',
    ogImage: '/images/hero-dashboard.webp',
  },

  // -------------------------------------------------------------------------
  // Navigation Links (shared by Navbar, MobileMenu, and Footer)
  // -------------------------------------------------------------------------
  navLinks: [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Specifications', href: '#specifications' },
    { label: 'How-to', href: '#how-to' },
    { label: 'Contact Us', href: '#contact' },
  ],

  // -------------------------------------------------------------------------
  // Hero Section
  // -------------------------------------------------------------------------
  hero: {
    headline: 'Browse everything.',
    subtext:
      'Explore a smarter way to browse data, analyze trends, and uncover insights — all in one powerful platform built for modern teams.',
    stat: '78%',
    statLabel: 'Efficiency Improvements',
  },

  // -------------------------------------------------------------------------
  // Trusted By Section — Partner logo bar
  // -------------------------------------------------------------------------
  trustedBy: {
    label: 'Trusted by:',
    logos: [
      {
        name: 'Logoipsum 1',
        src: '/images/logos/partner-1.svg',
        alt: 'Partner company 1 logo',
      },
      {
        name: 'Logoipsum 2',
        src: '/images/logos/partner-2.svg',
        alt: 'Partner company 2 logo',
      },
      {
        name: 'Logoipsum 3',
        src: '/images/logos/partner-3.svg',
        alt: 'Partner company 3 logo',
      },
      {
        name: 'Logoipsum 4',
        src: '/images/logos/partner-4.svg',
        alt: 'Partner company 4 logo',
      },
      {
        name: 'Logoipsum 5',
        src: '/images/logos/partner-5.svg',
        alt: 'Partner company 5 logo',
      },
      {
        name: 'Logoipsum 6',
        src: '/images/logos/partner-6.svg',
        alt: 'Partner company 6 logo',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Benefits Section — Feature cards with icons
  // -------------------------------------------------------------------------
  benefits: {
    label: 'Benefits',
    heading: "We've cracked the code.",
    description:
      'Our platform brings together the tools you need to analyze, visualize, and act on your data — faster and smarter than ever before.',
    features: [
      {
        icon: TrendingUp,
        title: 'Amplify Insights',
        description:
          'Unlock deeper understanding from your data with advanced analytics tools that surface the trends and patterns that matter most.',
      },
      {
        icon: Building,
        title: 'Control Your Global Presence',
        description:
          'Manage and monitor your brand across regions with real-time dashboards that give you a complete view of your worldwide operations.',
      },
      {
        icon: LayoutGrid,
        title: 'Remove Language Barriers',
        description:
          'Break through communication challenges with built-in translation and localization features that make your content accessible everywhere.',
      },
      {
        icon: Eye,
        title: 'Visualize Growth',
        description:
          'Turn complex data sets into clear, compelling visualizations that help you track progress and identify opportunities at a glance.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // "See the Big Picture" Section — Numbered insight steps
  // -------------------------------------------------------------------------
  bigPicture: {
    label: 'Understand the Data',
    heading: 'See the Big Picture',
    description:
      'Go beyond surface-level metrics. Area gives you the tools to dive deep into your data and emerge with actionable insights.',
    steps: [
      {
        stepNumber: 1,
        title: 'Spot Trends in Seconds',
        description:
          'Our AI-powered analytics engine identifies patterns and trends as they emerge, so you can act before the competition.',
      },
      {
        stepNumber: 2,
        title: 'Get Everyone on the Same Page',
        description:
          'Share interactive dashboards and reports with your entire team, keeping everyone aligned and informed.',
      },
      {
        stepNumber: 3,
        title: 'Make Presentations Pop',
        description:
          'Export beautiful, data-rich visualizations that make your presentations stand out and your insights impossible to ignore.',
      },
      {
        stepNumber: 4,
        title: 'Your Global Snapshot',
        description:
          'Get a comprehensive view of your worldwide operations with geographic data overlays and regional performance metrics.',
      },
    ],
    ctaText: 'Discover More',
  },

  // -------------------------------------------------------------------------
  // "Why Choose Area?" Section — Competitor comparison table
  // -------------------------------------------------------------------------
  whyChoose: {
    label: 'More',
    heading: 'Why Choose Area?',
    description:
      'See how Area stacks up against the competition. Our platform delivers more features, better performance, and seamless integration.',
    ctaText: 'Discover More',
    products: ['Area', 'WebSurge', 'HyperView'],
    features: [
      {
        feature: 'Ultra-fast browsing',
        area: true,
        webSurge: true,
        hyperView: false,
      },
      {
        feature: 'Advanced AI insights',
        area: true,
        webSurge: false,
        hyperView: false,
      },
      {
        feature: 'Seamless integration',
        area: true,
        webSurge: true,
        hyperView: true,
      },
      {
        feature: 'Real-time collaboration',
        area: true,
        webSurge: false,
        hyperView: true,
      },
      {
        feature: 'Global data coverage',
        area: true,
        webSurge: false,
        hyperView: false,
      },
      {
        feature: 'Custom dashboards',
        area: true,
        webSurge: true,
        hyperView: false,
      },
      {
        feature: '24/7 priority support',
        area: true,
        webSurge: false,
        hyperView: false,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Testimonial Section
  // -------------------------------------------------------------------------
  testimonial: {
    quote:
      'Area completely transformed how our team approaches data analysis. The insights we gain in minutes used to take our analysts days to compile. It\u2019s not just a tool — it\u2019s a competitive advantage.',
    authorName: 'Sarah Chen',
    authorTitle: 'VP of Analytics, TechForward Inc.',
  },

  // -------------------------------------------------------------------------
  // "Map Your Success" Section — Three-step process
  // -------------------------------------------------------------------------
  mapSuccess: {
    heading: 'Map Your Success',
    ctaText: 'Discover More',
    steps: [
      {
        stepNumber: 1,
        title: 'Get Started',
        description:
          'Sign up in minutes and connect your existing data sources. Our onboarding wizard makes setup effortless.',
      },
      {
        stepNumber: 2,
        title: 'Customize and Configure',
        description:
          'Tailor your dashboards, reports, and alerts to match your unique business needs and workflows.',
      },
      {
        stepNumber: 3,
        title: 'Grow Your Business',
        description:
          'Leverage powerful insights and analytics to make data-driven decisions that accelerate your growth.',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // "Connect with us" CTA Section
  // -------------------------------------------------------------------------
  connect: {
    heading: 'Connect with us',
    description:
      'Ready to transform your data experience? Get in touch with our team and discover how Area can help your business thrive.',
    ctaText: 'Learn More',
  },

  // -------------------------------------------------------------------------
  // Footer
  // -------------------------------------------------------------------------
  footer: {
    links: [
      { label: 'Benefits', href: '#benefits' },
      { label: 'Specifications', href: '#specifications' },
      { label: 'How-to', href: '#how-to' },
      { label: 'Contact Us', href: '#contact' },
    ],
    copyright: '\u00A9 Area \u00B7 2025 \u00B7 All Rights Reserved',
  },
};
