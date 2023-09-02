"use client";
import { Stack, Divider } from "@mui/material";
import SalesCalculation from "./components/SalesCalculation/SalesCalculation";
import {
  BookCosts,
  CostCalculation,
  PriceAndDiscountsPerProductType,
} from "./components/CostCalculation/CostCalculation";
import { useState } from "react";

export default function Home() {
  const [costs, setCosts] = useState<BookCosts>({
    productionCosts: { salary: 0, additionalCosts: 0, totalCosts: 0 },
    printCosts: { amount: 0, printingCost: 0, additionalCostPerIssue: 0 },
  });

  const [priceAndDiscount, setPriceAndDiscount] =
    useState<PriceAndDiscountsPerProductType>({
      digitalPriceAndDiscount: { pricePerIssue: 0, discountPerIssue: 0 },
      printPriceAndDiscount: { pricePerIssue: 0, discountPerIssue: 0 },
    });

  const onCostChanged = (newCosts: BookCosts) => {
    setCosts(newCosts);
  };

  const onPriceAndDiscountChanged = (
    newPriceAndDiscount: PriceAndDiscountsPerProductType
  ) => {
    setPriceAndDiscount(newPriceAndDiscount);
  };

  return (
    <Stack spacing={2} marginRight="5%">
      <SalesCalculation bookCosts={costs} priceAndDiscount={priceAndDiscount} />
      <Divider />
      <CostCalculation
        startCosts={costs}
        startPriceAndDiscount={priceAndDiscount}
        onCostChanged={onCostChanged}
        onPriceAndDiscountChanged={onPriceAndDiscountChanged}
      />
    </Stack>
  );
}
