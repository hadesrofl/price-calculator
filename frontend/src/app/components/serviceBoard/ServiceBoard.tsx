"use client";
import { Grid, Typography, useTheme } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { TranslationsServiceBoard } from "@/app/i18n/locales/translationNamespaces";
import { CostCalculationRoute } from "@/app/routes";
import ColoredCard from "../coloredCard/coloredCard";

export default function ServiceBoard() {
  const { t } = useTranslation(TranslationsServiceBoard);
  const theme = useTheme();
  return (
    <Grid container className="mx-0.5" spacing={2}>
      <Grid item xs={11} sm={6} md={3}>
        <Link href={CostCalculationRoute}>
          <ColoredCard color={theme.palette.primary.main}>
            <EuroIcon className="mr-4" />
            <Typography component="span" variant="body1" className="align-top">
              {t("CostCalculation")}
            </Typography>
          </ColoredCard>
        </Link>
      </Grid>
    </Grid>
  );
}
