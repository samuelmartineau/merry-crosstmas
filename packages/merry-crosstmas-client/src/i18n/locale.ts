export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

const STORAGE_KEY = 'merry-crosstmas-locale';

export const toLocale = (value: unknown): Locale | null => {
  if (typeof value !== 'string') return null;
  const lang = value.trim().toLowerCase().split(/[-_]/)[0];
  return (LOCALES as readonly string[]).includes(lang)
    ? (lang as Locale)
    : null;
};

// The language the user picked before, otherwise the browser's, otherwise English.
export const detectLocale = (): Locale => {
  try {
    const saved = toLocale(window.localStorage.getItem(STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // storage blocked: fall through to the browser language
  }
  const preferred =
    typeof navigator === 'undefined'
      ? []
      : [...(navigator.languages ?? []), navigator.language];
  for (const lang of preferred) {
    const locale = toLocale(lang);
    if (locale) return locale;
  }
  return 'en';
};

export const saveLocale = (locale: Locale) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore: the choice just won't be remembered
  }
};
