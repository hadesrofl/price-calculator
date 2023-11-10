import { Button, ButtonOwnProps, Tooltip } from "@mui/material";

interface ButtonWithToolTipProps extends ButtonOwnProps {
  tooltipText: string;
  disabled: boolean;
}

/**
 * Creates a button with a tool tip wrapped around it
 * @param {ButtonWithToolTipProps} props Are the properties for this button
 * @returns the button and tooltip as one JSX.Element
 */
export default function ButtonWithTooltip(
  props: ButtonWithToolTipProps
): JSX.Element {
  const { tooltipText, ...other } = props;
  return (
    <Tooltip title={tooltipText}>
      <span style={{ alignSelf: "end" }}>
        <Button
          sx={{ justifyContent: "left", alignSelf: "center", ...other.sx }}
          {...other}
        />
      </span>
    </Tooltip>
  );
}
