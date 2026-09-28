import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Было: import enTranslation from '../public/locales/en/translation.json';
// Стало (путь изменен на папку src):
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';


const resources = {
  en: { translation: enTranslation },
  ru: { translation: ruTranslation }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ["ru", "en"],
    fallbackLng: "ru",
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"]
    },
    interpolation: {
      escapeValue: false,
      // Кастомный форматер для слов "год/года/лет" и "year/years"
      format: (value, format, lng) => {
        if (format === "w_year") {
          if (lng === "ru") {
            const lastDigit = value % 10;
            const lastTwoDigits = value % 100;
            if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "лет";
            if (lastDigit === 1) return "год";
            if (lastDigit >= 2 && lastDigit <= 4) return "года";
            return "лет";
          } else {
            return value === 1 ? "year" : "years";
          }
        }
        return value;
      }
    }
  });

export default i18n;
