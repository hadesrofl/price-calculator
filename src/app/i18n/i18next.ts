import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";

export const Fallbacklanguage = "en";
export const Languages = [Fallbacklanguage, "de"];
export const DefaultNS = "translation";
export const CookieName = "Language";

function getOptions(language = Fallbacklanguage, ns = DefaultNS) {
  return {
    supportedlanguages: Languages,
    Fallbacklanguage,
    language,
    fallbackNS: DefaultNS,
    DefaultNS,
    ns,
  };
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: Fallbacklanguage, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: [],
  });

export function useTranslation(namespace: string = DefaultNS) {
  const [cookies, setCookie] = useCookies([CookieName]);
  const translationOrg = useTranslationOrg(namespace);
  const { i18n } = translationOrg;

  useEffect(() => {
    if (cookies.Language && Languages.includes(cookies.Language))
      i18n.changeLanguage(cookies.Language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeLanguage, setActivelanguage] = useState(i18n.resolvedLanguage);

  useEffect(() => {
    if (activeLanguage === i18n.resolvedLanguage) return;
    setActivelanguage(i18n.resolvedLanguage);
  }, [activeLanguage, cookies.Language, i18n.resolvedLanguage]);

  useEffect(() => {
    if (cookies.Language === activeLanguage) return;
    setCookie(CookieName, activeLanguage, { path: "/" });
  }, [activeLanguage, cookies.Language, setCookie]);

  return translationOrg;
}
