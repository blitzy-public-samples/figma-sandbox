import Image from 'next/image'

/**
 * Gallery image data for the Photo Gallery section.
 *
 * Defined locally because the `SiteContent` type does not include
 * gallery image data — these images are static showcase photographs
 * illustrating the Area platform's global reach and aesthetic.
 *
 * Each entry maps to a WebP asset under `public/images/`.
 */
const galleryImages = [
  {
    src: '/images/gallery-1.webp',
    alt: 'Scenic landscape view showcasing Area data coverage',
  },
  {
    src: '/images/gallery-2.webp',
    alt: 'Urban cityscape representing global business presence',
  },
  {
    src: '/images/gallery-3.webp',
    alt: 'Mountain landscape illustrating the big picture perspective',
  },
] as const

/**
 * PhotoGallery — Full-width responsive image gallery section.
 *
 * Displays three landscape photographs in a responsive CSS Grid layout:
 * - **Mobile** (&lt;800 px): single-column stack
 * - **Tablet** (800–1279 px): two-column grid
 * - **Desktop** (≥1280 px): three-column grid
 *
 * All images use the Next.js `<Image>` component for automatic format
 * optimisation, responsive sizing, lazy loading, and CLS prevention.
 *
 * Hover behaviour: a subtle 5 % scale-up transition is applied to each
 * image on pointer hover, contained by an `overflow-hidden` wrapper so
 * the zoom does not break the card boundaries.
 *
 * @see AAP §0.5.1 Group 5 — Photo Gallery specification
 * @see AAP §0.5.3 Responsive Layout — breakpoint behaviour
 */
export function PhotoGallery() {
  return (
    <section aria-label="Photo gallery" className="py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-72 lg:h-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
