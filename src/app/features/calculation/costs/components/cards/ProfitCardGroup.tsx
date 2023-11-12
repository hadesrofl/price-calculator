import ColoredCard from "@/app/components/coloredCard/coloredCard";
import { Grid, useTheme } from "@mui/material";
import NumberInput from "../inputs/NumberInput";
import { useTranslation } from "@/app/i18n/i18next";
import ButtonWithTooltip from "../buttons/ButtonWithTooltip";
import Info from "@mui/icons-material/Info";
import { TranslationsProfitCardGroup } from "@/app/i18n/locales/translationNamespaces";
import ColoredAccordion from "../coloredAccordion/ColoredAccordion";

type ProfitCardGroupProps = {
  breakEven: number;
  revenue: number;
  unitContributionMargin: number;
  profit: number;
  currency: string;
};

export default function ProfitCardGroup(props: ProfitCardGroupProps) {
  const { breakEven, revenue, unitContributionMargin, profit, currency } =
    props;
  const theme = useTheme();
  const { t } = useTranslation(TranslationsProfitCardGroup);
  const pieces = t("Adornment.Pieces");
  const computedCardColor = theme.palette.info.dark;
  const profitCardColor = theme.palette.success.main;
  const titleColor = theme.palette.success.main;
  const FractionDigits = 2;

  return (
    <ColoredAccordion title={t("Title")} titleColor={titleColor}>
      <Grid
        alignItems="center"
        container
        rowSpacing={2}
        columnSpacing={4}
        marginTop={1}
      >
        <Grid item xs={12} sm={6}>
          <ColoredCard color={computedCardColor} title={t("Labels.BreakEven")}>
            <ButtonWithTooltip disabled tooltipText={t("Tooltips.BreakEven")}>
              <Info color="primary" />
            </ButtonWithTooltip>
            <NumberInput
              customAdornmentText={pieces}
              readonly
              value={breakEven.toFixed(FractionDigits)}
              name="breakEven"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard color={profitCardColor} title={t("Labels.Revenue")}>
            <ButtonWithTooltip disabled tooltipText={t("Tooltips.Revenue")}>
              <Info color="primary" />
            </ButtonWithTooltip>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={revenue.toFixed(FractionDigits)}
              name="revenue"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard
            color={computedCardColor}
            title={t("Labels.UnitContributionMargin")}
          >
            <ButtonWithTooltip
              disabled
              tooltipText={t("Tooltips.UnitContributionMargin")}
            >
              <Info color="primary" />
            </ButtonWithTooltip>
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={unitContributionMargin.toFixed(FractionDigits)}
              name="unitContributionMargin"
            />
          </ColoredCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ColoredCard
            color={profit > 0 ? profitCardColor : theme.palette.error.main}
            title={t("Labels.Profit")}
          >
            <NumberInput
              customAdornmentText={currency}
              readonly
              value={profit.toFixed(FractionDigits)}
              name="profit"
            />
          </ColoredCard>
        </Grid>
      </Grid>
    </ColoredAccordion>
  );
}
