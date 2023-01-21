import 'server-only';
import type { Locale } from 'lib/i18n';

const dictionaries = {
  ja: () => import('./ja.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!locale || typeof dictionaries[locale] !== 'function')
    return dictionaries.ja();
  return dictionaries[locale]();
};
