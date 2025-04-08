import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import ar from "../assets/translations/ar.json";
import en from "../assets/translations/en.json";
// import { Regional } from "../utils/helpers";

// Await Import to fix Reference Error
const loadRegional = async () => {
  const { Regional } = await import("../utils/languageHelpers");
  return Regional;
};

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

loadRegional().then((Regional) => {
  i18n
    // Add React bindings as a plugin.
    .use(Backend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    // Initialize the i18next instance.
    .init({
      resources,
      lng: localStorage.getItem("i18nextLng") ?? Regional.language.get(),
      fallbackLng:
        localStorage.getItem("i18nextLng") ?? Regional.language.get(),
      debug: true,
      interpolation: {
        escapeValue: false, // react already safe from xss
      },
    });
});

export default i18n;
