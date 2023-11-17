import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

type ColoredCardProps = {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
  color: string;
};

export default function ColoredCard(props: ColoredCardProps) {
  const theme = useTheme();
  const { children, color, title } = props;
  return (
    <Card>
      <CardHeader
        sx={{ background: color }}
        title={
          <Typography
            variant="h6"
            color={theme.palette.getContrastText(color)}
            className="text-center"
          >
            {title}
          </Typography>
        }
      />
      <CardContent className="flex justify-center">{children}</CardContent>
    </Card>
  );
}
