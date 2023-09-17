import { Costs, calculateTotalCosts } from "./Costs";

export type Sales = {
  costs: Costs;
  costPrice: number;
  pricePerUnit: number;
  volume: number;
  revenue: number;
  unitContributionMargin: number;
  profit: number;
};

export function calculateSales(sales: Sales): Sales {
  const totalFixCosts = calculateTotalCosts(sales.costs.fixCosts);
  const totalVariableCosts =
    calculateTotalCosts(sales.costs.variableCosts) * sales.volume;
  const costPrice = !Number.isFinite(
    (totalFixCosts + totalVariableCosts) / sales.volume
  )
    ? 0
    : (totalFixCosts + totalVariableCosts) / sales.volume;
  const revenue = sales.pricePerUnit * sales.volume;
  const unitContributionMargin = revenue - totalVariableCosts;
  const profit = unitContributionMargin - totalFixCosts;

  return {
    ...sales,
    costPrice,
    revenue,
    unitContributionMargin,
    profit,
  };
}

export function areSalesEqual(sales: Sales, otherSales: Sales) {
  let k: keyof Sales;
  for (k in sales) {
    if (sales[k] !== otherSales[k]) return false;
  }
  return true;
}
