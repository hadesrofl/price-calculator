import ColoredCard from "@/app/components/coloredCard/coloredCard";
import { Grid, useTheme } from "@mui/material";
import NumberInput from "../inputs/NumberInput";
import ButtonWithTooltip from "../buttons/ButtonWithTooltip";
import Info from "@mui/icons-material/Info";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsCostCardGroup } from "@/app/i18n/locales/translationNamespaces";
import { Cost, sumCosts } from "../../types/Costs";
import ColoredAccordion from "../coloredAccordion/ColoredAccordion";

type CostCardGroupProps = {
  costPrice: number;
  fixedCosts: Cost[];
  variableCosts: Cost[];
  totalCosts: number;
  currency: string;
};

export default function CostCardGroup(props: CostCardGroupProps) {
  const { costPrice, fixedCosts, variableCosts, totalCosts, currency } = props;
  const FractionDigits = 2;
  const theme = useTheme();
  const { t } = useTranslation(TranslationsCostCardGroup);
  const costCardColor = theme.palette.action.active;
  const titleColor = theme.palette.error.main;

  return (
    <ColoredAccordion title={t("Title")} titleColor={titleColor}>
      <Grid
        className="items-stretch mt-1"
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid item xs={12} sm={6}>
          <ColoredCard color={costCardColor} title={t("Labels.TotalCosts")}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={totalCosts.toFixed(FractionDigits)}
              name="totalCosts"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard color={costCardColor} title={t("Labels.OwnCosts")}>
            <ButtonWithTooltip disabled tooltipText={t("Tooltips.OwnCosts")}>
              <Info color="primary" />
            </ButtonWithTooltip>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={costPrice.toFixed(FractionDigits)}
              name="costPrice"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard color={costCardColor} title={t("Labels.FixedCosts")}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sumCosts(fixedCosts).toFixed(FractionDigits)}
              name="fixedCosts"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard color={costCardColor} title={t("Labels.VariableCosts")}>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={sumCosts(variableCosts).toFixed(FractionDigits)}
              name="variableCosts"
            />
          </ColoredCard>
        </Grid>
      </Grid>
    </ColoredAccordion>
  );
}
