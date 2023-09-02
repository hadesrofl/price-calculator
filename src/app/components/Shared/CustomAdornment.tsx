import { InputAdornment } from "@mui/material";

export interface CustomAdornmentProps {
  text: string;
}

export function CustomAdornment(props: CustomAdornmentProps) {
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
