import { ProductionCost } from "../components/CostCalculation/components/forms/ProductionCostForm";

export default function areProductCostsEqual(
  costs: ProductionCost,
  otherCosts: ProductionCost
) {
  return (
    costs.additionalCosts === otherCosts.additionalCosts &&
    costs.salary === otherCosts.salary &&
    costs.totalCosts === otherCosts.totalCosts
  );
}