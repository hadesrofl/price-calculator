import {
  AppBar,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "../Logo";
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsAppBar } from "@/app/i18n/locales/translationNamespaces";

/**
 * Create the application title bar for this application
 * @returns {JSX.Element} the application title bar
 */
export default function CalculatorAppBar(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation(TranslationsAppBar);
  return (
    <AppBar component="nav">
      <Toolbar disableGutters sx={{ marginLeft: "10px", marginRight: "10px" }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack justifyContent="start" spacing={1} direction="row">
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
                {t("Title")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack justifyContent="end" spacing={1} direction="row">
              <LanguageMenu />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
