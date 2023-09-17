import { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";
import { Sales, areSalesEqual, calculateSales } from "../types/Sales";
import DetailedCostStatement from "../components/DetailedCostStatement";
import NumberInput from "../components/NumberInput";
import {
  pricePerUnitValidationSchema,
  salesVolumeValidationSchema,
  useSalesValidator,
} from "./validation/useSalesValidator";
import { Info } from "@mui/icons-material";

export interface SalesFormProps extends IsDesktopSizeProps {
  onSalesChanged: (newSales: Sales) => void;
  startSales: Sales;
}

export default function SalesForm(props: SalesFormProps) {
  const { onSalesChanged, startSales, isDesktopSize } = props;
  const { validationErrors, validate } = useSalesValidator();
  const [firstCalculationDone, setFirstCalculationDone] =
    useState<boolean>(false);

  const [sales, setSales] = useState<Sales>(startSales);
  const [salesVolume, setSalesVolume] = useState<number>(startSales.volume);
  const [pricePerUnit, setPricePerUnit] = useState<number>(
    startSales.pricePerUnit
  );

  const title = "Umsatz & Gewinn";
  const currency = "€";

  const onSalesVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(salesVolumeValidationSchema, event);
    setSalesVolume(value);
  };

  const OnPricePerUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(pricePerUnitValidationSchema, event);
    setPricePerUnit(value);
  };

  useEffect(() => {
    let newSales: Sales = sales;
    if (
      validationErrors.pricePerUnit !== "" ||
      validationErrors.salesVolume !== ""
    )
      newSales = calculateSales({
        ...sales,
        volume: 0,
        pricePerUnit: 0,
      });
    else if (
      !firstCalculationDone ||
      !areSalesEqual(sales, startSales) ||
      salesVolume !== sales.volume ||
      pricePerUnit !== sales.pricePerUnit
    ) {
      newSales = calculateSales({
        ...sales,
        volume: salesVolume,
        pricePerUnit,
      });
    }
    onSalesChanged(newSales);
    setSales(newSales);
    setFirstCalculationDone(true);
  }, [
    salesVolume,
    pricePerUnit,
    sales,
    onSalesChanged,
    startSales,
    firstCalculationDone,
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
              value={salesVolume}
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
              value={sales.costPrice}
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
              value={sales.revenue}
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
            <Typography></Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.unitContributionMargin}
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
              value={sales.profit}
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
