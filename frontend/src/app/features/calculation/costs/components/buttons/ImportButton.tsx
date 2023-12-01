import CloudUpload from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import HiddenInputField from "../inputs/HiddenInputField";
import useDesktopSize from "@/app/hooks/useDesktopSize";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsButtons } from "@/app/i18n/locales/translationNamespaces";

export interface ImportButtonProps {
  onUpload: (fileContent: string) => void;
}

/**
 * Creates an import button that informs about the event of reading new data
 * @param {ImportButtonProps} props Are the properties for this import button like the handler for uploading
 * @returns {JSX.Element} the import button as JSX.Element
 */
export default function ImportButton(props: ImportButtonProps) {
  const { onUpload } = props;
  const isDesktopSize = useDesktopSize();
  const { t } = useTranslation(TranslationsButtons);

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
      {isDesktopSize ? t("Import") : ""}
      <HiddenInputField type="file" onChange={onImportFile} />
    </Button>
  );
}
