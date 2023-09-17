import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SoftwareVersion from "../SoftwareVersion";
import IsDesktopSizeProps from "../shared/IsDesktopSizeProp";

export default function CalculatorBottomBar(props: IsDesktopSizeProps) {
  const { isDesktopSize } = props;
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        minHeigh: "20px",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          alignItems: "center",
          marginTop: "0px",
          justifyContent: "space-around",
        }}
      >
        <BottomNavigationAction
          disabled
          label={<SoftwareVersion variant="subtitle2" color="InfoText" />}
        />
        <BottomNavigationAction
          label={
            <a href="https://www.flaticon.com/free-icons/price">
              {" "}
              <Typography variant="subtitle2" noWrap={isDesktopSize}>
                Logo created by juicy_fish - Flaticon
              </Typography>
            </a>
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
