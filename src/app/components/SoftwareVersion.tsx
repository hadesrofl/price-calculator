import { Typography, TypographyProps, useTheme } from "@mui/material";

export default function SoftwareVersion(props: TypographyProps) {
  return (
    <Typography {...props}>
      Version {process.env.NEXT_PUBLIC_APP_VERSION}{" "}
    </Typography>
  );
}
