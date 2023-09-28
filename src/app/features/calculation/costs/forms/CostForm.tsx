import {
  Stack,
  Grid,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";
import { Cost } from "../types/Costs";
import useTextFieldStyles from "../styles/useTextFieldStyles";
import NumberInput from "../components/inputs/NumberInput";
import {
  labelSchema,
  useCostValidator,
  valueSchema,
} from "./validation/useCostValidator";
import Delete from "@mui/icons-material/Delete";
import AddCircle from "@mui/icons-material/AddCircle";

/**
 * Interface for the properties of the {@link CostForm} like a handler in case cost changed
 */
export interface CostFormProps extends IsDesktopSizeProps {
  onCostChanged: (costs: Cost[]) => void;
  costs: Cost[];
  title: string;
  currency: string;
}

/**
 * Creates a cost form that handles fields for inputting different costs
 * @param {CostFormProps} props Are the properties of this form like an update function in case costs changed
 * @returns {JSX.Element} the form as JSX.Element
 */
export default function CostForm(props: CostFormProps): JSX.Element {
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
          {costs.map((cost, idx) => {
            const onDeleteCost = () => {
              const newCosts = costs.filter((_, i) => i !== idx);
              onCostChanged([...newCosts]);
            };
            return (
              <Grid container key={idx} marginBottom={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    size="small"
                    type="text"
                    placeholder="Kostenname"
                    value={cost.label}
                    name={`${idx.toString()}_label`}
                    inputProps={{ style: textFieldSx }}
                    onChange={onLabelChanged}
                    error={hasError(`${idx.toString()}_label`) ? true : false}
                    helperText={
                      hasError(`${idx.toString()}_label`)
                        ? getError(`${idx.toString()}_label`)
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="end">
                    <NumberInput
                      value={cost.value}
                      name={`${idx.toString()}_value`}
                      customAdornmentText={currency}
                      onChange={onValueChanged}
                      error={hasError(`${idx.toString()}_value`) ? true : false}
                      helperText={
                        hasError(`${idx.toString()}_value`)
                          ? getError(`${idx.toString()}_value`)
                          : ""
                      }
                    />
                    <IconButton onClick={onDeleteCost} color="error">
                      <Delete />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={12} md={6}>
            <IconButton color="success" onClick={addInputField}>
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}