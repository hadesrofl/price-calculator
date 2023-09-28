import { useTheme } from "@mui/material";
import { CSSProperties } from "react";

/**
 * Returns the text field styling for input fields
 * @returns the {@link CSSProperties} for styling of text fields
 */
export default function useTextFieldStyles() {
  const theme = useTheme();

  const textFieldSx: CSSProperties = { textAlign: "right" };
  const textFieldReadonlySx: CSSProperties = {
    background: theme.palette.background.default,
    ...textFieldSx,
  };
  return { textFieldSx, textFieldReadonlySx };
}
