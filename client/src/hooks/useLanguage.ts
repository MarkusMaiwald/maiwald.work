import { useState, useCallback } from 'react';

export type Language = 'EN' | 'DE';

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(prev => prev === 'EN' ? 'DE' : 'EN');
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage
  };
}
