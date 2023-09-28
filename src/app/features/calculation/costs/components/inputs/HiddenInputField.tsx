import { Input, InputProps } from "@mui/material";

/**
 * Creates a hidden input field. This is used to hide the input field behind the import button
 * @param {InputProps} props Are the properties for the input field
 * @returns {JSX.Element} An input field that is hidden from the user
 */
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
