import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import ka from './locales/ka.json';
import ru from './locales/ru.json';
import en from './locales/en.json';
import az from './locales/az.json';

const resources = {
  ka: { translation: ka },
  ru: { translation: ru },
  en: { translation: en },
  az: { translation: az },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ka', // Georgian as the default language
    fallbackLng: 'ka', // Georgian as fallback
    supportedLngs: ['ka', 'ru', 'en', 'az'],
    
    detection: {
      order: ['localStorage'], // Only check localStorage, don't auto-detect browser language
      caches: ['localStorage'],
      lookupLocalStorage: 'balconix-language',
    },

    interpolation: {
      escapeValue: false, // React already escapes by default
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;

// Language names for display
export const languageNames: Record<string, string> = {
  ka: 'GE',
  ru: 'RU',
  en: 'EN',
  az: 'AZ',
};

// Full language names
export const languageFullNames: Record<string, string> = {
  ka: 'ქართული',
  ru: 'Русский',
  en: 'English',
  az: 'Azərbaycan',
};

// Available languages
export const availableLanguages = ['ka', 'ru', 'en', 'az'] as const;
export type AvailableLanguage = typeof availableLanguages[number];
