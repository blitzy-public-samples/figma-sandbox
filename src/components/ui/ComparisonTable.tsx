import { Check, X } from 'lucide-react';
import type { ComparisonTableProps } from '@/types';

/**
 * Resolves the boolean support value for a given product from a feature row.
 *
 * Maps the product display name to its camelCase property key on the feature
 * object. Convention: first letter lowercased, remainder unchanged
 * (e.g., "Area" → "area", "WebSurge" → "webSurge", "HyperView" → "hyperView").
 *
 * Returns `false` as a safe fallback when the derived key does not exist on the
 * feature object or maps to the non-boolean `feature` property.
 */
function getProductSupport(
  feature: ComparisonTableProps['features'][number],
  product: string,
): boolean {
  const key = product.charAt(0).toLowerCase() + product.slice(1);

  /* Guard against accessing the `feature` string property or a nonexistent key */
  if (key in feature && key !== 'feature') {
    return Boolean(feature[key as keyof typeof feature]);
  }

  return false;
}

/* ==========================================================================
   ComparisonTable — Responsive Feature Comparison Table
   ==========================================================================

   Renders a feature comparison table with check marks (✓) and cross marks (✗)
   showing which features are supported by each product (Area vs competitors).
   The first product column is visually highlighted as the promoted product.

   Responsive behaviour
   ────────────────────
   • Mobile  (<800px)  — horizontally scrollable with minimum table width
   • Tablet  (≥800px)  — full table visible, no horizontal scroll
   • Desktop (≥1280px) — comfortable spacing with increased cell padding

   Accessibility
   ─────────────
   • Semantic <table> structure with <thead> / <tbody>
   • <th scope="col"> for column headers
   • <th scope="row"> for feature-name cells in the first column
   • Screen-reader-only labels for check / cross icon meaning

   @see src/components/sections/WhyChooseSection.tsx — parent consumer
   @see src/types/index.ts — ComparisonTableProps, ComparisonFeature
   ========================================================================== */

export function ComparisonTable({ features, products }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <table className="w-full min-w-[500px]">
        {/* ----------------------------------------------------------------
            Table Header — Product column names
            First column reads "Features"; subsequent columns are product names.
            The first product (promoted) receives a highlighted background.
            ---------------------------------------------------------------- */}
        <thead>
          <tr className="border-b border-area-gray/30">
            <th
              scope="col"
              className="px-4 py-3 text-start text-sm font-bold uppercase tracking-wide text-area-olive lg:px-6"
            >
              Features
            </th>

            {products.map((product, productIndex) => (
              <th
                key={product}
                scope="col"
                className={`px-4 py-3 text-center text-sm font-bold uppercase tracking-wide lg:px-6 ${
                  productIndex === 0
                    ? 'text-area-olive-dark bg-area-sage-light/20'
                    : 'text-area-olive'
                }`}
              >
                {product}
              </th>
            ))}
          </tr>
        </thead>

        {/* ----------------------------------------------------------------
            Table Body — Feature rows
            Each row shows the feature name followed by a check / cross icon
            per product column. Alternating row backgrounds improve scan-ability.
            ---------------------------------------------------------------- */}
        <tbody>
          {features.map((feature, rowIndex) => (
            <tr
              key={feature.feature}
              className={`border-b border-area-gray/10 ${
                rowIndex % 2 === 1 ? 'bg-area-cream/50' : ''
              }`}
            >
              {/* Feature name — first cell acts as a row header */}
              <th
                scope="row"
                className="px-4 py-3 text-start text-sm font-normal text-area-black lg:px-6"
              >
                {feature.feature}
              </th>

              {/* Product support indicators */}
              {products.map((product, productIndex) => {
                const isSupported = getProductSupport(feature, product);

                return (
                  <td
                    key={product}
                    className={`px-4 py-3 lg:px-6 ${
                      productIndex === 0 ? 'bg-area-sage-light/20' : ''
                    }`}
                  >
                    <div className="flex justify-center">
                      {isSupported ? (
                        <>
                          <Check
                            className="h-5 w-5 text-area-olive"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Supported</span>
                        </>
                      ) : (
                        <>
                          <X
                            className="h-5 w-5 text-area-gray"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Not supported</span>
                        </>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
