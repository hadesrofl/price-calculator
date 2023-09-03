import { AppBar, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import Logo from "../Logo";

export default function CalculatorAppBar() {
  const theme = useTheme();
  return (
    <AppBar component="nav">
      {/* <Container> */}
      <Toolbar disableGutters sx={{ marginLeft: "10px", marginRight: "10px" }}>
        <Stack alignItems="left" spacing={1} direction="row">
          <Logo
            style={{
              color: "red",
              marginTop: 2,
              alignSelf: "center",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            alignItems="center"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Book Price Calculator
          </Typography>
        </Stack>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
