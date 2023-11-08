"use client";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { TranslationsServiceBoard } from "@/app/i18n/locales/translationNamespaces";
import { CostCalculationRoute } from "@/app/routes";

export default function ServiceBoard() {
  const { t } = useTranslation(TranslationsServiceBoard);
  return (
    <Grid container>
      <Grid item xs={3}>
        <Link href={CostCalculationRoute}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <EuroIcon sx={{ marginRight: 2 }} />
              <Typography
                component="span"
                variant="body1"
                sx={{ verticalAlign: "top" }}
              >
                {t("CostCalculation")}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}
