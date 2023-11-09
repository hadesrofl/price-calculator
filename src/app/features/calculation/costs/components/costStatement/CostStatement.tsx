import { Divider, Grid, Typography } from "@mui/material";
import { Cost, sumCosts } from "../../types/Costs";
import { Discount } from "../../types/Discount";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsCostStatement } from "@/app/i18n/locales/translationNamespaces";

interface CostStatementProps {
  costs: Cost[];
  discount?: Discount;
  currency: string;
  title: string;
}

/**
 * Creates a cost statement which shows a list of given costs
 * @param {CostStatementProps} props Are the properties for this cost statement like the title and an array of costs
 * @returns {JSX.Element} A cost statement entry listing all giving costs
 */
export default function CostStatement(props: CostStatementProps) {
  const { costs, currency, discount, title } = props;
  const { t } = useTranslation(TranslationsCostStatement);
  const FractionDigits = 2;
  const totalCosts = sumCosts(costs);

  return (
    <Grid item xs={12} sm={6}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{title}</Typography>
      </Grid>

      {costs.map((cost) => {
        return (
          <Grid container key={cost.label} marginBottom={1}>
            <Grid item xs={12} sm={6}>
              <Typography>{cost.label}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                {cost.value.toFixed(FractionDigits)} {currency}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
      <Grid container>
        {discount !== undefined && discount.inPercent !== 0 ? (
          <>
            <Grid container key="Discount" marginBottom={1}>
              <Grid item xs={12} sm={6}>
                <Typography>{t("Labels.Discount")}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {discount.costPerUnit.toFixed(FractionDigits)} {currency}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography>{t("Labels.Sum")}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {(totalCosts + discount.costPerUnit).toFixed(FractionDigits)}{" "}
                  {currency}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={7}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>{t("Labels.Sum")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                {totalCosts.toFixed(FractionDigits)} {currency}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
