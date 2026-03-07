'use client';

/**
 * TabToggle — Neumorphic two-tab toggle for the Detail page bottom sheet.
 *
 * Renders a row of tab buttons with neumorphic styling:
 * - Active tab: raised (outset shadow), gradient text, bold weight
 * - Inactive tab: recessed (inset shadow), muted text, regular weight
 *
 * Figma reference: node 1:186 (Categories Tabs within Bottom Sheet)
 */

/* ------------------------------------------------------------------ */
/*  Props Interface                                                    */
/* ------------------------------------------------------------------ */

export interface TabToggleProps {
  /** Currently active tab value (lowercased, e.g. "description") */
  activeTab: string;
  /** Callback fired when a tab is clicked — receives the lowercased tab label */
  onTabChange: (tab: string) => void;
  /** Ordered array of tab labels (e.g. ["Description", "Specification"]) */
  tabs: string[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TabToggle({
  activeTab,
  onTabChange,
  tabs,
}: TabToggleProps) {
  return (
    <div
      className="flex items-center gap-2.5 px-5"
      role="tablist"
      aria-label="Content tabs"
    >
      {tabs.map((tab) => {
        const isActive = activeTab.toLowerCase() === tab.toLowerCase();

        return (
          /* Tab button:
           * - Active: bg-tab-active (#323B4F) + shadow-neumorphic-outset (raised)
           * - Inactive: bg-tab-inactive (#28303F) + shadow-neumorphic-inset (recessed)
           * - rounded-button: 10px radius from design token
           * Padding: py-3 px-6 = 12px 24px
           */
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.toLowerCase()}`}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`flex-1 rounded-button cursor-pointer border-none py-3 px-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CA4EB] motion-safe:transition-[background-color,box-shadow] motion-safe:duration-200 motion-safe:ease-out ${
              isActive
                ? 'bg-tab-active shadow-neumorphic-outset'
                : 'bg-tab-inactive shadow-neumorphic-inset'
            }`}
          >
            {/* Text span — gradient for active, flat color for inactive
             * Active: text-gradient-tab applies background-clip:text technique
             *   with var(--gradient-tab-text) = linear-gradient(90deg, #3CA4EB → #4286EE)
             * Inactive: text-text-muted = rgba(255,255,255,0.6)
             * Typography: 15px, -2% letter-spacing, 1.5em line-height
             */}
            <span
              className={`text-[15px] leading-[1.5em] tracking-[-0.02em] ${
                isActive
                  ? 'font-bold text-gradient-tab'
                  : 'font-normal text-text-muted'
              }`}
            >
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
