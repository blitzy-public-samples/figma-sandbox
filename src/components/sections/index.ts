/**
 * Barrel Export — Section Components
 *
 * Re-exports all page section components from the src/components/sections/ directory
 * for clean import paths: import { HeroSection, BenefitsSection } from '@/components/sections'
 *
 * Sections are listed in visual order (top to bottom) as they appear on the landing page.
 *
 * @see AAP §0.5.1 Group 5 — "Barrel export file for all section components"
 * @see AAP §0.7.3 — "Every component directory must include an index.ts barrel export"
 * @module components/sections
 */

export { HeroSection } from './HeroSection';
export { TrustedBySection } from './TrustedBySection';
export { BenefitsSection } from './BenefitsSection';
export { PhotoGallery } from './PhotoGallery';
export { BigPictureSection } from './BigPictureSection';
export { WhyChooseSection } from './WhyChooseSection';
export { TestimonialSection } from './TestimonialSection';
export { MapSuccessSection } from './MapSuccessSection';
export { ConnectSection } from './ConnectSection';
