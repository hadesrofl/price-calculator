import {
  BookCosts,
  PriceAndDiscountsPerProductType,
} from "@/app/components/CostCalculation/CostCalculation";

export default interface CalculationCardProps {
  minHeight?: string;
  bookCosts: BookCosts;
  priceAndDiscount: PriceAndDiscountsPerProductType;
}
