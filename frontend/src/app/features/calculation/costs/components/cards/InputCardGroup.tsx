import ColoredCard from "@/app/components/coloredCard/coloredCard";
import { Grid, useTheme } from "@mui/material";
import NumberInput from "../inputs/NumberInput";
import {
  SalesValidationErrors,
  discountValidationSchema,
  pricePerUnitValidationSchema,
  salesVolumeValidationSchema,
  useSalesValidator,
} from "../../forms/validation/useSalesValidator";
import { useEffect, useState } from "react";
import { Discount, calculateCostPerUnit } from "../../types/Discount";
import ButtonWithTooltip from "../buttons/ButtonWithTooltip";
import Info from "@mui/icons-material/Info";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsInputCardGroup } from "@/app/i18n/locales/translationNamespaces";

type InputCardGroupProps = {
  initialSalesVolume: number;
  onSalesVolumeChange: (salesVolume: number) => void;
  initialPricePerUnit: number;
  onPricePerUnitChange: (pricePerUnit: number) => void;
  initialDiscount: Discount;
  onDiscountChange: (discount: Discount) => void;
  currency: string;
  onValidationErrors: (validationErrors: SalesValidationErrors) => void;
};

export default function InputCardGroup(props: InputCardGroupProps) {
  const {
    initialSalesVolume,
    initialPricePerUnit,
    initialDiscount,
    currency,
    onSalesVolumeChange,
    onDiscountChange,
    onPricePerUnitChange,
    onValidationErrors,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation(TranslationsInputCardGroup);
  const { validationErrors, validate } = useSalesValidator();
  const [volume, setVolume] = useState<number>(initialSalesVolume);
  const [pricePerUnit, setPricePerUnit] = useState<number>(initialPricePerUnit);
  const [discount, setDiscount] = useState<Discount>(initialDiscount);
  const inputCardColor = theme.palette.primary.main;
  const pieces = t("Adornment.Pieces");
  const percentage = "%";

  const salesVolumeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = validate(salesVolumeValidationSchema, event);
    setVolume(value);
    onSalesVolumeChange(value);
  };

  const pricePerUnitChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = validate(pricePerUnitValidationSchema, event);
    setPricePerUnit(value);
    const newDiscount = {
      ...discount,
      costPerUnit: calculateCostPerUnit(value, discount.inPercent),
    };
    setDiscount(newDiscount);
    onPricePerUnitChange(value);
    onDiscountChange(newDiscount);
  };

  const discountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = validate(discountValidationSchema, event);
    const newDiscount = {
      inPercent: value,
      costPerUnit: calculateCostPerUnit(pricePerUnit, value),
    };
    setDiscount(newDiscount);
    onDiscountChange(newDiscount);
  };

  useEffect(() => {
    onValidationErrors(validationErrors);
  }, [
    onValidationErrors,
    validationErrors,
    validationErrors.discount,
    validationErrors.pricePerUnit,
    validationErrors.salesVolume,
  ]);

  return (
    <Grid className="items-center" container rowSpacing={2} columnSpacing={4}>
      <Grid item xs={12} sm={4}>
        <ColoredCard color={inputCardColor} title={t("Labels.SalesVolume")}>
          <NumberInput
            value={volume}
            customAdornmentText={pieces}
            name="salesVolume"
            onChange={salesVolumeChangeHandler}
            error={validationErrors.salesVolume !== "" ? true : false}
            helperText={
              validationErrors.salesVolume !== ""
                ? validationErrors.salesVolume
                : ""
            }
          />
        </ColoredCard>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ColoredCard color={inputCardColor} title={t("Labels.PricePerUnit")}>
          <NumberInput
            customAdornmentText={currency}
            onlyPositiveValues
            value={pricePerUnit}
            name="pricePerUnit"
            onChange={pricePerUnitChangeHandler}
            error={validationErrors.pricePerUnit !== "" ? true : false}
            helperText={
              validationErrors.pricePerUnit !== ""
                ? validationErrors.pricePerUnit
                : ""
            }
          />
        </ColoredCard>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ColoredCard color={inputCardColor} title={t("Labels.Discount")}>
          <ButtonWithTooltip disabled tooltipText={t("Tooltips.Discount")}>
            <Info color="primary" />
          </ButtonWithTooltip>
          <NumberInput
            customAdornmentText={percentage}
            onlyPositiveValues
            value={discount.inPercent}
            name="discount"
            onChange={discountChangeHandler}
            error={validationErrors.discount !== "" ? true : false}
            helperText={
              validationErrors.discount !== "" ? validationErrors.discount : ""
            }
          />
        </ColoredCard>
      </Grid>
    </Grid>
  );
}
