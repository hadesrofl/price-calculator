import {
  Box,
  Divider,
  Stack,
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
import { Cost } from "./types/Costs";
import {
  Sales,
  areSalesEqual,
  createEmptySales,
  setUndefinedValuesAfterImport,
} from "./types/Sales";
import ExportButton from "./components/buttons/ExportButton";
import ImportButton from "./components/buttons/ImportButton";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsCostCalculation } from "@/app/i18n/locales/translationNamespaces";

enum CalculatorTabs {
  FixCosts,
  VariableCosts,
  Sales,
}

/**
 * Creates the cost calculation, meaning the cost and sales form to work out a pricing calucation with
 * @returns {JSX.Element} the cost calculation as an JSX.Element
 */
export function CostCalculation(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(0);
  const currency = "€";
  const exportFileName = "calculation.json";
  const [importData, setImportData] = useState<Sales>(
    createEmptySales(currency)
  );
  const [sales, setSales] = useState<Sales>(createEmptySales(currency));
  const theme = useTheme();
  const { t } = useTranslation(TranslationsCostCalculation);
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  const changeSelectedTab = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const onFixCostsChanged = (fixCosts: Cost[]) => {
    const newCosts = { ...sales.costs, fixCosts };
    setSales({ ...sales, costs: newCosts });
  };

  const onVariableCostsChanged = (variableCosts: Cost[]) => {
    const newCosts = { ...sales.costs, variableCosts };
    setSales({ ...sales, costs: newCosts });
  };

  const onSalesChanged = (newSales: Sales) => {
    if (!areSalesEqual(sales, newSales)) setSales(newSales);
  };

  const onImport = (fileContent: string) => {
    const jsonData: Sales = JSON.parse(fileContent);
    if (jsonData !== undefined && jsonData !== null) {
      const importedSales = setUndefinedValuesAfterImport(jsonData);
      setImportData(importedSales);
    }
  };

  useEffect(() => {
    setSales({ ...importData });
  }, [importData]);

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
      <Stack direction="row">
        <Tabs
          value={selectedTab}
          onChange={changeSelectedTab}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="cost calculation tabs"
        >
          <Tab
            icon={<TextSnippetIcon />}
            label={isDesktopSize ? t("FixedCosts") : ""}
            aria-label={t("FixedCosts")}
          />
          <Tab
            icon={<AutoStoriesIcon />}
            label={isDesktopSize ? t("VariableCosts") : ""}
            aria-label={t("VariableCosts")}
          />
          <Tab
            icon={<EuroIcon />}
            label={isDesktopSize ? t("SalesAndProfit") : ""}
            aria-label={t("SalesAndProfit")}
          />
        </Tabs>
        <ImportButton onUpload={onImport} />
        <ExportButton exportData={sales} exportFileName={exportFileName} />
      </Stack>

      <Divider />
      <CalculationTabPanel value={selectedTab} index={CalculatorTabs.FixCosts}>
        <CostForm
          costs={sales.costs.fixCosts}
          onCostChanged={onFixCostsChanged}
          title={t("FixedCosts")}
          currency={currency}
        />
      </CalculationTabPanel>
      <CalculationTabPanel
        value={selectedTab}
        index={CalculatorTabs.VariableCosts}
      >
        <CostForm
          costs={sales.costs.variableCosts}
          onCostChanged={onVariableCostsChanged}
          title={t("VariableCosts")}
          currency={currency}
        />
      </CalculationTabPanel>
      <CalculationTabPanel value={selectedTab} index={CalculatorTabs.Sales}>
        <SalesForm
          onSalesChanged={onSalesChanged}
          sales={sales}
          currency={currency}
        />
      </CalculationTabPanel>
    </Box>
  );
}
