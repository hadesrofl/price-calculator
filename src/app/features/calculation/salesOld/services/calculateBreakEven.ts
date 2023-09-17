import { BookCosts } from "../../costs/CostCalculation";
import { ProductType } from "../../types/ProductType";

export default function calculateBreakEven(
  bookCosts: BookCosts,
  productType: ProductType,
  earnings: number
): number {
  if (bookCosts.productionCosts.totalCosts === undefined || earnings === 0)
    return 0;

  switch (productType) {
    case "digital":
      return bookCosts.productionCosts.totalCosts / earnings;
    case "print":
      return (
        (bookCosts.productionCosts.totalCosts +
          bookCosts.printCosts.printingCost +
          bookCosts.printCosts.additionalCostPerIssue *
            bookCosts.printCosts.amount) /
        earnings
      );
    case "bundle":
    default:
      return 0;
  }
}
