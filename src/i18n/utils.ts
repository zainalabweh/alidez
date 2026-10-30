import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';

const dict: Record<Lang, Record<string, string>> = { es, en };

export function useTranslations(lang: Lang) {
  return (key: string): string => dict[lang][key] ?? dict.en[key] ?? key;
}

/** '' for Spanish (default locale), '/en' for English - prepend to internal links */
export function prefix(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}
