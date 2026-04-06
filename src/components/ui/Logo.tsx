/**
 * Area Brand Logo Component
 *
 * Renders the Area brand logo — a stylized human figure icon alongside "Area"
 * text — wrapped in a Next.js Link for homepage navigation. Supports three
 * size variants (sm, md, lg) for use in different layout contexts such as the
 * Navbar and Footer. The logo SVG asset at /images/logos/area-logo.svg contains
 * both the icon figure and the "Area" wordmark in a single branded image.
 *
 * @see src/types/index.ts — LogoProps interface
 * @see public/images/logos/area-logo.svg — Brand logo SVG asset
 * @see AAP §0.5.1 Group 3 — "Area brand logo component"
 * @see AAP §0.7.3 — Next.js Image component requirement for all images
 *
 * @module components/ui/Logo
 */

import Link from 'next/link'
import Image from 'next/image'

import type { LogoProps } from '@/types'

/* ---------------------------------------------------------------------------
   SIZE CONFIGURATION
   ---------------------------------------------------------------------------
   Proportional dimensions for each logo size variant maintaining the SVG's
   natural 3.5:1 aspect ratio (viewBox 140×40). Ensures the branded logo
   renders crisply at each size without distortion.

   Usage contexts:
   - sm: Compact layouts, mobile Navbar, Footer
   - md: Standard Navbar, default usage
   - lg: Hero placement, prominent branding areas
   --------------------------------------------------------------------------- */
const sizeStyles = {
  sm: { width: 84, height: 24 },
  md: { width: 112, height: 32 },
  lg: { width: 140, height: 40 },
} as const

/**
 * Area brand logo component with size variants and className overrides.
 *
 * Wraps the branded logo SVG in a Next.js Link pointing to the homepage.
 * The Image component provides optimized SVG rendering with automatic
 * format selection and lazy loading.
 *
 * @param props.className — Optional CSS classes for consumer overrides
 *   (e.g., CSS filter utilities for dark background contexts)
 * @param props.size — Logo size variant: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * @example
 * ```tsx
 * // Default medium logo in Navbar
 * <Logo />
 *
 * // Small logo in Footer
 * <Logo size="sm" />
 *
 * // Large logo with custom class for dark background
 * <Logo size="lg" className="brightness-0 invert" />
 * ```
 */
export function Logo({ className, size = 'md' }: LogoProps) {
  const { width, height } = sizeStyles[size]

  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:ring-offset-2${className ? ` ${className}` : ''}`}
      aria-label="Area - Home"
    >
      <Image
        src="/images/logos/area-logo.svg"
        alt="Area"
        width={width}
        height={height}
        priority
      />
    </Link>
  )
}
