import { useTheme } from "@mui/material";
import { CSSProperties } from "react";

export default function useTextFieldStyles() {
  const theme = useTheme();

  const textFieldSx: CSSProperties = { textAlign: "right" };
  const textFieldReadonlySx: CSSProperties = {
    background: theme.palette.background.default,
    ...textFieldSx,
  };
  return { textFieldSx, textFieldReadonlySx };
}
