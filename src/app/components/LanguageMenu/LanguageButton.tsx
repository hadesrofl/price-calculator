import { Stack, Typography } from "@mui/material";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "@/app/i18n/i18next";
import { TranslationsLanguages } from "@/app/i18n/locales/translationNamespaces";

interface LanguageButtonProps {
  languageIsoCode: string;
  languageTranslationKey: string;
}

/**
 * Creates a language menu item for {@link LanguageMenu}
 * @param {LanguageButtonProps} props Are the properties for the menu item, containing information about the language
 * @returns A menu item containing the flag of the country and the translated language name
 */
export default function LanguageItem(props: LanguageButtonProps) {
  const { languageIsoCode, languageTranslationKey } = props;
  const { t } = useTranslation(TranslationsLanguages);
  const translation = t(`${languageTranslationKey}`);
  const languageFlagClassname = `fi fi-${languageIsoCode}`;

  return (
    <Stack direction="row" spacing={2}>
      <span className={languageFlagClassname} />
      {<Typography variant="body1">{translation}</Typography>}
    </Stack>
  );
}
