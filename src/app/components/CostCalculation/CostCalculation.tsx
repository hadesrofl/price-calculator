import {
  Box,
  Divider,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EuroIcon from "@mui/icons-material/Euro";
import CalculationTabPanel from "./components/CalculationTabPanel";
import ProductionCostForm, {
  ProductionCost,
} from "./components/forms/ProductionCostForm";
import {
  PriceAndDiscount,
  PricingForm,
} from "./components/forms/PricingForm/PricingForm";
import PrintCostForm, { PrintCost } from "./components/forms/PrintCostForm";
import { ProductType } from "../SalesCalculation/cards/CalculationCardContent";
import areProductCostsEqual from "@/app/helper/areProductCostsEqual";
import arePriceAndDiscountEqual from "@/app/helper/arePriceAndDiscountEqual";
import arePrintCostsEqual from "@/app/helper/arePrintCostsEqual";

export type PriceAndDiscountsPerProductType = {
  digitalPriceAndDiscount: PriceAndDiscount;
  printPriceAndDiscount: PriceAndDiscount;
};

export interface CostCalculationProps {
  onCostChanged: (newCosts: BookCosts) => void;
  startCosts: BookCosts;
  onPriceAndDiscountChanged: (
    newPriceAndDiscount: PriceAndDiscountsPerProductType
  ) => void;
  startPriceAndDiscount: PriceAndDiscountsPerProductType;
}

export type BookCosts = {
  productionCosts: ProductionCost;
  printCosts: PrintCost;
};

export function CostCalculation(props: CostCalculationProps) {
  const {
    onCostChanged,
    startCosts,
    startPriceAndDiscount,
    onPriceAndDiscountChanged,
  } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [bookCosts, setBookCosts] = useState<BookCosts>(startCosts);
  const [priceAndDiscount, setPriceAndDiscount] =
    useState<PriceAndDiscountsPerProductType>(startPriceAndDiscount);
  const theme = useTheme();
  const isDesktopSize = useMediaQuery(theme.breakpoints.up("sm"));

  const changeSelectedTab = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const onProductionCostChanged = (productionCost: ProductionCost) => {
    setBookCosts({ ...bookCosts, productionCosts: productionCost });
  };

  const onPrintingCostChanged = (printCost: PrintCost) => {
    setBookCosts({ ...bookCosts, printCosts: printCost });
  };

  const onPriceAndDiscountChange = (
    newPriceAndDiscount: PriceAndDiscount,
    productType: ProductType
  ) => {
    switch (productType) {
      case "digital":
        setPriceAndDiscount({
          ...priceAndDiscount,
          digitalPriceAndDiscount: newPriceAndDiscount,
        });
        break;
      case "print":
        setPriceAndDiscount({
          ...priceAndDiscount,
          printPriceAndDiscount: newPriceAndDiscount,
        });
        break;
      case "bundle":
        break;
    }
  };

  useEffect(() => {
    if (
      (bookCosts !== undefined &&
        !areProductCostsEqual(
          bookCosts.productionCosts,
          startCosts.productionCosts
        )) ||
      !arePrintCostsEqual(bookCosts.printCosts, startCosts.printCosts)
    )
      onCostChanged(bookCosts);
  }, [bookCosts, startCosts, onCostChanged]);

  useEffect(() => {
    if (
      (priceAndDiscount !== undefined &&
        !arePriceAndDiscountEqual(
          priceAndDiscount.digitalPriceAndDiscount,
          startPriceAndDiscount.digitalPriceAndDiscount
        )) ||
      !arePriceAndDiscountEqual(
        priceAndDiscount.printPriceAndDiscount,
        startPriceAndDiscount.printPriceAndDiscount
      )
    )
      onPriceAndDiscountChanged(priceAndDiscount);
  }, [priceAndDiscount, startPriceAndDiscount, onPriceAndDiscountChanged]);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        "& .MuiTextField-root": { width: "25ch" },
        "& .MuiInputBase-root": { paddingLeft: "5px", paddingRight: "0px" },
        "& .MuiInput-input": { paddingRight: "11px" },
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={changeSelectedTab}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="basic tabs example"
      >
        <Tab
          icon={<TextSnippetIcon />}
          label={isDesktopSize ? "Produktionskosten" : ""}
          aria-label="Produktionskosten"
        />
        <Tab
          icon={<AutoStoriesIcon />}
          label={isDesktopSize ? "Kosten Druckprodukt" : ""}
          aria-label="Kosten Druckprodukt"
        />
        <Tab
          icon={<EuroIcon />}
          label={isDesktopSize ? "Preisbildung" : ""}
          aria-label="Preisbildung"
        />
      </Tabs>
      <Divider />
      <CalculationTabPanel value={selectedTab} index={0}>
        <ProductionCostForm
          startCosts={bookCosts.productionCosts}
          onCostChanged={onProductionCostChanged}
          isDesktopSize={isDesktopSize}
        />
      </CalculationTabPanel>
      <CalculationTabPanel value={selectedTab} index={1}>
        <PrintCostForm
          onCostChanged={onPrintingCostChanged}
          startCosts={bookCosts.printCosts}
          isDesktopSize={isDesktopSize}
        />
      </CalculationTabPanel>
      <CalculationTabPanel value={selectedTab} index={2}>
        <PricingForm
          digitalStartPriceAndDiscount={
            priceAndDiscount.digitalPriceAndDiscount
          }
          printStartPriceAndDiscount={priceAndDiscount.printPriceAndDiscount}
          onPriceAndDiscountChange={onPriceAndDiscountChange}
          isDesktopSize={isDesktopSize}
        />
      </CalculationTabPanel>
    </Box>
  );
}
