/**
 * SectionLabel — Small Uppercase Section Label Component
 *
 * A minimal, atomic presentational component that renders a small,
 * uppercase, wide-tracked label above section headings throughout the
 * Area marketing landing page. Used in BenefitsSection, BigPictureSection,
 * WhyChooseSection, and other sections to introduce content groups.
 *
 * Typography follows the Figma "Label" style:
 *   - Extra-small sans-serif font size
 *   - Medium font weight
 *   - Uppercase text transform
 *   - Wide letter spacing
 *   - Sage/olive theme color
 *
 * @example
 * ```tsx
 * <SectionLabel text="Benefits" />
 * <SectionLabel text="More" className="mb-4" />
 * ```
 *
 * @see src/types/index.ts — SectionLabelProps interface
 * @module components/ui/SectionLabel
 */

import type { SectionLabelProps } from '@/types';

/**
 * Renders a small uppercase section label as an inline `<span>`.
 *
 * The component is purely presentational — it receives display text via
 * the `text` prop and applies the design-system label typography. An
 * optional `className` prop allows consumers to extend base styles
 * (e.g., adding margin or alignment) without breaking the default styling.
 *
 * @param props - {@link SectionLabelProps}
 * @returns A styled `<span>` element with the label text
 */
export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <span
      className={`text-xs font-medium uppercase tracking-widest text-area-sage${
        className ? ` ${className}` : ''
      }`}
    >
      {text}
    </span>
  );
}
