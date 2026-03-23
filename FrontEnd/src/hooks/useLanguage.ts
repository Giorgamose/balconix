import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { languageNames, availableLanguages, type AvailableLanguage } from '@i18n/index';
import { trackLanguageChange } from '@services/analyticsService';

interface UseLanguageReturn {
  currentLanguage: AvailableLanguage;
  languageNames: Record<string, string>;
  availableLanguages: readonly AvailableLanguage[];
  changeLanguage: (lang: AvailableLanguage) => void;
  isCurrentLanguage: (lang: string) => boolean;
}

/**
 * Hook for language management
 */
export const useLanguage = (): UseLanguageReturn => {
  const { i18n } = useTranslation();

  const currentLanguage = (i18n.language || 'ka') as AvailableLanguage;

  const changeLanguage = useCallback(
    (lang: AvailableLanguage) => {
      if (lang !== currentLanguage) {
        i18n.changeLanguage(lang);
        trackLanguageChange(lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Store in localStorage
        localStorage.setItem('i18nextLng', lang);
      }
    },
    [currentLanguage, i18n]
  );

  const isCurrentLanguage = useCallback(
    (lang: string) => lang === currentLanguage,
    [currentLanguage]
  );

  return {
    currentLanguage,
    languageNames,
    availableLanguages,
    changeLanguage,
    isCurrentLanguage,
  };
};

export default useLanguage;
