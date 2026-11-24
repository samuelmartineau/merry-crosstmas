import { detectLocale, Locale } from './locale';
import { LocaleActions, SET_LOCALE } from './Locale.actions';

export const reducer = (
  state: Locale = detectLocale(),
  action: LocaleActions,
) => (action.type === SET_LOCALE ? action.locale : state);

export default reducer;
