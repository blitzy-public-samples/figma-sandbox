/**
 * Core TypeScript type definitions for the Online Bike Shopping App.
 *
 * This file defines all shared interfaces used across stores, components,
 * and pages. It is the foundational type system file with zero dependencies.
 *
 * @module types/product
 */

/**
 * Represents a product available in the bike shop catalog.
 *
 * Used by the Discover page product grid, Detail page product display,
 * and as the embedded product reference within CartItem.
 */
export interface Product {
  /**
   * Unique product identifier used for routing and lookups.
   * @example "peugeot-lr01"
   */
  id: string;

  /**
   * Display name shown on product cards and detail pages.
   * @example "PEUGEOT - LR01"
   */
  name: string;

  /**
   * Optional display name override used specifically on the Shopping Bag
   * (cart) screen. When present, the cart renders this value instead of
   * `name`. This accounts for minor Figma text variations between screens
   * (e.g., "PEUGEOT- LR01" on the cart vs "PEUGEOT - LR01" elsewhere).
   */
  cartName?: string;

  /**
   * Category label describing the product type.
   * @example "Road Bike", "Mountain Bike", "Road Helmet"
   */
  category: string;

  /**
   * Product price as a numeric value for cart calculations
   * (subtotal, discount, total). NOT a formatted string.
   * @example 1999.99
   */
  price: number;

  /**
   * Image path relative to the public/ directory, used with
   * Next.js Image component for optimized rendering.
   * @example "/images/bike-peugeot-lr01.png"
   */
  image: string;

  /**
   * Product description text displayed on the Detail page
   * within the bottom sheet Description tab.
   * @example "The PEUGEOT LR01 is a lightweight road bike..."
   */
  description: string;
}

/**
 * Represents an item in the shopping cart, pairing a full Product
 * object with its selected quantity.
 *
 * Used by the Cart page for rendering cart items, computing subtotals,
 * and managing quantity adjustments via the QuantityStepper component.
 */
export interface CartItem {
  /**
   * Reference to the full Product object (NOT just an ID).
   * Embeds all product data needed for display and price calculations.
   */
  product: Product;

  /**
   * Quantity of this product in the cart. Minimum value is 1.
   * Updated via increment/decrement controls on the Cart page.
   * @example 1
   */
  quantity: number;
}

/**
 * Represents a product category used in the Discover page
 * horizontal filter row.
 *
 * Used by the CategoryFilter and CategoryItem components to render
 * category icon buttons with active/inactive visual states.
 */
export interface Category {
  /**
   * Category identifier used for filtering logic.
   * @example "all", "electric", "road", "mountain", "accessory"
   */
  id: string;

  /**
   * Display name shown in the UI beneath or beside the category icon.
   * @example "All", "Electric", "Road", "Mountain", "Accessory"
   */
  name: string;

  /**
   * Icon identifier that maps to an SVG file in src/assets/icons/.
   * The identifier is used to resolve the corresponding SVG asset.
   * @example "category-all" maps to category-all.svg
   */
  icon: string;
}
