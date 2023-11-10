import {
  Card,
  CardContent,
  CardHeader,
  Stack,
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
            sx={{
              color: theme.palette.getContrastText(color),
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        }
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
