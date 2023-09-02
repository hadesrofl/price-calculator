import { PriceAndDiscount } from "../components/CostCalculation/components/forms/PricingForm";

export default function arePriceAndDiscountEqual(
  priceAndDiscount: PriceAndDiscount,
  otherPriceAndDiscount: PriceAndDiscount
) {
  return (
    priceAndDiscount.discountPerIssue ===
      otherPriceAndDiscount.discountPerIssue &&
    priceAndDiscount.pricePerIssue === otherPriceAndDiscount.pricePerIssue
  );
}