import Link from 'next/link'

import { Button } from '@/components/ui'

/**
 * Custom 404 — Not Found Page
 *
 * Renders a user-friendly error page when visitors navigate to a route that
 * does not exist. Provides a prominent "Go Back Home" CTA button and a
 * secondary text link, both navigating to the homepage via client-side routing.
 *
 * This is a **server component** (no `'use client'` directive). The `Button`
 * child component handles its own client-side interactivity internally.
 *
 * All visual properties reference Tailwind theme tokens defined in
 * `globals.css` via the `@theme` directive — no hardcoded hex values.
 *
 * @see AAP §0.5.1 Group 8 — "Custom 404 page with navigation back to home"
 * @see AAP §0.7.1 — Colors from Tailwind theme tokens, pill-shaped buttons
 * @see AAP §0.7.2 — Mobile-first CSS, custom breakpoints at 800px and 1280px
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-area-cream px-4 text-center">
      {/* Large decorative 404 number — serif font matches site heading style */}
      <p className="font-serif text-8xl font-bold text-area-olive md:text-9xl">
        404
      </p>

      {/* Page heading — single h1 for this page */}
      <h1 className="mt-4 font-serif text-2xl font-bold text-area-black md:text-3xl">
        Page Not Found
      </h1>

      {/* Descriptive body text explaining the error */}
      <p className="mt-3 max-w-md text-base leading-relaxed text-area-gray">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or doesn&apos;t exist.
      </p>

      {/* Primary CTA — pill-shaped button with olive green background */}
      <div className="mt-8">
        <Button variant="primary" href="/">
          Go Back Home
        </Button>
      </div>

      {/* Secondary text link for additional navigation affordance */}
      <Link
        href="/"
        className="mt-4 text-sm text-area-gray underline transition-colors duration-200 hover:text-area-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-area-olive focus-visible:ring-offset-2"
      >
        Return to homepage
      </Link>
    </main>
  )
}
