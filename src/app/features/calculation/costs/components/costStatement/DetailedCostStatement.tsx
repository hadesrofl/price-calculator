import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from "@mui/material";
import CostStatement from "./CostStatement";
import { Costs, calculateTotalCosts } from "../../types/Costs";

export interface DetailedCostStatementProps {
  costs: Costs;
  currency: string;
}

export default function DetailedCostStatement(
  props: DetailedCostStatementProps
) {
  const { costs, currency } = props;

  return (
    <Accordion
      disabled={
        calculateTotalCosts(costs.fixCosts) === 0 &&
        calculateTotalCosts(costs.variableCosts) === 0
      }
    >
      <AccordionSummary expandIcon={<ExpandMore />} id="kostenaufstellung">
        <Typography variant="subtitle1">Kostenaufstellung</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <CostStatement
            costs={costs.fixCosts}
            currency={currency}
            title="Fixkosten"
          />
          <CostStatement
            costs={costs.variableCosts}
            currency={currency}
            title="Variable Kosten"
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
