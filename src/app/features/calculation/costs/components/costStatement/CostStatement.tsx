import { Divider, Grid, Typography } from "@mui/material";
import { Cost, calculateTotalCosts } from "../../types/Costs";

interface CostStatementProps {
  costs: Cost[];
  currency: string;
  title: string;
}

export default function CostStatement(props: CostStatementProps) {
  const { costs, currency, title } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{title}</Typography>
      </Grid>

      {costs.map((cost) => {
        return (
          <Grid container key={cost.label} marginBottom={1}>
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
            {calculateTotalCosts(costs)} {currency}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
