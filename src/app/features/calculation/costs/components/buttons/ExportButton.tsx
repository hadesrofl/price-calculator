import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";
import FileDownload from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

interface ExportButtonProps extends IsDesktopSizeProps {
  exportData: Object;
  exportFileName: string;
}

/**
 * Creates a button for exporting the calculation
 * @param {ExportButtonProps} props Are the properties for this export button like the data and filename
 * @returns {JSX.Element} the export button as JSX.Element
 */
export default function ExportButton(props: ExportButtonProps) {
  const { exportData, exportFileName, isDesktopSize } = props;
  const [exportFile, setExportFile] = useState<string>("");

  const exportPriceCalculation = useCallback(() => {
    const jsonString = `Data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportData)
    )}`;
    setExportFile(jsonString);
  }, [exportData]);

  useEffect(() => {
    exportPriceCalculation();
  }, [exportPriceCalculation]);
  return (
    <Button
      onClick={exportPriceCalculation}
      aria-label="Export"
      startIcon={<FileDownload />}
      href={exportFile}
      download={exportFileName}
      color="inherit"
    >
      {isDesktopSize ? "Export" : ""}
    </Button>
  );
}
