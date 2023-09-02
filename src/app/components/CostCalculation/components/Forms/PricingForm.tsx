import { ProductType } from "@/app/components/SalesCalculation/cards/CalculationCardContent";
import { CustomAdornment } from "@/app/components/Shared/CustomAdornment";
import arePriceAndDiscountEqual from "@/app/helper/arePriceAndDiscountEqual";
import { Stack, Grid, Typography, TextField, Divider } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

interface PriceAndDiscountFormProps {
  startPriceAndDiscount: PriceAndDiscount;
  onPriceAndDiscountChange: (priceAndDiscount: PriceAndDiscount) => void;
}

export type PriceAndDiscount = {
  pricePerIssue: number;
  discountPerIssue: number;
};

function PriceAndDiscountForm(props: PriceAndDiscountFormProps) {
  const { onPriceAndDiscountChange, startPriceAndDiscount } = props;

  const [priceAndDiscount, setPriceAndDiscount] = useState<PriceAndDiscount>(
    startPriceAndDiscount
  );

  useEffect(() => {
    if (!arePriceAndDiscountEqual(priceAndDiscount, startPriceAndDiscount))
      onPriceAndDiscountChange(priceAndDiscount);
  }, [priceAndDiscount, onPriceAndDiscountChange, startPriceAndDiscount]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceAndDiscount({
      ...priceAndDiscount,
      [event.target.name]: Number.parseInt(event.target.value),
    });

  const textFieldSx: CSSProperties = { textAlign: "right" };

  return (
    <Grid alignItems="center" container spacing={2}>
      <Grid item xs={6}>
        <Typography>Preis/Exemplar</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          size="small"
          variant="filled"
          type="tel"
          value={priceAndDiscount.pricePerIssue}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: textFieldSx,
          }}
          InputProps={{ startAdornment: <CustomAdornment text="€" /> }}
          name="pricePerIssue"
          onChange={onInputChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography>Händlerrabatt</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          size="small"
          variant="filled"
          type="tel"
          value={priceAndDiscount.discountPerIssue}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: textFieldSx,
          }}
          InputProps={{ startAdornment: <CustomAdornment text="%" /> }}
          name="discountPerIssue"
          onChange={onInputChange}
        />
      </Grid>
    </Grid>
  );
}

export interface PricingFormProps {
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
  } = props;

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
    <Stack justifyContent="center" spacing={2}>
      <Typography variant="h6" textAlign="center">
        Digital
      </Typography>
      <PriceAndDiscountForm
        onPriceAndDiscountChange={onDigitalPriceAndDiscountChange}
        startPriceAndDiscount={digitalStartPriceAndDiscount}
      />
      <Typography variant="h6" textAlign="center">
        Druck
      </Typography>
      <PriceAndDiscountForm
        onPriceAndDiscountChange={onPrintPriceAndDiscountChange}
        startPriceAndDiscount={printStartPriceAndDiscount}
      />
    </Stack>
  );
}
