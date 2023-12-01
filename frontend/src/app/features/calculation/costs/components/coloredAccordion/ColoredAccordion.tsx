import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useTheme,
} from "@mui/material";

type ColoredAccordionProps = {
  disabled?: boolean;
  titleColor: string;
  title: string;
  children: React.ReactNode | React.ReactNode[];
};

export default function ColoredAccordion(props: ColoredAccordionProps) {
  const { disabled, title, titleColor, children } = props;
  const theme = useTheme();
  return (
    <Accordion disabled={disabled}>
      <AccordionSummary
        sx={{ background: titleColor }}
        expandIcon={
          <ExpandMore
            sx={{
              color: theme.palette.getContrastText(titleColor),
            }}
          />
        }
      >
        <Typography
          color={theme.palette.getContrastText(titleColor)}
          variant="h5"
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
