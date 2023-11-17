import { Stack, useTheme } from "@mui/material";
import CostStatement from "./CostStatement";
import { Costs, sumCosts } from "../../types/Costs";
import { Discount } from "../../types/Discount";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsCostStatement } from "@/app/i18n/locales/translationNamespaces";
import ColoredAccordion from "../coloredAccordion/ColoredAccordion";

/**
 * An interface for the properties of {@link DetailedCostStatement}
 */
export interface DetailedCostStatementProps {
  costs: Costs;
  discount: Discount;
  currency: string;
}

/**
 * Creates a detailed cost statement for a single, given cost entity
 * @param {DetailedCostStatementProps} props Are the properties for this cost statment like the cost and currency
 * @returns {JSX.Element} The detailed cost statement entry for the given cost
 */
export default function DetailedCostStatement(
  props: DetailedCostStatementProps
) {
  const { costs, discount, currency } = props;
  const { t } = useTranslation(TranslationsCostStatement);
  const theme = useTheme();
  const titleColor = theme.palette.error.main;

  return (
    <ColoredAccordion
      disabled={
        sumCosts(costs.fixCosts) === 0 && sumCosts(costs.variableCosts) === 0
      }
      titleColor={titleColor}
      title={t("Title")}
    >
      <Stack spacing={5}>
        <CostStatement
          costs={costs.fixCosts}
          currency={currency}
          title={t("FixedCosts")}
        />
        <CostStatement
          costs={costs.variableCosts}
          discount={discount}
          currency={currency}
          title={t("VariableCosts")}
        />
      </Stack>
    </ColoredAccordion>
  );
}
