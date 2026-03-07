'use client';

/**
 * TabBar — Bottom tab navigation bar for the Discover/Home screen.
 *
 * Renders 5 tab icons (Home, Map, Cart, Profile, Bookmark) in a horizontal
 * row at the bottom of the device frame. The active tab displays a
 * gradient-filled square background (#34C8E8 → #4E4AF2) with a white icon,
 * while inactive tabs show muted icons (rgba(255,255,255,0.4)).
 *
 * Features:
 * - Route-based active tab detection via usePathname()
 * - Cart badge indicator via useCartStore items count
 * - Next.js Link-based navigation for / and /cart routes
 * - Inline SVG icons matching the Figma IMAGE-SVG composite (node 1:150)
 *
 * Figma Specification:
 * - Node: 1:150 (IMAGE-SVG composite, 390×103.5)
 * - Position: absolute bottom of the 390×844 device frame (y:741)
 * - Active state: gradient bg square (gradient-primary-button), radius 10px
 * - Inactive state: muted white icon only, no background
 *
 * @module components/layout/TabBar
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';

/* ────────────────────────────────────────────────────────────
   PROPS INTERFACE
   ──────────────────────────────────────────────────────────── */

/**
 * TabBarProps — Configuration for the TabBar component.
 *
 * @property activeTab - Index (0-4) of the active tab; defaults to auto-detection via URL
 * @property onTabChange - Optional callback fired when a tab is tapped
 */
interface TabBarProps {
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

/* ────────────────────────────────────────────────────────────
   INLINE SVG ICON COMPONENTS
   Each icon uses viewBox 0 0 24 24, stroke currentColor,
   fill none, strokeWidth 1.5–2 for consistent visual weight.
   ──────────────────────────────────────────────────────────── */

/**
 * HomeIcon — Bicycle silhouette representing the Home/Discover tab.
 * Two wheels with frame, handlebars, and seat for a recognizable bicycle.
 */
function HomeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left wheel */}
      <circle cx="7" cy="17" r="3.5" />
      {/* Right wheel */}
      <circle cx="17" cy="17" r="3.5" />
      {/* Frame - bottom triangle */}
      <path d="M7 17L12 7L17 17" />
      {/* Frame - seat tube */}
      <path d="M12 7L10 17" />
      {/* Handlebars */}
      <path d="M12 7L16 10" />
      {/* Seat */}
      <path d="M10.5 6.5L13.5 6.5" />
    </svg>
  );
}

/**
 * MapIcon — Location/map pin icon representing the Map tab.
 * A pin shape with inner circle for classic map marker appearance.
 */
function MapIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21C12 21 19 14.5 19 9.5C19 5.36 15.87 2 12 2C8.13 2 5 5.36 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

/**
 * CartIcon — Shopping cart icon representing the Cart/Shopping Bag tab.
 * Simple cart body with handle and two small wheels.
 */
function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" />
      <path d="M3 6H21" />
      <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" />
    </svg>
  );
}

/**
 * ProfileIcon — Person/user silhouette icon representing the Profile tab.
 * Head circle with body curve for standard user profile appearance.
 */
function ProfileIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * BookmarkIcon — Bookmark/document icon representing the Bookmark tab.
 * Simple bookmark flag shape with bottom chevron.
 */
function BookmarkIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   TAB DATA DEFINITIONS
   ──────────────────────────────────────────────────────────── */

/**
 * Tab item definition used for rendering and navigation.
 */
interface TabItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  /** Route pathname pattern used for active detection */
  matchPath: string;
}

/**
 * Static tab configuration array.
 * Only "/" and "/cart" are functional routes per AAP scope.
 * Map, Profile, and Bookmark use "#" as placeholder hrefs.
 */
const TABS: TabItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon, matchPath: '/' },
  { name: 'Map', href: '#', icon: MapIcon, matchPath: '/map' },
  { name: 'Cart', href: '/cart', icon: CartIcon, matchPath: '/cart' },
  { name: 'Profile', href: '#', icon: ProfileIcon, matchPath: '/profile' },
  { name: 'Bookmark', href: '#', icon: BookmarkIcon, matchPath: '/bookmarks' },
];

/* ────────────────────────────────────────────────────────────
   TABBAR COMPONENT
   ──────────────────────────────────────────────────────────── */

/**
 * TabBar — Bottom navigation bar rendering 5 tab icons.
 *
 * Positioned absolutely at the bottom of the device frame (390×844).
 * Auto-detects active tab from the current route via usePathname(),
 * or accepts an explicit activeTab prop override.
 *
 * Active tab: gradient background square + white icon
 * Inactive tabs: muted white icons, no background
 *
 * @param props.activeTab - Optional explicit active tab index (0-4)
 * @param props.onTabChange - Optional callback when a tab is tapped
 */
export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);

  /* Rehydrate Zustand persisted state on mount (SSR-safe) */
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  /**
   * Determine which tab index is active.
   * Priority: explicit activeTab prop > route-based auto-detection.
   * Defaults to 0 (Home) if no match is found.
   */
  const resolvedActiveTab =
    activeTab !== undefined
      ? activeTab
      : pathname === '/cart'
        ? 2
        : pathname === '/' || pathname === ''
          ? 0
          : 0;

  /** Cart item count for badge display */
  const cartCount = cartItems.length;

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 flex h-[103px] items-center justify-around pb-[24px] pt-[16px]"
      aria-label="Main navigation"
    >
      {TABS.map((tab, index) => {
        const isActive = resolvedActiveTab === index;
        const IconComponent = tab.icon;
        const isCartTab = index === 2;

        /**
         * Shared inner content for both linked and non-linked tabs.
         * Contains the gradient background (active state), icon, and
         * optional cart badge. This is NOT a focusable element — the
         * outer Link or button handles focus and interaction.
         */
        const tabInner = (
          <>
            {/* Active tab: gradient background square with glow shadow */}
            {isActive && (
              <span
                className="absolute inset-0 rounded-[10px] bg-gradient-primary shadow-[0px_4px_12px_rgba(52,200,232,0.3)]"
                aria-hidden="true"
              />
            )}

            {/* Icon container — active: white, inactive: muted white */}
            <span
              className={`relative z-10 flex items-center justify-center transition-colors duration-200 ease-out ${
                isActive ? 'text-white' : 'text-white/40'
              }`}
            >
              <IconComponent />
            </span>

            {/* Cart badge: displayed when cart has items and this is the cart tab */}
            {isCartTab && cartCount > 0 && (
              <span
                className="absolute top-[-2px] right-[-2px] z-20 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-primary text-[9px] font-bold leading-none text-white"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </>
        );

        /* Functional routes (Home, Cart): use a single <Link> element —
         * no nested <button> to avoid duplicate focusable elements.
         * The <Link> renders as <a>, which is the sole tab stop. */
        if (tab.href !== '#') {
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className="relative flex h-[44px] w-[44px] cursor-pointer flex-col items-center justify-center no-underline"
              aria-label={tab.name}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onTabChange?.(index)}
            >
              {tabInner}
            </Link>
          );
        }

        /* Placeholder routes (Map, Profile, Bookmark): use a single <button>
         * wrapped in a non-focusable <div> — one tab stop per item. */
        return (
          <div
            key={tab.name}
            className="flex items-center justify-center"
          >
            <button
              type="button"
              className="relative flex h-[44px] w-[44px] cursor-pointer flex-col items-center justify-center"
              onClick={() => onTabChange?.(index)}
              aria-label={tab.name}
              aria-current={isActive ? 'page' : undefined}
            >
              {tabInner}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
