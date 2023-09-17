"use client";
import { Stack, Divider, Box, useMediaQuery, useTheme } from "@mui/material";
import { CostCalculation } from "./features/calculation/costs/CostCalculation";
import { useState } from "react";
import CalculatorAppBar from "./components/appBar/CalculatorAppBar";
import CalculatorBottomBar from "./components/appBar/CalculatorBottomBar";
import { Costs } from "./features/calculation/costs/types/Costs";

export default function Home() {
  const [costs, setCosts] = useState<Costs>({
    fixCosts: [],
    variableCosts: [],
  });
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  const onCostChanged = (newCosts: Costs) => {
    setCosts(newCosts);
  };

  return (
    <Box width="100%">
      <CalculatorAppBar />
      <Box component="main" sx={{ paddingTop: 7 }}>
        <Stack spacing={2} marginRight="5%" marginBottom="5%">
          <Divider />
          <CostCalculation startCosts={costs} onCostChanged={onCostChanged} />
          <CalculatorBottomBar isDesktopSize={isDesktopSize} />
        </Stack>
      </Box>
    </Box>
  );
}
