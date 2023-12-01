import { Typography, TypographyProps } from "@mui/material";

/**
 * Creates a {@link JSX.Element} of the software version
 * @param {TypographyProps} props Are the properties for the software version element
 * @returns {JSX.Element} the software version as JSX.Element
 */
export default function SoftwareVersion(props: TypographyProps) {
  return (
    <Typography {...props}>
      Version {process.env.NEXT_PUBLIC_APP_VERSION}{" "}
    </Typography>
  );
}
