import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsCostPerformanceBarChart } from "@/app/i18n/locales/translationNamespaces";
import { BarChart } from "@mui/x-charts";

type CostPerformanceBarChartProps = {
  totalCosts: number;
  fixedCosts: number;
  variableCosts: number;
  revenue: number;
  profit: number;
  currency: string;
};

export default function CostPerformanceBarChart(
  props: CostPerformanceBarChartProps
) {
  const { totalCosts, fixedCosts, variableCosts, revenue, profit, currency } =
    props;
  const { t } = useTranslation(TranslationsCostPerformanceBarChart);
  const chartSettings = {
    yAxis: [{ label: currency }],
  };
  const dataset = [
    {
      totalCosts,
      fixedCosts,
      variableCosts,
      revenue,
      profit,
      xLabel: t("Performance"),
    },
  ];
  const valueFormatter = (value: number) => `${value} ${currency}`;

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "xLabel" }]}
      series={[
        {
          dataKey: "totalCosts",
          label: t("TotalCosts"),
          valueFormatter,
        },
        {
          dataKey: "fixedCosts",
          label: t("FixedCosts"),
          valueFormatter,
        },
        {
          dataKey: "variableCosts",
          label: t("VariableCosts"),
          valueFormatter,
        },
        {
          dataKey: "revenue",
          label: t("Revenue"),
          valueFormatter,
        },
        {
          dataKey: "profit",
          label: t("Profit"),
          valueFormatter,
        },
      ]}
      height={300}
      {...chartSettings}
    />
  );
}
