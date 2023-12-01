import { Check, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LanguageItem from "./LanguageButton";
import { Languages, useTranslation } from "../../i18n/i18next";
import { TranslationsAppBar } from "../../i18n/locales/translationNamespaces";

/**
 * Creates a menu for switching languages
 * @returns A menu containing items with the name and country flag for a language
 */
export default function LanguageMenu() {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation(TranslationsAppBar);

  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    if (event.currentTarget.id !== undefined && event.currentTarget.id !== "")
      i18n.changeLanguage(event.currentTarget.id);
    setAnchorElement(null);
  };

  const setCheckmarkOnSelectedLanguageItem = (languageKey: string) => {
    const langIndex = Languages.findIndex((key) => key === languageKey);
    if (langIndex === -1) return <Box />;

    return i18n.resolvedLanguage === Languages[langIndex] ? (
      <IconButton disabled>
        <Check />
      </IconButton>
    ) : (
      <Box />
    );
  };

  return (
    <Box>
      <Button
        id="language-switcher-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="secondary"
      >
        <Typography variant="button" color="Menu">
          {t("LanguageMenu")}
        </Typography>
        {<KeyboardArrowDown color="action" />}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-switcher-button",
        }}
      >
        {Languages.map((language) => {
          return (
            <MenuItem key={language} id={language} onClick={handleClose}>
              <ListItem>
                <LanguageItem
                  languageIsoCode={language === "en" ? "gb" : language}
                  languageTranslationKey={language}
                />
              </ListItem>
              {setCheckmarkOnSelectedLanguageItem(language)}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
