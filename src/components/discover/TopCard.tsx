import Image from 'next/image';

/**
 * TopCardProps — Props interface for the promotional banner card.
 *
 * @property discount - Promotional discount text displayed on the card.
 *                      Defaults to "30% Off".
 * @property image    - Path to the promotional product image relative to
 *                      the public/ directory. Defaults to the electric
 *                      bicycle promo image.
 */
interface TopCardProps {
  /** Promotional discount text, e.g. "30% Off" */
  discount?: string;
  /** Image path relative to public/, e.g. "/images/bike-electric-promo.png" */
  image?: string;
}

/**
 * TopCard — Promotional "30% Off" banner card for the Discover/Home page.
 *
 * Renders a large 350×240 dark-gradient card with:
 * - Gradient fill: linear-gradient(159deg, #353F54 27%, #222834 85%)
 * - 2px gradient stroke (white→black at 115deg) via pseudo-element wrapper
 * - Backdrop blur: blur(100px) for frosted glass depth effect
 * - Dual neumorphic box-shadow for floating appearance
 * - Electric bicycle product image (right/center area)
 * - "30% Off" promotional overlay text (lower-left area)
 *
 * Design Tokens (from AAP Token Manifest):
 * - gradient-card-dark: linear-gradient(159deg, #353F54 27%, #222834 85%)
 * - stroke-card-bold: linear-gradient(115deg, #FFF 8%, #000 77%) 2px
 * - radius-card: 20px
 * - blur-topcard: backdrop-filter: blur(100px)
 * - shadow-card: 0px 20px 60px rgba(16,20,28,1), 0px -20px 40px rgba(43,52,69,0.5)
 * - text-promo: Poppins / 700 / 26px / 1.5em
 * - color-text-muted: rgba(255,255,255,0.6)
 *
 * This is a Server Component — no client-side interactivity needed.
 * Consumed by src/app/page.tsx (Discover page).
 *
 * @param props - TopCardProps
 * @returns The promotional banner card JSX element
 */
export default function TopCard({
  discount = '30% Off',
  image = '/images/bike-electric-promo.png',
}: TopCardProps) {
  return (
    /* Outer wrapper — positions the card with 20px horizontal margin (mx-auto
       centers the 350px card within the 390px device frame, creating 20px
       margin on each side matching the space-page-x token). */
    <div className="relative mx-auto w-[350px] h-[240px]">
      {/*
        Card body — the main visible card surface.
        - bg-gradient-card-dark: gradient fill 159deg from #353F54 to #222834
        - blur-topcard: backdrop-filter blur(100px) with -webkit prefix
        - shadow-card: dual neumorphic box-shadow
        - gradient-stroke-card: 2px gradient stroke via ::before pseudo-element
          using mask-composite technique (per AAP Rule #2)
        - rounded-card: 20px border-radius from design token
        - overflow-hidden clips the product image to the card boundaries
      */}
      <div
        className="relative w-full h-full rounded-card overflow-hidden bg-gradient-card-dark blur-topcard shadow-card gradient-stroke-card"
      >
        {/*
          Card content container — uses relative positioning to stack the
          promotional image and text overlay. Full width/height of the card.
        */}
        <div className="relative w-full h-full">
          {/*
            Electric bicycle promotional image — positioned in the right/center
            area of the card. The raw image (2048×2048) has ~46% transparent
            padding around the bike content (content bbox: y=569–1670, x=0–2047).
            
            Using object-cover instead of object-contain to CROP the transparent
            padding and make the bike fill the card prominently. The container
            is positioned in the right ~85% of the card (left: 50px) and extends
            30px beyond the right edge (clipped by card's overflow-hidden), which
            biases the bike toward the right side.

            object-position '50% 55%' centers the vertical crop on the bike
            content (which sits at ~54% vertical center in the original image).

            Container: 330×240 → 1:1 image scales to 330×330 via object-cover,
            cropping 90px vertically. Bike fills ~74% of card height visually,
            creating the "prominently displayed" effect from the Figma design.
          */}
          <div
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: 50,
              right: -30,
            }}
          >
            <Image
              src={image}
              alt="Electric bicycle promotion"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 55%' }}
              sizes="350px"
              priority
              fetchPriority="high"
              loading="eager"
            />
          </div>

          {/*
            "30% Off" promotional text overlay — positioned in the lower-left
            area of the card with 20px padding from left and bottom edges.

            Typography: Poppins 700 (bold) 26px with 1.5em line-height
            Color: rgba(255,255,255,0.6) — semitransparent white that creates
            a subtle watermark/overlay effect, not primary content.

            The text is split across two lines ("30%" / "Off") using <br />
            to match the Figma layout where the text wraps naturally.

            z-10 ensures text sits above the image layer.
          */}
          <p
            className="absolute bottom-[20px] left-[20px] z-10 m-0 p-0 text-[26px] font-bold leading-[1.5em] tracking-normal text-text-muted"
          >
            {discount}
          </p>
        </div>
      </div>
    </div>
  );
}
