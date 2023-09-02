import { CustomAdornment } from "@/app/components/Shared/CustomAdornment";
import { Stack, Grid, Typography, TextField } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

export type ProductionCost = {
  salary: number;
  additionalCosts: number;
  totalCosts: number;
};

export interface ProductCostFormProps {
  onCostChanged: (productionCost: ProductionCost) => void;
  startCosts: ProductionCost;
}

export default function ProductionCostForm(props: ProductCostFormProps) {
  const { onCostChanged, startCosts } = props;
  const [costs, setCosts] = useState<ProductionCost>(startCosts);

  const [totalCosts, setTotalCosts] = useState<number>(0);

  useEffect(() => {
    setTotalCosts(costs.salary + costs.additionalCosts);
  }, [costs]);

  useEffect(() => {
    onCostChanged({ ...costs, totalCosts });
  }, [costs, totalCosts, onCostChanged]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCosts({
      ...costs,
      [event.target.name]: Number.parseInt(event.target.value),
    });

  const textFieldSx: CSSProperties = { textAlign: "right" };
  const currency = "€";
  return (
    <Stack justifyContent="center">
      <Grid alignItems="center" container spacing={2}>
        <Grid item xs={3}>
          <Typography>Eigener Lohn</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            inputProps={{ style: textFieldSx }}
            InputProps={{ startAdornment: <CustomAdornment text={currency} /> }}
            value={costs.salary}
            required
            variant="filled"
            size="small"
            name="salary"
            type="tel"
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Zusätzliche Kosten</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="filled"
            required
            sx={{ textAlign: "right" }}
            type="tel"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: textFieldSx,
            }}
            InputProps={{ startAdornment: <CustomAdornment text={currency} /> }}
            value={costs.additionalCosts}
            size="small"
            name="additionalCosts"
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Gesamtkosten</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            inputProps={{ readOnly: true, style: textFieldSx }}
            InputProps={{ startAdornment: <CustomAdornment text={currency} /> }}
            value={totalCosts}
            variant="standard"
            type="tel"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
