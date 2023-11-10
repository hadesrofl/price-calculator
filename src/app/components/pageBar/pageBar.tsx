"use client";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsRouteNames } from "@/app/i18n/locales/translationNamespaces";
import { ServicesRoute } from "@/app/routes";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

function translatePathToRouteName(pathName: string) {
  if (pathName.length === 1) return "Services";

  const isServicesRoute = pathName.indexOf(ServicesRoute) !== -1 ? true : false;
  if (!isServicesRoute) return "Unknown";
  const subServiceRoute = pathName.replace(ServicesRoute, "").slice(1);
  const firstPathSeparator = subServiceRoute.indexOf("/");
  const routeName =
    firstPathSeparator === -1
      ? subServiceRoute.substring(0, subServiceRoute.length)
      : subServiceRoute.substring(0, firstPathSeparator);
  return capitalize(routeName.replaceAll("-", " "));
}

function capitalize(sentence: string) {
  const words = sentence.split(" ");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join("");
}

export default function PageBar() {
  const router = useRouter();
  const pathName = usePathname();
  const { t } = useTranslation(TranslationsRouteNames);
  const title = t(translatePathToRouteName(pathName));

  return (
    <Grid container>
      <Grid item>
        {pathName !== "/" ? (
          <IconButton onClick={router.back}>
            <ArrowBack />
          </IconButton>
        ) : (
          <IconButton />
        )}
      </Grid>
      <Grid item xs={11}>
        <Typography component="span" variant="h4">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}
