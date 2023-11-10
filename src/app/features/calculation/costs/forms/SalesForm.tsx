import { useCallback, useEffect, useState } from "react";
import { Stack, Box, Typography, Grid, Divider } from "@mui/material";
import { Sales, calculateSales } from "../types/Sales";
import { SalesValidationErrors } from "./validation/useSalesValidator";
import DetailedCostStatement from "../components/costStatement/DetailedCostStatement";
import useDesktopSize from "@/app/hooks/useDesktopSize";
import { Discount, calculateCostPerUnit } from "../types/Discount";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsSalesForm } from "@/app/i18n/locales/translationNamespaces";
import InputCardGroup from "../components/cards/InputCardGroup";
import CostCardGroup from "../components/cards/CostCardGroup";
import ProfitCardGroup from "../components/cards/ProfitCardGroup";
import { sumCosts } from "../types/Costs";
import CostPerformanceBarChart from "../components/charts/CostPerformanceBarChart";

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
  const [validationErrors, setValidationErrors] =
    useState<SalesValidationErrors>({
      salesVolume: "",
      pricePerUnit: "",
      discount: "",
    });
  const [volume, setVolume] = useState<number>(sales.volume);
  const [pricePerUnit, setPricePerUnit] = useState<number>(sales.pricePerUnit);
  const [discount, setDiscount] = useState<Discount>(sales.discount);
  const { t } = useTranslation(TranslationsSalesForm);

  const onSalesVolumeChange = (newSalesVolume: number) => {
    setVolume(newSalesVolume);
  };

  const onPricePerUnitChange = (newPricePerUnit: number) => {
    setPricePerUnit(newPricePerUnit);
    setDiscount({
      ...discount,
      costPerUnit: calculateCostPerUnit(newPricePerUnit, discount.inPercent),
    });
  };

  const onDiscountChange = (newDiscount: Discount) => {
    setDiscount(newDiscount);
  };

  const onValidationErrors = (newValidationErrors: SalesValidationErrors) => {
    setValidationErrors(newValidationErrors);
  };

  const updateSales = useCallback(
    (
      volume: number = sales.volume,
      pricePerUnit: number = sales.pricePerUnit,
      discount: Discount = sales.discount
    ) => {
      onSalesChanged(
        calculateSales({ ...sales, volume, pricePerUnit, discount, currency })
      );
    },
    [currency, onSalesChanged, sales]
  );

  useEffect(() => {
    if (
      validationErrors.salesVolume === "" &&
      validationErrors.pricePerUnit === "" &&
      validationErrors.discount === ""
    ) {
      updateSales(sales.volume, sales.pricePerUnit);
      setVolume(sales.volume);
      setPricePerUnit(sales.pricePerUnit);
      setDiscount(sales.discount);
    }
  }, [
    sales,
    updateSales,
    validationErrors.discount,
    validationErrors.pricePerUnit,
    validationErrors.salesVolume,
  ]);

  useEffect(() => {
    const timeoutInMs = 500;
    const timeoutId = setTimeout(() => {
      if (
        validationErrors.pricePerUnit === "" &&
        validationErrors.salesVolume === "" &&
        validationErrors.discount === ""
      )
        updateSales(volume, pricePerUnit, discount);
    }, timeoutInMs);
    return () => clearTimeout(timeoutId);
  }, [
    volume,
    pricePerUnit,
    updateSales,
    validationErrors.pricePerUnit,
    validationErrors.salesVolume,
    validationErrors.discount,
    discount,
  ]);

  return (
    <Stack alignItems="left">
      {isDesktopSize ? (
        <Box />
      ) : (
        <Typography variant="h5">{t("Title")}</Typography>
      )}
      <Stack direction={isDesktopSize ? "row" : "column"} spacing={2}>
        <Grid alignItems="center" container spacing={2}>
          <Grid item xs={12} sm={12}>
            <InputCardGroup
              initialSalesVolume={sales.volume}
              onSalesVolumeChange={onSalesVolumeChange}
              initialPricePerUnit={sales.pricePerUnit}
              onPricePerUnitChange={onPricePerUnitChange}
              initialDiscount={sales.discount}
              onDiscountChange={onDiscountChange}
              currency={sales.currency}
              onValidationErrors={onValidationErrors}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CostCardGroup
              costPrice={sales.costPrice}
              fixedCosts={sales.costs.fixCosts}
              variableCosts={sales.costs.variableCosts.concat({
                label: "Discount",
                value: sales.discount.costPerUnit,
                currency: sales.currency,
              })}
              totalCosts={
                sumCosts(sales.costs.fixCosts) +
                sumCosts(sales.costs.variableCosts) * sales.volume
              }
              currency={sales.currency}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ProfitCardGroup
              breakEven={sales.breakEven}
              revenue={sales.revenue}
              unitContributionMargin={sales.unitContributionMargin}
              profit={sales.profit}
              currency={sales.currency}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CostPerformanceBarChart
              totalCosts={
                sumCosts(sales.costs.fixCosts) +
                sumCosts(sales.costs.variableCosts) * sales.volume
              }
              fixedCosts={sumCosts(sales.costs.fixCosts)}
              variableCosts={sumCosts(sales.costs.variableCosts) * sales.volume}
              revenue={sales.revenue}
              profit={sales.profit}
              currency={sales.currency}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <DetailedCostStatement
              costs={sales.costs}
              discount={sales.discount}
              currency={sales.currency}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
