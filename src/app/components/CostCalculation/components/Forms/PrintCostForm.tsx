import { CustomAdornment } from "@/app/components/Shared/CustomAdornment";
import IsDesktopSizeProps from "@/app/components/Shared/IsDesktopSizeProp";
import arePrintCostsEqual from "@/app/helper/arePrintCostsEqual";
import { Stack, Grid, Typography, TextField, Box } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

export type PrintCost = {
  amount: number;
  printingCost: number;
  additionalCostPerIssue: number;
};

export interface PrintCostFormProps extends IsDesktopSizeProps {
  onCostChanged: (printCost: PrintCost) => void;
  startCosts: PrintCost;
}

export default function PrintCostForm(props: PrintCostFormProps) {
  const { onCostChanged, startCosts, isDesktopSize } = props;
  const [costs, setCosts] = useState<PrintCost>(startCosts);
  const [totalCosts, setTotalCosts] = useState<number>(0);
  const title = "Kosten Druckprodukt";

  useEffect(() => {
    if (!arePrintCostsEqual(costs, startCosts)) onCostChanged(costs);
  }, [costs, onCostChanged, startCosts]);

  useEffect(() => {
    setTotalCosts(
      costs.printingCost + costs.additionalCostPerIssue * costs.amount
    );
  }, [costs.additionalCostPerIssue, costs.amount, costs.printingCost]);

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
          <Grid item xs={12} md={6}>
            <Typography>Anzahl</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="filled"
              size="small"
              type="tel"
              value={costs.amount}
              name="amount"
              inputProps={{ style: textFieldSx }}
              InputProps={{ startAdornment: <CustomAdornment text="Stk." /> }}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Druckkosten</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="filled"
              type="tel"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: textFieldSx,
              }}
              value={costs.printingCost}
              name="printingCost"
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
              size="small"
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Zusätzliche Kosten/Exemplar</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="filled"
              type="tel"
              size="small"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                style: textFieldSx,
              }}
              value={costs.additionalCostPerIssue}
              name="additionalCostPerIssue"
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
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
              variant="standard"
              value={totalCosts}
              size="small"
              inputProps={{ readOnly: true, style: textFieldSx }}
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>Gesamtkosten/Exemplar</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              value={costs.amount !== 0 ? totalCosts / costs.amount : 0}
              size="small"
              inputProps={{ readOnly: true, style: textFieldSx }}
              InputProps={{
                startAdornment: <CustomAdornment text={currency} />,
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
