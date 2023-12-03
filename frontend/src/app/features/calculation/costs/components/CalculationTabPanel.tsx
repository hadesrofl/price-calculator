import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

/**
 * Creates a tab panel for the {@link CostCalculation} and the given child elements
 * @param {TabPanelProps} props Are the properties for the tab panel. The value is the selected tab, while the index is this tabs number.
 * @returns {JSX.Element} the tab panel element and its children
 */
export default function CalculationTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`calculation-tabpanel-${index}`}
      aria-labelledby={`calculation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}
