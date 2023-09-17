import { PriceAndDiscountsPerProductType } from "../../costs/CostCalculation";
import { ProductType } from "../../types/ProductType";

export default function calculateEarnings(
  productType: ProductType,
  priceAndDiscount: PriceAndDiscountsPerProductType
): number {
  switch (productType) {
    case "digital":
      const digitalDiscountValue =
        (priceAndDiscount.digitalPriceAndDiscount.pricePerIssue *
          priceAndDiscount.digitalPriceAndDiscount.discountPerIssue) /
        100;
      return (
        priceAndDiscount.digitalPriceAndDiscount.pricePerIssue -
        digitalDiscountValue
      );
    case "print":
      const printDiscountValue =
        (priceAndDiscount.printPriceAndDiscount.pricePerIssue *
          priceAndDiscount.printPriceAndDiscount.discountPerIssue) /
        100;
      return (
        priceAndDiscount.printPriceAndDiscount.pricePerIssue -
        printDiscountValue
      );
    case "bundle":
    default:
      return 0;
  }
}
