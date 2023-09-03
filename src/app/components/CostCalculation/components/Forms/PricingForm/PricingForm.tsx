import { ProductType } from "@/app/components/SalesCalculation/cards/CalculationCardContent";
import IsDesktopSizeProps from "@/app/components/Shared/IsDesktopSizeProp";
import { Stack, Typography, Box, Grid } from "@mui/material";
import PriceAndDiscountForm from "./components/PriceAndDiscountForm";

export type PriceAndDiscount = {
  pricePerIssue: number;
  discountPerIssue: number;
};

export interface PricingFormProps extends IsDesktopSizeProps {
  digitalStartPriceAndDiscount: PriceAndDiscount;
  printStartPriceAndDiscount: PriceAndDiscount;
  onPriceAndDiscountChange: (
    newPriceAndDiscount: PriceAndDiscount,
    productType: ProductType
  ) => void;
}
export function PricingForm(props: PricingFormProps) {
  const {
    digitalStartPriceAndDiscount,
    printStartPriceAndDiscount,
    onPriceAndDiscountChange,
    isDesktopSize,
  } = props;
  const title = "Preisbildung";
  const onDigitalPriceAndDiscountChange = (
    newPriceAndDiscount: PriceAndDiscount
  ) => {
    onPriceAndDiscountChange(newPriceAndDiscount, "digital");
  };

  const onPrintPriceAndDiscountChange = (
    newPriceAndDiscount: PriceAndDiscount
  ) => {
    onPriceAndDiscountChange(newPriceAndDiscount, "print");
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        {isDesktopSize ? (
          <Box />
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={2}>
          <Typography variant="h6">Digital</Typography>
          <PriceAndDiscountForm
            onPriceAndDiscountChange={onDigitalPriceAndDiscountChange}
            startPriceAndDiscount={digitalStartPriceAndDiscount}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={2}>
          <Typography variant="h6">Druck</Typography>
          <PriceAndDiscountForm
            onPriceAndDiscountChange={onPrintPriceAndDiscountChange}
            startPriceAndDiscount={printStartPriceAndDiscount}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
