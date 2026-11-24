import { Locale } from './locale';

export const SET_LOCALE = 'SET_LOCALE';

export const setLocale = (locale: Locale) =>
  ({
    type: SET_LOCALE,
    locale,
  }) as const;

export type LocaleActions = ReturnType<typeof setLocale>;
