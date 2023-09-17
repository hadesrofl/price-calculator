import { Grid, Typography, Divider, Chip, Box } from "@mui/material";
import {
  BookCosts,
  PriceAndDiscountsPerProductType,
} from "../../../costs/CostCalculation";
import { useEffect, useState } from "react";
import calculateEarnings from "../../services/calculateDiscount";
import calculateBreakEven from "../../services/calculateBreakEven";
import calculateProfit from "../../services/calculateProfit";
import { ProductType } from "../../../types/ProductType";

interface CalculationCardContentProps {
  productType: ProductType;
  bookCosts: BookCosts;
  priceAndDiscount: PriceAndDiscountsPerProductType;
}

function determineMerchantDiscountLabel(productType: ProductType) {
  switch (productType) {
    case "digital":
      return "Händlerrabatt (Digital)";
    case "print":
      return "Händlerrabatt (Druck)";
    default:
      return "Händlerrabatt";
  }
}

export function CalculationCardContent(props: CalculationCardContentProps) {
  const { productType, bookCosts, priceAndDiscount } = props;
  const merchantDiscount = determineMerchantDiscountLabel(productType);
  const [earnings, setEarnings] = useState(0);
  const [profit, setProfit] = useState(0);
  const [breakEven, setBreakEven] = useState(0);

  useEffect(() => {
    setEarnings(calculateEarnings(productType, priceAndDiscount));
  }, [
    priceAndDiscount,
    priceAndDiscount.digitalPriceAndDiscount.discountPerIssue,
    priceAndDiscount.digitalPriceAndDiscount.pricePerIssue,
    priceAndDiscount.printPriceAndDiscount.discountPerIssue,
    priceAndDiscount.printPriceAndDiscount.pricePerIssue,
    productType,
  ]);

  useEffect(() => {
    setBreakEven(calculateBreakEven(bookCosts, productType, earnings));
  }, [
    bookCosts,
    bookCosts.printCosts.additionalCostPerIssue,
    bookCosts.printCosts.amount,
    bookCosts.printCosts.printingCost,
    bookCosts.productionCosts.totalCosts,
    earnings,
    productType,
  ]);

  useEffect(() => {
    setProfit(
      calculateProfit(earnings, bookCosts.printCosts.additionalCostPerIssue)
    );
  }, [bookCosts.printCosts.additionalCostPerIssue, earnings]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography>Produktionskosten</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography>{bookCosts.productionCosts.totalCosts} €</Typography>
      </Grid>
      {productType === "print" ? (
        <>
          <Grid item xs={6}>
            <Typography variant="body1">Druckkosten</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="body1">
              {bookCosts.printCosts.printingCost} €
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Auflage</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="body1">
              {bookCosts.printCosts.amount} Stk.
            </Typography>
          </Grid>
        </>
      ) : (
        <Box />
      )}
      {productType !== "bundle" ? (
        <>
          <Grid item xs={6}>
            <Typography>{merchantDiscount}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>
              {productType === "digital"
                ? priceAndDiscount.digitalPriceAndDiscount.discountPerIssue
                : priceAndDiscount.printPriceAndDiscount.discountPerIssue}{" "}
              %
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={6}>
            <Typography>{determineMerchantDiscountLabel("digital")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>
              {priceAndDiscount.digitalPriceAndDiscount.discountPerIssue} %
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{determineMerchantDiscountLabel("print")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>
              {priceAndDiscount.printPriceAndDiscount.discountPerIssue} %
            </Typography>
          </Grid>
        </>
      )}
      <Grid item xs={12} marginTop="10px" marginBottom="10px">
        <Divider>
          <Chip label="Je Exemplar" variant="outlined" />
        </Divider>
      </Grid>
      <Grid item xs={6}>
        <Typography>Umsatz</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography>{earnings} €</Typography>
      </Grid>

      {productType === "print" ? (
        <>
          <Grid item xs={6}>
            <Typography>Kosten</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>
              {bookCosts.printCosts.additionalCostPerIssue} €
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Gewinn</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>{profit} €</Typography>
          </Grid>
        </>
      ) : (
        <Box />
      )}

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography>Break-Even</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography>{breakEven} Stk.</Typography>
      </Grid>
    </Grid>
  );
}
