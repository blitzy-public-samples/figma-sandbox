/**
 * StatusBar — Decorative iOS-style status bar component.
 *
 * Renders a non-functional, purely visual iOS status bar at the top of each screen.
 * Displays a static "9:41" time on the left and decorative signal, WiFi, and battery
 * icons on the right, all in white on a transparent background.
 *
 * This component is used across all 3 screens (Discover, Detail, Shopping Bag) to
 * maintain visual fidelity with the Figma design (Component 1:7).
 *
 * Key design decisions:
 * - Uses system font stack for time display (SF Pro Text → system fallback)
 * - All icons are inline SVGs for reliability and theming via currentColor
 * - No interactivity — this is a Server Component with zero client-side JS
 * - No external dependencies — fully self-contained
 *
 * Figma reference: Node 1:7 (file key: 6FWdXDJV3foFfDfOhmkORj)
 * Instances: Discover (1:45), Detail (1:181), Cart (1:215)
 */

/**
 * CellularIcon — Inline SVG rendering 4 ascending signal bars.
 * Represents cellular signal strength in the iOS status bar.
 * Each bar increases in height from left to right.
 */
function CellularIcon() {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0" y="9" width="3" height="3" rx="0.5" fill="white" />
      <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="white" />
      <rect x="9" y="3" width="3" height="9" rx="0.5" fill="white" />
      <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="white" />
    </svg>
  );
}

/**
 * WiFiIcon — Inline SVG rendering a simplified WiFi signal icon.
 * Three concentric arcs representing WiFi signal strength,
 * with a bottom center dot as the connection point.
 */
function WiFiIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer arc */}
      <path
        d="M1.5 3.5C4.5 0.5 11.5 0.5 14.5 3.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Middle arc */}
      <path
        d="M4 6C6 4 10 4 12 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner arc */}
      <path
        d="M6.25 8.5C7.25 7.5 8.75 7.5 9.75 8.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="8" cy="11" r="1" fill="white" />
    </svg>
  );
}

/**
 * BatteryIcon — Inline SVG rendering a horizontal battery indicator.
 * Shows a nearly-full battery with a rounded rectangular body,
 * inner fill bar, and small terminal nub on the right side.
 */
function BatteryIcon() {
  return (
    <svg
      width="25"
      height="12"
      viewBox="0 0 25 12"
      fill="none"
      aria-hidden="true"
    >
      {/* Battery body outline */}
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2"
        stroke="white"
        strokeOpacity="0.4"
      />
      {/* Battery fill level (nearly full) */}
      <rect x="2" y="2" width="18" height="8" rx="1" fill="white" />
      {/* Battery terminal nub */}
      <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

/**
 * StatusBar — Main decorative iOS status bar component.
 *
 * Renders a full-width horizontal bar with:
 * - Left: "9:41" time in SF Pro Text (system font) 600 weight, 15px, white
 * - Right: Cellular signal, WiFi, and Battery SVG icons in white
 *
 * The bar is transparent, letting the dark #242C3B screen background show through.
 * Height is approximately 44px (standard iOS status bar).
 * Horizontal padding is 20px to align with page content (space-page-x token).
 */
export default function StatusBar() {
  return (
    <div
      className="flex w-full items-center justify-between"
      style={{ padding: "12px 20px", height: "44px" }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Time display — left side */}
      <span
        className="text-[15px] font-semibold text-white leading-none"
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        }}
      >
        9:41
      </span>

      {/* Status icons — right side */}
      <div className="flex items-center" style={{ gap: "6px" }}>
        <CellularIcon />
        <WiFiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
