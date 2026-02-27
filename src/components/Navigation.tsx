import { NavLink } from 'react-router'

/**
 * Navigation component providing client-side links between the 3 screen routes.
 *
 * Uses React Router v7's NavLink with built-in active state detection to
 * highlight the current route. Styled exclusively with Tailwind CSS utility
 * classes. Intended to be embedded in the Layout component's header section.
 *
 * Routes:
 *  - `/`          → Screen 1 (home)
 *  - `/screen-2`  → Screen 2
 *  - `/screen-3`  → Screen 3
 */

/** Shared Tailwind classes applied to every nav link regardless of state. */
const baseLinkClasses =
  'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md'

/** Additional classes applied when a nav link's route is active. */
const activeLinkClasses =
  'text-blue-600 font-semibold bg-blue-50 border-b-2 border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'

/** Additional classes applied when a nav link's route is not active. */
const inactiveLinkClasses =
  'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none'

/**
 * Returns the composed className string for a NavLink based on its active state.
 *
 * @param isActive - Boolean provided by React Router's NavLink render callback.
 * @returns Tailwind CSS class string combining base + active/inactive variants.
 */
function getLinkClassName({ isActive }: { isActive: boolean }): string {
  return `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
}

/** Route definitions consumed by the navigation links. */
const navItems: ReadonlyArray<{ to: string; label: string }> = [
  { to: '/', label: 'Screen 1' },
  { to: '/screen-2', label: 'Screen 2' },
  { to: '/screen-3', label: 'Screen 3' },
]

/**
 * Shared navigation bar rendered on every page via the Layout component.
 *
 * Renders an accessible `<nav>` landmark containing NavLink elements for each
 * screen route. Active links receive distinct visual styling (color, weight,
 * background, underline) to satisfy accessibility requirements — the active
 * state does not rely solely on color.
 */
function Navigation() {
  return (
    <nav
      className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200"
      aria-label="Main navigation"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={getLinkClassName}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navigation
