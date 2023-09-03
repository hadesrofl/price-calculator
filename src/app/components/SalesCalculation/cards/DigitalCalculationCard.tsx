import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalculationCardProps from "./shared/CalculationCardProps";
import { CalculationCardContent } from "./CalculationCardContent";

export default function DigitalCalculationCard(props: CalculationCardProps) {
  const { minHeight, bookCosts, priceAndDiscount } = props;
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      sx={{
        minHeight: isDesktopSize && minHeight !== undefined ? minHeight : "0px",
      }}
    >
      <CardHeader
        title={<Typography variant="h6">Digitales Produkt</Typography>}
      ></CardHeader>
      <CardContent>
        <CalculationCardContent
          bookCosts={bookCosts}
          priceAndDiscount={priceAndDiscount}
          productType="digital"
        />
      </CardContent>
    </Card>
  );
}
