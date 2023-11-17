"use client";
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
import Link from "next/link";

/**
 * Create the application title bar for this application
 * @returns {JSX.Element} the application title bar
 */
export default function CalculatorAppBar(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation(TranslationsAppBar);
  return (
    <AppBar>
      <Toolbar disableGutters className="mx-2.5">
        <Grid container className="items-center">
          <Grid item xs={6}>
            <Stack className="justify-start" spacing={1} direction="row">
              <Logo classes="mt-2 self-center text-red-700" />
              <Link href="/">
                <Typography
                  variant="h6"
                  noWrap
                  component="span"
                  className="items-center mr-0.5 text-inherit no-underline font-mono font-bold tracking-[.3rem] hidden md:flex"
                >
                  {t("Title")}
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="justify-end" spacing={1} direction="row">
              <LanguageMenu />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
