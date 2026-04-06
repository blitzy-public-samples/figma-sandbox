/**
 * FeatureCard Component
 *
 * A presentational card component used in the Benefits section grid.
 * Each card displays a lucide-react icon inside a circular container,
 * a bold title, and a description paragraph. The parent BenefitsSection
 * handles the grid layout (single column mobile, 2-column tablet,
 * 2×2 desktop).
 *
 * Icons are passed as component references via the `icon` prop
 * (React.ComponentType pattern), allowing the card to control
 * icon sizing and styling.
 *
 * @see src/components/sections/BenefitsSection.tsx
 * @see src/types/index.ts — FeatureCardData interface
 */

import type { FeatureCardData } from '@/types';

/**
 * Renders a single feature card with an icon, title, and description.
 *
 * @param props - Feature card data conforming to the FeatureCardData interface
 * @param props.icon - A React component reference for the card icon (e.g., TrendingUp, Eye)
 * @param props.title - The feature card heading text
 * @param props.description - The feature card body text
 * @returns A styled card element for use within the Benefits grid
 */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardData) {
  return (
    <div
      className="rounded-2xl border border-area-gray/20 bg-white p-5 shadow-sm
        transition-shadow duration-200 md:p-6 lg:p-8
        hover:shadow-md"
    >
      {/* Circular icon container with light sage background */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full
          bg-area-sage-light/30"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-area-olive" />
      </div>

      {/* Card title — uses h3 for semantic hierarchy (h1=page, h2=section, h3=card) */}
      <h3 className="mb-2 text-base font-bold text-area-black lg:text-lg">
        {title}
      </h3>

      {/* Card description — secondary text with relaxed line height */}
      <p className="text-sm leading-relaxed text-area-gray">
        {description}
      </p>
    </div>
  );
}
