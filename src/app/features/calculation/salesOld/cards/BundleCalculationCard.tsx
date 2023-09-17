import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalculationCardProps from "./shared/CalculationCardProps";
import { CalculationCardContent } from "./shared/CalculationCardContent";

export default function BundleCalculationCard(props: CalculationCardProps) {
  const { minHeight, bookCosts, priceAndDiscount } = props;
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card
      sx={{
        minHeight: isDesktopSize && minHeight !== undefined ? minHeight : "0px",
      }}
    >
      <CardHeader
        title={<Typography variant="h6">Bundle (Digital + Druck)</Typography>}
      ></CardHeader>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography>Umsatz Auflage</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>0 €</Typography>
          </Grid>
          <Grid item xs={12}>
            <CalculationCardContent
              bookCosts={bookCosts}
              priceAndDiscount={priceAndDiscount}
              productType="bundle"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
