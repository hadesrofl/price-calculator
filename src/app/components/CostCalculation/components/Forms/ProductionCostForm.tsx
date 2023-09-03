import { CustomAdornment } from "@/app/components/Shared/CustomAdornment";
import IsDesktopSizeProps from "@/app/components/Shared/IsDesktopSizeProp";
import { Stack, Grid, Typography, TextField, Box } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

export type ProductionCost = {
  salary: number;
  additionalCosts: number;
  totalCosts: number;
};

export interface ProductCostFormProps extends IsDesktopSizeProps {
  onCostChanged: (productionCost: ProductionCost) => void;
  startCosts: ProductionCost;
}

export default function ProductionCostForm(props: ProductCostFormProps) {
  const { onCostChanged, startCosts, isDesktopSize } = props;
  const [costs, setCosts] = useState<ProductionCost>(startCosts);
  const [totalCosts, setTotalCosts] = useState<number>(0);
  const title = "Produktionskosten";

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
    <Stack alignItems="left">
      {isDesktopSize ? <Box /> : <Typography variant="h5">{title}</Typography>}
      <Stack direction={isDesktopSize ? "row" : "column"} spacing={2}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Einzelposten</Typography>
          </Grid>
          <Grid alignSelf="center" item xs={12} md={6}>
            <Typography>Eigener Lohn</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ style: textFieldSx }}
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
              value={costs.salary}
              required
              variant="filled"
              size="small"
              name="salary"
              type="tel"
              onChange={onInputChange}
            />
          </Grid>
          <Grid alignSelf="center" item xs={12} md={6}>
            <Typography>Zusätzliche Kosten</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
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
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
              value={costs.additionalCosts}
              size="small"
              name="additionalCosts"
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Summe</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Gesamtkosten</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              inputProps={{ readOnly: true, style: textFieldSx }}
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
              value={totalCosts}
              variant="standard"
              type="tel"
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
