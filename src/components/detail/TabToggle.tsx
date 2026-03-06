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
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.toLowerCase()}`}
            onClick={() => onTabChange(tab.toLowerCase())}
            className="flex-1 rounded-[10px] cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3CA4EB] motion-safe:transition-[background-color,box-shadow] motion-safe:duration-200 motion-safe:ease-out"
            style={{
              /* ---- Background ---- */
              backgroundColor: isActive ? '#323B4F' : '#28303F',

              /* ---- Neumorphic shadow ---- */
              boxShadow: isActive
                ? '4px 4px 10px rgba(37,43,57,1), -4px -4px 10px rgba(56,68,90,1)'
                : 'inset 4px 4px 8px rgba(32,38,51,1), inset -4px -4px 8px rgba(54,64,85,1)',

              /* ---- Padding ---- */
              padding: '12px 24px',
            }}
          >
            {/* Text span — gradient for active, flat color for inactive */}
            <span
              style={
                isActive
                  ? {
                      /* PRIMARY visual indicator: gradient text */
                      background:
                        'linear-gradient(90deg, #3CA4EB 0%, #4286EE 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      /* Typography: Poppins 700 15px */
                      fontSize: '15px',
                      fontWeight: 700,
                      lineHeight: '1.5em',
                      letterSpacing: '-0.02em',
                    }
                  : {
                      /* Flat muted white for inactive */
                      color: 'rgba(255, 255, 255, 0.6)',
                      /* Typography: Poppins 400 15px */
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '1.5em',
                      letterSpacing: '-0.02em',
                    }
              }
            >
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
