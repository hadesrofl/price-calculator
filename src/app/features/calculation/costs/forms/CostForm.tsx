import {
  Stack,
  Grid,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";
import Add from "@mui/icons-material/Add";
import { Cost } from "../types/Costs";
import useTextFieldStyles from "../styles/useTextFieldStyles";
import NumberInput from "../components/inputs/NumberInput";
import {
  labelSchema,
  useCostValidator,
  valueSchema,
} from "./validation/useCostValidator";

export interface CostFormProps extends IsDesktopSizeProps {
  onCostChanged: (costs: Cost[]) => void;
  costs: Cost[];
  title: string;
  currency: string;
}

export default function CostForm(props: CostFormProps) {
  const { onCostChanged, costs, isDesktopSize, title, currency } = props;
  const { textFieldSx } = useTextFieldStyles();
  const { validate, hasError, getError } = useCostValidator();

  const onLabelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(labelSchema, event);
    const newCosts = [...costs];
    var index = Number.parseInt(event.target.name);
    newCosts[index].label = value.toString();
    onCostChanged([...newCosts]);
  };

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = validate(valueSchema, event);
    const newCosts = [...costs];
    var index = Number.parseInt(event.target.name);
    newCosts[index].value = Number.parseFloat(value.toString());
    onCostChanged([...newCosts]);
  };

  const addInputField = () => {
    onCostChanged([...costs, { label: "", value: 0, currency }]);
  };

  return (
    <Stack alignItems="left">
      {isDesktopSize ? <Box /> : <Typography variant="h5">{title}</Typography>}
      <Stack direction={isDesktopSize ? "row" : "column"} spacing={2}>
        <Grid container rowSpacing={2}>
          {costs.map((cost, i) => {
            return (
              <Grid container key={i}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    size="small"
                    type="text"
                    placeholder="Kostenname"
                    value={cost.label}
                    name={`${i.toString()}_label`}
                    inputProps={{ style: textFieldSx }}
                    onChange={onLabelChanged}
                    error={hasError(`${i.toString()}_label`) ? true : false}
                    helperText={
                      hasError(`${i.toString()}_label`)
                        ? getError(`${i.toString()}_label`)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput
                    value={cost.value}
                    name={`${i.toString()}_value`}
                    customAdornmentText={currency}
                    onChange={onValueChanged}
                    error={hasError(`${i.toString()}_value`) ? true : false}
                    helperText={
                      hasError(`${i.toString()}_value`)
                        ? getError(`${i.toString()}_value`)
                        : ""
                    }
                  />
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={12} md={6}>
            <IconButton color="success" onClick={addInputField}>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
