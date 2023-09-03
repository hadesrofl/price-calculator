import { CSSProperties, useEffect, useState } from "react";
import { PriceAndDiscount } from "../PricingForm";
import { CustomAdornment } from "@/app/components/Shared/CustomAdornment";
import arePriceAndDiscountEqual from "@/app/helper/arePriceAndDiscountEqual";
import { Grid, Typography, TextField, Stack } from "@mui/material";

interface PriceAndDiscountFormProps {
  startPriceAndDiscount: PriceAndDiscount;
  onPriceAndDiscountChange: (priceAndDiscount: PriceAndDiscount) => void;
}

export default function PriceAndDiscountForm(props: PriceAndDiscountFormProps) {
  const { onPriceAndDiscountChange, startPriceAndDiscount } = props;

  const [priceAndDiscount, setPriceAndDiscount] = useState<PriceAndDiscount>(
    startPriceAndDiscount
  );
  const title = "Preisbildung";
  const textFieldSx: CSSProperties = { textAlign: "right" };

  useEffect(() => {
    if (!arePriceAndDiscountEqual(priceAndDiscount, startPriceAndDiscount))
      onPriceAndDiscountChange(priceAndDiscount);
  }, [priceAndDiscount, onPriceAndDiscountChange, startPriceAndDiscount]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPriceAndDiscount({
      ...priceAndDiscount,
      [event.target.name]: Number.parseInt(event.target.value),
    });

  return (
    <Grid alignItems="center" container rowSpacing={2}>
      <Grid item xs={12} lg={6}>
        <Typography>Preis/Exemplar</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
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
      <Grid item xs={12} lg={6}>
        <Typography>Händlerrabatt</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
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
