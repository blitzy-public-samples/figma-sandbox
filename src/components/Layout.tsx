import type { ReactNode } from 'react'

import Navigation from './Navigation'

/**
 * Props for the Layout component.
 *
 * @property children - Page content injected by React Router route elements.
 *   Typed as ReactNode to accept any valid renderable React content including
 *   elements, strings, fragments, portals, and null.
 */
interface LayoutProps {
  children: ReactNode
}

/**
 * Shared layout wrapper providing consistent page structure across all routes.
 *
 * Renders a full-viewport-height flex column with three semantic regions:
 *  1. `<header>` — Contains the Navigation component with links to all screens.
 *  2. `<main>`   — Stretches to fill remaining vertical space; receives route content via `children`.
 *  3. `<footer>` — Persistent footer at the page bottom with copyright/branding.
 *
 * This component is consumed by App.tsx to wrap all `<Routes>` content,
 * ensuring every page shares the same navigation header and footer.
 *
 * @param props - Component props containing children to render in the main area.
 * @returns The full-page layout shell with header, main content, and footer.
 */
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="shrink-0">
        <Navigation />
      </header>

      <main className="flex-1">{children}</main>

      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Figma Sandbox</p>
      </footer>
    </div>
  )
}

export default Layout
