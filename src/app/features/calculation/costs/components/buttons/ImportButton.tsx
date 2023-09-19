import CloudUpload from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import HiddenInputField from "../inputs/HiddenInputField";
import IsDesktopSizeProps from "@/app/components/shared/IsDesktopSizeProp";

interface ImportButtonProps extends IsDesktopSizeProps {
  onUpload: (fileContent: string) => void;
}

export default function ImportButton(props: ImportButtonProps) {
  const { onUpload, isDesktopSize } = props;

  const onImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files !== undefined &&
      event.target.files !== null &&
      event.target.files.length > 0
    ) {
      const importFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const content = fileReader.result as string;
        onUpload(content);
      };
      fileReader.readAsText(importFile);
    }
  };
  return (
    <Button
      component="label"
      startIcon={<CloudUpload />}
      aria-label="Import"
      color="inherit"
    >
      {isDesktopSize ? "Import" : ""}
      <HiddenInputField type="file" onChange={onImportFile} />
    </Button>
  );
}
