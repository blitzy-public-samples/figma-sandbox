import React from "react";

/**
 * DeviceFrameProps — Props interface for the DeviceFrame component.
 *
 * @property children - All page content to render inside the simulated device viewport
 */
interface DeviceFrameProps {
  children: React.ReactNode;
}

/**
 * DeviceFrame — Outermost wrapper that simulates an iPhone 14/15 device viewport.
 *
 * Renders a 390×844px container with:
 * - Dark navy background (#242C3B) matching the Figma color-bg-primary token
 * - 50px border-radius for the smartphone appearance (radius-device token)
 * - Blue-tinted drop shadow for depth (shadow-screen token)
 * - Overflow hidden to clip all child content to rounded corners
 * - Centered on the page with a contrasting darker background
 *
 * Used as the outermost wrapper in src/app/layout.tsx.
 * This is a Server Component — no client-side interactivity needed.
 */
export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-4">
      <div
        className="w-[390px] h-[844px] bg-[#242C3B] rounded-[50px] overflow-hidden relative"
        style={{ boxShadow: "0px 30px 100px rgba(82, 108, 143, 1)" }}
      >
        {children}
      </div>
    </div>
  );
}
