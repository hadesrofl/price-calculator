import { useCallback, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";
import { Sales, calculateSales } from "../types/Sales";
import NumberInput from "../components/inputs/NumberInput";
import {
  pricePerUnitValidationSchema,
  salesVolumeValidationSchema,
  useSalesValidator,
} from "./validation/useSalesValidator";
import Info from "@mui/icons-material/Info";
import DetailedCostStatement from "../components/costStatement/DetailedCostStatement";

export interface SalesFormProps extends IsDesktopSizeProps {
  onSalesChanged: (newSales: Sales) => void;
  sales: Sales;
  currency: string;
}

export default function SalesForm(props: SalesFormProps) {
  const { onSalesChanged, sales, isDesktopSize, currency } = props;
  const FractionDigits = 2;
  const { validationErrors, validate } = useSalesValidator();
  const [volume, setVolume] = useState<number>(sales.volume);
  const [pricePerUnit, setPricePerUnit] = useState<number>(sales.pricePerUnit);
  const title = "Umsatz & Gewinn";

  const onSalesVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(salesVolumeValidationSchema, event);
    setVolume(value);
  };

  const OnPricePerUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(pricePerUnitValidationSchema, event);
    setPricePerUnit(value);
  };

  const updateSales = useCallback(
    (
      volume: number = sales.volume,
      pricePerUnit: number = sales.pricePerUnit
    ) => {
      onSalesChanged(
        calculateSales({ ...sales, volume, pricePerUnit, currency })
      );
    },
    [currency, onSalesChanged, sales]
  );

  useEffect(() => {
    if (
      validationErrors.salesVolume === "" &&
      validationErrors.pricePerUnit !== ""
    ) {
      updateSales(sales.volume, sales.pricePerUnit);
      setVolume(sales.volume);
      setPricePerUnit(sales.pricePerUnit);
    }
  }, [
    sales,
    updateSales,
    validationErrors.pricePerUnit,
    validationErrors.salesVolume,
  ]);

  useEffect(() => {
    const timeoutInMs = 500;
    const timeoutId = setTimeout(() => {
      if (
        validationErrors.pricePerUnit === "" &&
        validationErrors.salesVolume === ""
      )
        updateSales(volume, pricePerUnit);
    }, timeoutInMs);
    return () => clearTimeout(timeoutId);
  }, [
    volume,
    pricePerUnit,
    updateSales,
    validationErrors.pricePerUnit,
    validationErrors.salesVolume,
  ]);

  return (
    <Stack alignItems="left">
      {isDesktopSize ? <Box /> : <Typography variant="h5">{title}</Typography>}
      <Stack direction={isDesktopSize ? "row" : "column"} spacing={2}>
        <Grid alignItems="center" container rowSpacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>Absatzmenge</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              value={volume}
              customAdornmentText="Stk."
              name="salesVolume"
              onChange={onSalesVolumeChange}
              error={validationErrors.salesVolume !== "" ? true : false}
              helperText={
                validationErrors.salesVolume !== ""
                  ? validationErrors.salesVolume
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Stückpreis</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              onlyPositiveValues
              value={pricePerUnit}
              name="pricePerUnit"
              onChange={OnPricePerUnitChange}
              error={validationErrors.pricePerUnit !== "" ? true : false}
              helperText={
                validationErrors.pricePerUnit !== ""
                  ? validationErrors.pricePerUnit
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Selbstkosten sind die Gesamtkosten (fixe + variable Kosten) pro Stück">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Selbstkosten</Typography>
                <IconButton disabled>
                  <Info color="primary" />
                </IconButton>
              </Stack>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.costPrice.toFixed(FractionDigits)}
              name="costPrice"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Umsatz</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.revenue.toFixed(FractionDigits)}
              name="revenue"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Deckungsbeitrag I ergibt sich aus Umsatz - variable Kosten">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Deckungsbeitrag I</Typography>
                <IconButton disabled>
                  <Info color="primary" />
                </IconButton>
              </Stack>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.unitContributionMargin.toFixed(FractionDigits)}
              name="unitContributionMargin"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Gewinn</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.profit.toFixed(FractionDigits)}
              name="profit"
            />
          </Grid>
          <Grid item xs={12}>
            <DetailedCostStatement costs={sales.costs} currency={currency} />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
