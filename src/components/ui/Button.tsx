'use client'

import Link from 'next/link'

import type { ButtonProps } from '@/types'

/**
 * Variant-specific Tailwind class mappings.
 *
 * - **primary**: Olive green background with white text; darkens on hover
 * - **secondary**: Transparent with olive border; fills olive on hover
 * - **outline**: Transparent with olive border; subtle sage tint on hover
 *
 * All colors reference Tailwind theme tokens defined in globals.css via
 * the `@theme` directive — no hardcoded hex values per AAP §0.7.1.
 */
const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-area-olive text-white hover:bg-area-olive-dark',
  secondary:
    'bg-transparent text-area-olive border border-area-olive hover:bg-area-olive hover:text-white',
  outline:
    'bg-transparent text-area-olive border border-area-olive hover:bg-area-sage-light/30',
}

/**
 * Shared base classes applied to every Button regardless of variant.
 *
 * - `rounded-full` — CRITICAL: pill shape per AAP §0.7.1
 * - Responsive padding scales up at the `md` breakpoint (≥ 800 px)
 * - Focus ring uses `:focus-visible` for keyboard-only visibility
 * - Smooth color transitions at 200 ms for hover / focus changes
 */
const baseStyles = [
  'rounded-full',
  'px-4 py-2 md:px-6 md:py-2.5',
  'text-sm font-medium',
  'inline-flex items-center justify-center gap-2',
  'transition-colors duration-200',
  'cursor-pointer',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:ring-offset-2',
].join(' ')

/**
 * Pill-shaped button component used across the entire Area landing page.
 *
 * Renders as a Next.js `<Link>` when the `href` prop is provided for
 * navigational actions, or as a native `<button>` element for interactive
 * actions. Supports three visual variants (`primary`, `secondary`, `outline`),
 * an optional trailing icon slot, and full keyboard accessibility.
 *
 * All buttons use the fully-rounded pill shape per the Figma design system.
 * Colors reference Tailwind theme tokens exclusively — no hardcoded hex values.
 *
 * @example
 * ```tsx
 * // Primary action button
 * <Button variant="primary" onClick={handleClick}>
 *   Learn More
 * </Button>
 *
 * // Navigation link with trailing icon
 * <Button
 *   variant="secondary"
 *   href="#benefits"
 *   icon={<ArrowRight className="h-4 w-4" />}
 * >
 *   Explore Benefits
 * </Button>
 *
 * // Outline variant
 * <Button variant="outline" href="/about">
 *   About Us
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  children,
  icon,
  className,
  href,
  onClick,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  /** Merge base styles, variant styles, and any consumer className overrides */
  const combinedClasses = [baseStyles, variantStyles[variant], className]
    .filter(Boolean)
    .join(' ')

  /**
   * Shared inner content: text children followed by an optional trailing icon.
   *
   * The icon wrapper is marked `aria-hidden` because it is decorative when
   * accompanying visible text. When rendering an icon-only button (no text
   * children), consumers must provide the `ariaLabel` prop so screen readers
   * can announce the button's purpose.
   */
  const content = (
    <>
      {children}
      {icon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  )

  /* ------------------------------------------------------------------ */
  /* Navigational rendering — Next.js <Link> wrapping an anchor element */
  /* ------------------------------------------------------------------ */
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }

  /* ------------------------------------------------------------------ */
  /* Interactive rendering — native <button> element                    */
  /* ------------------------------------------------------------------ */
  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
