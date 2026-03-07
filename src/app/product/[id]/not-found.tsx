/**
 * Custom 404 — Product Not Found page for the `/product/[id]` route.
 *
 * Renders a dark-themed error message within the device frame when a user
 * navigates to a nonexistent product URL (e.g., `/product/nonexistent`).
 * Without this file, Next.js renders its default 404 page with black text
 * on a white background, which is invisible inside the dark DeviceFrame
 * (#242C3B).
 *
 * Layout:
 * - Dark background matching the app's primary surface color
 * - White text centered vertically and horizontally
 * - "Product Not Found" heading in Poppins 700 20px #FFFFFF
 * - Descriptive body text in Poppins 400 15px rgba(255,255,255,0.6)
 * - "Back to Home" link styled as a gradient button
 *
 * @module app/product/[id]/not-found
 */

import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-bg-primary px-8">
      {/* Error heading — matches text-page-title token: Poppins 700 20px #FFFFFF */}
      <h1 className="text-[20px] font-bold leading-[1.5em] text-white mb-3">
        Product Not Found
      </h1>

      {/* Descriptive text — matches text-body token: Poppins 400 15px rgba(255,255,255,0.6) */}
      <p className="text-[15px] font-normal leading-[1.5em] tracking-[-0.02em] text-white/60 text-center mb-8">
        The product you are looking for does not exist or has been removed.
      </p>

      {/* Back to Home link — styled as gradient button matching the primary CTA */}
      <Link
        href="/"
        className="inline-flex items-center justify-center w-[160px] h-[44px] rounded-button text-[15px] font-medium leading-[1.5em] tracking-[-0.02em] text-white bg-gradient-primary shadow-cta gradient-stroke-button"
      >
        Back to Home
      </Link>
    </div>
  );
}
