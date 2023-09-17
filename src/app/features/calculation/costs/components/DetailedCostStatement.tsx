import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Divider,
} from "@mui/material";
import { Costs, calculateTotalCosts } from "../types/Costs";

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
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Fixkosten</Typography>
            </Grid>

            {costs.fixCosts.map((cost, i) => {
              return (
                <Grid container key={cost.label}>
                  <Grid item xs={12} sm={6}>
                    <Typography>{cost.label}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      {cost.value} {currency}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={7}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography>Summe</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {calculateTotalCosts(costs.fixCosts)} {currency}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Variable Kosten</Typography>
            </Grid>
            {costs.variableCosts.map((cost, i) => {
              return (
                <Grid container key={cost.label}>
                  <Grid item xs={12} sm={6}>
                    <Typography>{cost.label}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      {cost.value} {currency}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={7}>
              <Divider />
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography>Summe</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {calculateTotalCosts(costs.variableCosts)} {currency}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
