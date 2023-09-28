import { AppBar, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import Logo from "../Logo";

/**
 * Create the application title bar for this application
 * @returns {JSX.Element} the application title bar
 */
export default function CalculatorAppBar(): JSX.Element {
  const theme = useTheme();
  const title = "Price Calculator";
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
            {title}
          </Typography>
        </Stack>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
