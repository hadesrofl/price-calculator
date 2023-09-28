import { StandardTextFieldProps, TextField, useTheme } from "@mui/material";
import useTextFieldStyles from "../../styles/useTextFieldStyles";

/**
 * An interface for {@link NumberInput} to allow customization of the input
 */
export interface NumberInputProps extends StandardTextFieldProps {
  customAdornmentText: string;
  readonly?: boolean;
  onlyPositiveValues?: boolean;
}

/**
 * Creates a number input that allows custom symbols and only positive values by the given properties
 * @param {NumberInputProps} props Are the properties for the number input
 * @returns {JSX.Element} the number input element
 */
export default function NumberInput(props: NumberInputProps) {
  const {
    inputProps,
    InputProps,
    customAdornmentText,
    readonly,
    onlyPositiveValues,
    sx,
    ...otherProps
  } = props;
  const theme = useTheme();
  const { textFieldSx, textFieldReadonlySx } = useTextFieldStyles();

  return (
    <TextField
      size="small"
      variant="filled"
      type="number"
      sx={{
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
        ...sx,
      }}
      inputProps={{
        style: readonly ? textFieldReadonlySx : textFieldSx,
        min: onlyPositiveValues ? 0 : undefined,
        ...inputProps,
      }}
      InputProps={{
        readOnly: readonly,
        style: readonly
          ? { background: theme.palette.background.default }
          : undefined,
        // startAdornment: <CustomAdornment text={customAdornmentText} />,
        ...InputProps,
      }}
      {...otherProps}
    />
  );
}
