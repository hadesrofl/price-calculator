import {
  Box,
  Divider,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EuroIcon from "@mui/icons-material/Euro";
import CalculationTabPanel from "./components/CalculationTabPanel";
import CostForm from "./forms/CostForm";
import SalesForm from "./forms/SalesForm";
import { Costs, Cost, areCostsEqual } from "./types/Costs";
import { Sales } from "./types/Sales";
export interface CostCalculationProps {
  onCostChanged: (newCosts: Costs) => void;
  startCosts: Costs;
}

export function CostCalculation(props: CostCalculationProps) {
  const { onCostChanged, startCosts } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [costs, setCosts] = useState<Costs>(startCosts);
  const [sales, setSales] = useState<Sales>({
    costs,
    costPrice: 0,
    pricePerUnit: 0,
    volume: 0,
    revenue: 0,
    unitContributionMargin: 0,
    profit: 0,
  });
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  const changeSelectedTab = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const updateCostsAndSales = (newCosts: Costs) => {
    setCosts(newCosts);
    setSales({ ...sales, costs: newCosts });
  };

  const onFixCostsChanged = (fixCosts: Cost[]) =>
    updateCostsAndSales({ ...costs, fixCosts });

  const onVariableCostsChanged = (variableCosts: Cost[]) =>
    updateCostsAndSales({ ...costs, variableCosts });

  const onSalesChanged = (newSales: Sales) => {
    setSales(newSales);
  };

  useEffect(() => {
    if (
      (costs !== undefined &&
        !areCostsEqual(costs.fixCosts, startCosts.fixCosts)) ||
      !areCostsEqual(costs.variableCosts, startCosts.variableCosts)
    )
      onCostChanged(costs);
  }, [costs, startCosts, onCostChanged]);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        "& .MuiTextField-root": { width: "25ch" },
        "& .MuiInputBase-root": { paddingLeft: "5px", paddingRight: "0px" },
        "& .MuiInput-input": { paddingRight: "11px" },
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={changeSelectedTab}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="basic tabs example"
      >
        <Tab
          icon={<TextSnippetIcon />}
          label={isDesktopSize ? "Fixkosten" : ""}
          aria-label="Fixkosten"
        />
        <Tab
          icon={<AutoStoriesIcon />}
          label={isDesktopSize ? "Variable Kosten" : ""}
          aria-label="Variable Kosten"
        />
        <Tab
          icon={<EuroIcon />}
          label={isDesktopSize ? "Umsatz & Gewinn" : ""}
          aria-label="Umsatz & Gewinn"
        />
      </Tabs>
      <Divider />
      <CalculationTabPanel value={selectedTab} index={0}>
        <CostForm
          startCosts={costs.fixCosts}
          onCostChanged={onFixCostsChanged}
          isDesktopSize={isDesktopSize}
          title="Fixkosten"
        />
      </CalculationTabPanel>
      <CalculationTabPanel value={selectedTab} index={1}>
        <CostForm
          startCosts={costs.variableCosts}
          onCostChanged={onVariableCostsChanged}
          isDesktopSize={isDesktopSize}
          title="Variable Kosten"
        />
      </CalculationTabPanel>
      <CalculationTabPanel value={selectedTab} index={2}>
        <SalesForm
          onSalesChanged={onSalesChanged}
          startSales={sales}
          isDesktopSize={isDesktopSize}
        />
      </CalculationTabPanel>
    </Box>
  );
}
