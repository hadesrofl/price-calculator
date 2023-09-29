import { Costs, calculateTotalCosts, createEmptyCosts } from "./Costs";

/**
 * The definition of sales which contain the calculation of costs, sales volumes and pricing
 */
export type Sales = {
  costs: Costs;
  costPrice: number;
  pricePerUnit: number;
  breakEven: number;
  volume: number;
  revenue: number;
  unitContributionMargin: number;
  profit: number;
  currency: string;
};

/**
 * Builder function to create an empty {@link Sales} entity
 * @param {string} currency Is the currency as string
 * @returns an empty {@link Sales} entity
 */
export function createEmptySales(currency: string) {
  return {
    costs: createEmptyCosts(),
    costPrice: 0,
    pricePerUnit: 0,
    breakEven: 0,
    volume: 0,
    revenue: 0,
    unitContributionMargin: 0,
    profit: 0,
    currency,
  };
}

/**
 * Calculates the derived values based on sales volume, pricing and costs like unit contribution margin, revenue and profit
 * @param {Sales} sales Are the sales values to base the calculation on
 * @returns {Sales} the updated sales entity with the new calculated values
 */
export function calculateSales(sales: Sales): Sales {
  const totalFixCosts = calculateTotalCosts(sales.costs.fixCosts);
  const totalVariableCosts =
    calculateTotalCosts(sales.costs.variableCosts) * sales.volume;
  const costPrice = !Number.isFinite(
    (totalFixCosts + totalVariableCosts) / sales.volume
  )
    ? 0
    : (totalFixCosts + totalVariableCosts) / sales.volume;
  const totalCosts = totalFixCosts + totalVariableCosts;
  const breakEven = !Number.isFinite(totalCosts / sales.pricePerUnit)
    ? 0
    : totalCosts / sales.pricePerUnit;
  const revenue = sales.pricePerUnit * sales.volume;
  const unitContributionMargin = revenue - totalVariableCosts;
  const profit = unitContributionMargin - totalFixCosts;

  return {
    ...sales,
    costPrice,
    breakEven,
    revenue,
    unitContributionMargin,
    profit,
  };
}

/**
 * Checks whether or not two {@link Sales} are equal
 * @param {Sales} sales Is an entry of sales
 * @param {Sales} otherSales Is the another entry of sales
 * @returns {boolean} true in case both are equal, otherwise false
 */
export function areSalesEqual(sales: Sales, otherSales: Sales) {
  let k: keyof Sales;
  for (k in sales) {
    if (sales[k] !== otherSales[k]) return false;
  }
  return true;
}

/**
 * Adds the missing fields in case we import something that was exported with an older {@link Sales} definition
 * @param {Sales} sales Is the imported data
 * @returns a {@link Sales} object that has default values in case some fields weren't defined in the import
 */
export function setUndefinedValuesAfterImport(sales: Sales): Sales {
  let updatedSales = Object.assign(
    createEmptySales(sales.currency !== undefined ? sales.currency : ""),
    sales
  );
  return updatedSales;
}
