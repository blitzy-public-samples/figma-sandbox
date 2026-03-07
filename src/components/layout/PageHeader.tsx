'use client';

import BackButton from '@/components/layout/BackButton';

/**
 * PageHeaderProps — Props interface for the PageHeader component.
 *
 * @property title — The heading text displayed in the navigation bar
 * @property showSearch — When true, renders search mode layout (Discover screen)
 * @property showBack — When true, renders back mode layout (Detail/Cart screens)
 * @property onBack — Optional callback for the back button; defaults to router.back()
 * @property onSearch — Optional callback for the search button tap
 */
interface PageHeaderProps {
  title: string;
  showSearch?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
}

/**
 * PageHeader — Shared top navigation bar component used across all 3 screens.
 *
 * Two distinct visual modes driven by props:
 *
 * 1. **Search mode** (`showSearch=true`): Used on the Discover/Home screen.
 *    Renders the title on the left and a 44×44 gradient search button on the
 *    right. Layout uses `justify-content: space-between` with 20px horizontal
 *    padding matching the Figma specification (node 1:46).
 *
 * 2. **Back mode** (default / `showBack=true`): Used on the Detail and Cart
 *    screens. Renders the BackButton component on the left and the dynamic
 *    title on the right with a 56px gap between them (nodes 1:210, 1:303).
 *
 * Design Tokens (from AAP Token Manifest):
 * - text-page-title: Poppins / 700 / 20px / 1.5em
 * - gradient-primary-button: linear-gradient(142deg, #34C8E8 0%, #4E4AF2 100%)
 * - stroke-button: linear-gradient(135deg, #FFF 0%, #000 100%) 1px
 * - shadow-button: 0px 20px 30px rgba(16,20,28,1), 0px -20px 30px rgba(43,52,69,0.5)
 * - radius-button: 10px
 * - space-page-x: 20px
 * - color-text-white: #FFFFFF
 */
export default function PageHeader({
  title,
  showSearch,
  onBack,
  onSearch,
}: PageHeaderProps) {
  /* ----------------------------------------------------------------
     SEARCH MODE — Discover screen (Figma node 1:46)
     Row layout: title left + 44×44 gradient search button right
     ---------------------------------------------------------------- */
  if (showSearch) {
    return (
      <header className="flex w-full items-center justify-between px-[20px]">
        {/* Page title — left aligned, takes remaining space */}
        <h1 className="text-[20px] font-bold leading-[1.5em] text-white">
          {title}
        </h1>

        {/* Search button — 44×44 gradient button with gradient stroke.
            Uses ::before pseudo-element via gradient-stroke-button utility
            for gradient border (CSS border-image is incompatible with
            border-radius). Design system classes applied:
            - bg-gradient-primary: blue-to-purple gradient fill
            - shadow-button: neumorphic dual-direction shadow
            - gradient-stroke-button: ::before pseudo-element 1px gradient stroke */}
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search"
            className="relative flex h-[44px] w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-none bg-gradient-primary shadow-button gradient-stroke-button outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {/* Magnifying glass search icon — inline SVG matching
                src/assets/icons/search-icon.svg (Figma node 1:48).
                Uses explicit white stroke for visibility on the
                gradient background. Sized at 20×20px, proportional
                to the 44×44 button container. */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
      </header>
    );
  }

  /* ----------------------------------------------------------------
     BACK MODE — Detail & Cart screens (Figma nodes 1:210, 1:303)
     Row layout: BackButton left + title right, gap 56px
     Default when neither showSearch nor showBack is specified.
     ---------------------------------------------------------------- */
  return (
    <header className="flex w-full items-center gap-[56px] px-[20px]">
      {/* Gradient back button — 44×44, handles its own click logic
          via useRouter.back() or the provided onBack callback */}
      <BackButton onClick={onBack} />

      {/* Page title — dynamically set per page
          Detail: "PEUGEOT - LR01" (dynamic per product)
          Cart: "My Shopping Cart" (static) */}
      <h1 className="text-[20px] font-bold leading-[1.5em] text-white">
        {title}
      </h1>
    </header>
  );
}
