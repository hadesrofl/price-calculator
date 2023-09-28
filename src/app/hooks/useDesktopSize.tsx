import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Determines whether or not we have desktop size right now
 * @returns true in case we have a desktop size otherwise false
 */
export default function useDesktopSize(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("sm"));
}
