import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import DeviceFrame from '@/components/layout/DeviceFrame';

/**
 * Poppins — Primary font family for the entire application.
 *
 * Loaded via next/font/google for self-hosting and optimal performance.
 * Exposed as CSS custom property --font-poppins for Tailwind CSS consumption.
 *
 * Weights loaded:
 * - 400 (Regular): Body text, prices, descriptions
 * - 500 (Medium): Button text, small labels, checkout text
 * - 600 (SemiBold): Quantity stepper count text
 * - 700 (Bold): Headings, product names, titles
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

/**
 * Page metadata consumed by Next.js 15 App Router for HTML <head> generation.
 * Applied to all routes: /, /product/[id], /cart
 */
export const metadata: Metadata = {
  title: 'Online Bike Shopping App',
  description: 'Discover, explore, and shop for premium bikes and accessories',
};

/**
 * Viewport configuration for mobile optimization.
 * Exported separately from metadata per Next.js 15 convention.
 *
 * - width: device-width — adapts to the device screen width
 * - initialScale: 1 — no zoom on load
 * - maximumScale: 1 — prevents pinch-to-zoom (native app feel)
 * - userScalable: false — disables user scaling (fixed mobile layout)
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * RootLayout — Root layout component for the Next.js 15 App Router.
 *
 * This is a Server Component (no 'use client' directive). It:
 * 1. Loads the Poppins font and applies it as a CSS variable to the document
 * 2. Imports global CSS with Tailwind v4 tokens, gradients, and neumorphic utilities
 * 3. Wraps all page content in the DeviceFrame (390×844 iPhone viewport)
 * 4. Centers the device frame on the page with a dark background
 *
 * All three routes (/, /product/[id], /cart) render inside this layout.
 * No providers are needed — Zustand stores are accessed directly via hooks,
 * and only the dark theme exists (no theme switching).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-[#242C3B] min-h-screen flex items-center justify-center antialiased">
        <DeviceFrame>
          {children}
        </DeviceFrame>
      </body>
    </html>
  );
}
