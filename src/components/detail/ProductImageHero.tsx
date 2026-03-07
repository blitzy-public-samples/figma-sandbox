'use client';

import Image from 'next/image';

/**
 * ProductImageHero — Large product image area with gradient overlay.
 *
 * Renders the upper portion of the Detail page, displaying a centered product
 * image on a dark background (#242C3B) with a diagonal blue gradient overlay
 * (gradient-blue-overlay token at reduced opacity) to create depth.
 *
 * Figma reference: node 1:202 (product image) within node 1:180 (Detail screen)
 * in file 6FWdXDJV3foFfDfOhmkORj.
 *
 * Design tokens (from AAP Token Manifest §0.5.2):
 *   - Background  : #242C3B                                      (color-bg-primary)
 *   - Overlay     : linear-gradient(150deg, #37B6E9 1%, #4B4CED 91%) at ~30% opacity
 *                   (gradient-blue-overlay)
 *   - Image size  : 287.73 × 222.02 → 288 × 222 (rounded)
 *   - Container   : full width × 394px height (above bottom sheet at y:394)
 */

/* ------------------------------------------------------------------ */
/*  Props interface                                                    */
/* ------------------------------------------------------------------ */

/** Props accepted by the ProductImageHero component. */
export interface ProductImageHeroProps {
  /** Image source path relative to public/ (e.g., "/images/bike-peugeot-lr01.png"). */
  image: string;

  /** Product name used as accessible alt text for the image. */
  name: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * ProductImageHero — renders the product hero image area.
 *
 * The container spans the full device width (390px via parent frame) and
 * 394px in height. The product image is centered both horizontally and
 * vertically. A subtle diagonal blue gradient overlay sits behind the
 * image to add visual depth without overpowering the product photograph.
 *
 * The `priority` flag on the Next.js `<Image>` component ensures the hero
 * image is fetched eagerly since it is above the fold.
 */
export default function ProductImageHero({ image, name }: ProductImageHeroProps) {
  return (
    <div
      className="relative w-full h-[394px] flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* ── Diagonal blue gradient overlay ──────────────────────────
       * Implements gradient-blue-overlay at reduced opacity (~30%):
       *   linear-gradient(150deg, #37B6E9 1%, #4B4CED 91%)
       *
       * Using rgba() values rather than full-opacity hex + CSS opacity
       * avoids double-applying opacity to any children. The gradient
       * creates a subtle blue-to-purple tint across the dark background.
       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(150deg, rgba(55, 182, 233, 0.3) 1%, rgba(75, 76, 237, 0.3) 91%)',
        }}
      />

      {/* ── Product image ──────────────────────────────────────────
       * Figma node 1:202: 287.73 × 222.02 → rounded to 288 × 222.
       * Centered via the parent flex container. object-contain preserves
       * the product photograph's aspect ratio without cropping.
       * z-10 ensures the image renders above the gradient overlay.
       * priority flag signals above-the-fold content for eager loading.
       */}
      <Image
        src={image}
        alt={name}
        width={288}
        height={222}
        className="object-contain relative z-10"
        style={{ width: '288px', height: '222px' }}
        priority
        fetchPriority="high"
        loading="eager"
      />
    </div>
  );
}
