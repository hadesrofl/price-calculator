import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Logo from "../Logo";
import SoftwareVersion from "../SoftwareVersion";

export default function CalculatorBottomBar() {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35px",
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
          alignItems: "baseline",
          marginTop: "10px",
          justifyContent: "space-around",
        }}
      >
        <SoftwareVersion variant="subtitle2" />
        <a href="https://www.flaticon.com/free-icons/price">
          {" "}
          <Typography variant="subtitle2" noWrap>
            Logo created by juicy_fish - Flaticon
          </Typography>
        </a>
      </BottomNavigation>
    </Paper>
  );
}
