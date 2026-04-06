import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'

/* ---------------------------------------------------------------------------
   FONT CONFIGURATION
   ---------------------------------------------------------------------------
   Load two Google Fonts via next/font for automatic optimization and zero CLS:
   - DM Serif Display: Elegant serif display font for headings (h1–h6)
   - Inter: Clean, readable sans-serif for body text, labels, and UI elements

   Each font emits a CSS custom property (--font-serif / --font-sans) that the
   @theme block in globals.css references to wire up Tailwind's font-serif and
   font-sans utilities. The variables are applied on <html> so every descendant
   can inherit them.
   --------------------------------------------------------------------------- */

const serifFont = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
})

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

/* ---------------------------------------------------------------------------
   SEO & SOCIAL METADATA
   ---------------------------------------------------------------------------
   Static metadata export for the Area marketing landing page. Next.js App
   Router reads this at build time and injects the appropriate <head> tags.
   Covers search-engine indexing, Open Graph (Facebook/LinkedIn), Twitter
   Cards, and favicon configuration.

   Ref: AAP §0.1.1 — SEO considerations for a marketing landing page
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL('https://area.example.com'),
  title: 'Area — Browse Everything',
  description:
    'Area is a data analytics and browsing platform that helps you visualize, understand, and act on your data with powerful insights and seamless integration.',
  keywords: [
    'data analytics',
    'browsing platform',
    'data visualization',
    'business insights',
    'Area',
  ],
  authors: [{ name: 'Area' }],
  openGraph: {
    title: 'Area — Browse Everything',
    description:
      'Area is a data analytics and browsing platform that helps you visualize, understand, and act on your data with powerful insights and seamless integration.',
    type: 'website',
    url: 'https://area.example.com',
    images: [
      {
        url: '/images/hero-dashboard.webp',
        width: 1200,
        height: 630,
        alt: 'Area analytics dashboard',
      },
    ],
    siteName: 'Area',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area — Browse Everything',
    description:
      'Area is a data analytics and browsing platform that helps you visualize, understand, and act on your data with powerful insights and seamless integration.',
    images: ['/images/hero-dashboard.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

/* ---------------------------------------------------------------------------
   ROOT LAYOUT COMPONENT
   ---------------------------------------------------------------------------
   Application shell rendered around every page. Responsibilities:
   1. <html lang="en"> for language declaration (a11y + SEO)
   2. Font CSS variable classes on <html> for global font inheritance
   3. <body> defaults: cream background, sans-serif font, near-black text,
      and antialiased rendering — consistent across all page sections
   4. {children} slot for page content (page.tsx, not-found.tsx, etc.)

   This is a React Server Component — no 'use client' directive.
   --------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-area-cream font-sans text-area-black antialiased">
        {children}
      </body>
    </html>
  )
}
