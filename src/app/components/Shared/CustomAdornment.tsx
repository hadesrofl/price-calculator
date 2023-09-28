import { InputAdornment } from "@mui/material";

/**
 * An interface for the properties of {@link CustomAdornment}
 */
export interface CustomAdornmentProps {
  text: string;
}

/**
 * Create a custom adornment for input fields
 * @param {CustomAdornmentProps} props Are the properties of this adornment
 * @returns {JSX.Element} the adornment as JSX.Element
 */
export function CustomAdornment(props: CustomAdornmentProps): JSX.Element {
  const { text } = props;
  return (
    <InputAdornment
      sx={{ marginLeft: "10px", marginRight: "10px" }}
      position="start"
    >
      {text}
    </InputAdornment>
  );
}
