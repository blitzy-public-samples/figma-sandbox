'use client';

import type { ReactNode } from 'react';

/**
 * BottomSheet — Sliding bottom sheet container for the Product Detail page.
 *
 * Renders a gradient-filled container with rounded top corners, an upward
 * box-shadow for depth, and a subtle gradient top-edge stroke highlight
 * (white → transparent) that produces the neumorphic raised-edge effect.
 *
 * Children (TabToggle, ProductDescription, etc.) are rendered inside a
 * vertical flex column with consistent spacing. This component is a pure
 * layout wrapper — all interactive logic lives in its children.
 *
 * Figma reference: node 1:184 (Bottom Sheet) in file 6FWdXDJV3foFfDfOhmkORj
 *
 * Design tokens (from AAP Token Manifest §0.5.2):
 *   - Background : linear-gradient(145deg, #353F54 0%, #222834 61%)  (gradient-sheet)
 *   - Radius     : 30px top-left + top-right only                   (radius-sheet)
 *   - Shadow     : 0px -20px 60px rgba(0,0,0,0.25)                  (shadow-sheet)
 *   - Stroke     : linear-gradient(181deg, #FFF 0%, transparent 14%) 2px (stroke-sheet-top)
 *   - Height     : 450px
 *   - Width      : full (390px device frame)
 */

/* ------------------------------------------------------------------ */
/*  Props interface                                                    */
/* ------------------------------------------------------------------ */

/** Props accepted by the BottomSheet component. */
export interface BottomSheetProps {
  /** Content rendered inside the sheet (TabToggle, ProductDescription, etc.). */
  children: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * BottomSheet — gradient container with neumorphic top-edge highlight.
 *
 * Positioned by the parent Detail page layout; this component renders
 * at full device width (390px) with a fixed 450px height. The top corners
 * are rounded at 30px while the bottom corners extend to the screen edge.
 */
export default function BottomSheet({ children }: BottomSheetProps) {
  return (
    <section
      className="relative w-full h-[450px] rounded-t-[30px] pt-6 overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #353F54 0%, #222834 61%)',
        boxShadow: '0px -20px 60px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* ── Top-edge gradient stroke highlight ────────────────────
       * Implements stroke-sheet-top:
       *   linear-gradient(181deg, #FFF 0%, transparent 14%) at 2px height.
       *
       * Direction 181deg is nearly straight down, so the white highlight
       * appears only at the very top edge and fades within the first 14%
       * of the stroke height. Since CSS border-image does not work with
       * border-radius, this is implemented as an absolutely positioned
       * overlay div.
       */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            'linear-gradient(181deg, rgba(255, 255, 255, 0.5) 0%, transparent 14%)',
        }}
      />

      {/* ── Sheet content ────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </section>
  );
}
