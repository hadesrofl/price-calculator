/**
 * Discounts for distribution channels or others.
 * Given as percentage value and calculated as variable costs per unit based on the price per unit.
 */
export type Discount = {
  inPercent: number;
  costPerUnit: number;
};

/**
 * Creates an empty but initialized discount object
 * @returns an empty discount object
 */
export function createEmptyDiscount(): Discount {
  return { inPercent: 0, costPerUnit: 0 };
}

/**
 * Calculates and sets the cost per unit of the discount
 * @param {number} pricePerUnit Is the price of each sales unit
 * @param {number} discountInPercent Is the discount in percent
 * @returns the cost of each sales unit because of the granted discount
 */
export function calculateCostPerUnit(
  pricePerUnit: number,
  discountInPercent: number
) {
  return pricePerUnit > 0 ? (pricePerUnit * discountInPercent) / 100 : 0;
}
