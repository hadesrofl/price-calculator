import { Input, InputProps } from "@mui/material";

export default function HiddenInputField(props: InputProps) {
  return (
    <Input
      sx={{
        clipPath: "inset(50%)",
        position: "absolute",
      }}
      {...props}
    />
  );
}
