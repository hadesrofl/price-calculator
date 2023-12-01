import { Inter } from "next/font/google";
import CalculatorAppBar from "./components/appBar/CalculatorAppBar";
import CalculatorBottomBar from "./components/appBar/CalculatorBottomBar";
import { Box } from "@mui/material";
import "./global.css";
import PageBar from "./components/pageBar/pageBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <CalculatorAppBar />
        </nav>

        <Box component="main" sx={{ paddingTop: 10, marginBottom: 5 }}>
          <Box sx={{ marginBottom: 2 }}>
            <PageBar />
          </Box>
          {children}
        </Box>
        <footer>
          <CalculatorBottomBar />
        </footer>
      </body>
    </html>
  );
}
