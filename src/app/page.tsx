"use client";
import { Stack, Divider, Box, useMediaQuery, useTheme } from "@mui/material";
import { CostCalculation } from "./features/calculation/costs/CostCalculation";
import CalculatorAppBar from "./components/appBar/CalculatorAppBar";
import CalculatorBottomBar from "./components/appBar/CalculatorBottomBar";

export default function Home() {
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box width="100%">
      <CalculatorAppBar />
      <Box component="main" sx={{ paddingTop: 7 }}>
        <Stack spacing={2} marginRight="5%" marginBottom="5%">
          <Divider />
          <CostCalculation />
          <CalculatorBottomBar isDesktopSize={isDesktopSize} />
        </Stack>
      </Box>
    </Box>
  );
}
