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
import { Discount } from "../../types/Discount";

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
            discount={discount}
            currency={currency}
            title="Variable Kosten"
          />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
