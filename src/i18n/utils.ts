// src/i18n/utils.ts
import es from './es.json';
import en from './en.json';
// const dict = { es, en } as const;
const dict: Record<'es' | 'en', Record<string, string>> = { es, en };

export function useTranslations(lang: 'es' | 'en') {
  return (key: string) => dict[lang][key] ?? dict.es[key] ?? key;
}
