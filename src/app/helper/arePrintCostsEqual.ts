import { PrintCost } from "../components/CostCalculation/components/forms/PrintCostForm";

export default function arePrintCostsEqual(
  costs: PrintCost,
  otherCosts: PrintCost
) {
  return (
    costs.amount === otherCosts.amount &&
    costs.printingCost === otherCosts.printingCost &&
    costs.additionalCostPerIssue === otherCosts.additionalCostPerIssue
  );
}