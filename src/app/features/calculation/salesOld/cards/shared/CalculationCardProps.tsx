import {
  BookCosts,
  PriceAndDiscountsPerProductType,
} from "@/app/features/calculation/costs/CostCalculation";

export default interface CalculationCardProps {
  minHeight?: string;
  bookCosts: BookCosts;
  priceAndDiscount: PriceAndDiscountsPerProductType;
}
