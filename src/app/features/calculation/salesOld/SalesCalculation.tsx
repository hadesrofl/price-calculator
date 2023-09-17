import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import React from "react";
import DigitalCalculationCard from "./cards/DigitalCalculationCard";
import PrintCalculationCard from "./cards/PrintCalculationCard";
import {
  BookCosts,
  PriceAndDiscountsPerProductType,
} from "../costs/CostCalculation";

export interface SalesCalculationProps {
  bookCosts: BookCosts;
  priceAndDiscount: PriceAndDiscountsPerProductType;
}

export default function SalesCalculation(props: SalesCalculationProps) {
  const { bookCosts, priceAndDiscount } = props;
  const minHeight = "425px";
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DigitalCalculationCard
            bookCosts={bookCosts}
            priceAndDiscount={priceAndDiscount}
            minHeight={minHeight}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PrintCalculationCard
            bookCosts={bookCosts}
            priceAndDiscount={priceAndDiscount}
            minHeight={minHeight}
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <BundleCalculationCard
            bookCosts={bookCosts}
            priceAndDiscount={priceAndDiscount}
            minHeight={minHeight}
          />
        </Grid> */}
      </Grid>
    </Stack>
  );
}
