import { useCallback, useEffect, useState } from "react";
import { Stack, Box, Typography, Grid } from "@mui/material";
import { Sales, calculateSales } from "../types/Sales";
import NumberInput from "../components/inputs/NumberInput";
import {
  pricePerUnitValidationSchema,
  salesVolumeValidationSchema,
  useSalesValidator,
} from "./validation/useSalesValidator";
import Info from "@mui/icons-material/Info";
import DetailedCostStatement from "../components/costStatement/DetailedCostStatement";
import useDesktopSize from "@/app/hooks/useDesktopSize";
import ButtonWithTooltip from "../components/buttons/ButtonWithTooltip";

function CreateSalesLabelGridItem(
  labelText: string,
  tooltipText?: string
): JSX.Element {
  return (
    <Grid container alignItems="center">
      <Grid item xs={1}>
        {tooltipText !== undefined ? (
          <ButtonWithTooltip
            disabled
            tooltipText={tooltipText}
            sx={{ justifyContent: "left" }}
          >
            <Info color="primary" />
          </ButtonWithTooltip>
        ) : (
          <Box />
        )}
      </Grid>
      <Grid item xs={10}>
        <Typography>{labelText}</Typography>
      </Grid>
    </Grid>
  );
}

/**
 * Interface for the properties of the {@link SalesForm} like a handler in case sales changed
 */
export interface SalesFormProps {
  onSalesChanged: (newSales: Sales) => void;
  sales: Sales;
  currency: string;
}

/**
 * Creates a sales form that handles fields for inputting different sales parameter and shows the calculation
 * @param {CostFormProps} props Are the properties of this form like an update function in case sales changed
 * @returns {JSX.Element} the form as JSX.Element
 */
export default function SalesForm(props: SalesFormProps) {
  const { onSalesChanged, sales, currency } = props;
  const isDesktopSize = useDesktopSize();
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
            {CreateSalesLabelGridItem("Absatzmenge")}
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
            {CreateSalesLabelGridItem("Stückpreis")}
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
            {CreateSalesLabelGridItem(
              "Selbstkosten",
              "Selbstkosten sind die Gesamtkosten (fixe + variable Kosten) pro Stück"
            )}
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
            {CreateSalesLabelGridItem(
              "Break-Even",
              "Break-Even ist die Nummer von verkauften Produkten, die notwendig sind, um die Gesamtkosten (fixe + variable Kosten) zu decken"
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sales.breakEven.toFixed(FractionDigits)}
              name="breakEven"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {CreateSalesLabelGridItem("Umsatz")}
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
            {CreateSalesLabelGridItem(
              "Deckungsbeitrag I",
              "Deckungsbeitrag I ergibt sich aus Umsatz - variable Kosten"
            )}
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
            {CreateSalesLabelGridItem("Gewinn")}
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
