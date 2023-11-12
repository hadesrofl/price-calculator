import { PieChart, PieValueType } from "@mui/x-charts";
import { Cost } from "../../types/Costs";
import useDesktopSize from "@/app/hooks/useDesktopSize";

type CostPieChartProps = {
  costs: Cost[];
};

export default function CostPieChart(props: CostPieChartProps) {
  const desktopSize = useDesktopSize();
  const { costs } = props;
  const data: PieValueType[] = [];
  costs.forEach((cost, index) => {
    const split = cost.label.split(" ");
    const lines: string[] = [];
    const MaxLineLength = 20;
    split.forEach((word) => {
      if (
        lines.length === 0 ||
        lines[lines.length - 1].length + word.length > MaxLineLength
      ) {
        lines.push(word);
      } else lines.push(`${lines.pop()} ${word}`);
    });
    data.push({ id: index, value: cost.value, label: lines.join("\n") });
  });

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          paddingAngle: 5,
          innerRadius: 30,
          cornerRadius: 5,
          cx: desktopSize ? 450 : 150,
          cy: desktopSize ? 150 : 200,
        },
      ]}
      width={desktopSize ? 650 : 300}
      height={desktopSize ? 300 : 400}
      slotProps={{
        legend: {
          direction: desktopSize ? "column" : "row",
          position: {
            vertical: desktopSize ? "middle" : "top",
            horizontal: desktopSize ? "left" : "middle",
          },
        },
      }}
    />
  );
}
