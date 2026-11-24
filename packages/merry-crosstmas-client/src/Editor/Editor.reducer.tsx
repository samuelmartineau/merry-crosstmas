import { RESET } from '../Contacts/Contacts.types';
import { EDIT_MESSAGE } from './Editor.types';
import { EditorActions } from './Editor.actions';
import { ContactsActions } from '../store/actions';
import { LocaleActions, SET_LOCALE } from '../i18n/Locale.actions';
import { messages } from '../i18n/messages';
import { detectLocale, Locale } from '../i18n/locale';

type State = {
  message: string;
  // true once the user typed in the editor: their text is never replaced.
  touched: boolean;
};

const sample = (locale: Locale): State => ({
  message: messages[locale].defaultMessage,
  touched: false,
});

export const reducer = (
  state: State = sample(detectLocale()),
  action: EditorActions | ContactsActions | LocaleActions,
): State => {
  switch (action.type) {
    case EDIT_MESSAGE: {
      return {
        message: action.message,
        touched: state.touched || action.byUser,
      };
    }
    case SET_LOCALE: {
      // Translate the sample message, but keep the user's own text.
      return state.touched ? state : sample(action.locale);
    }
    case RESET: {
      return sample(action.locale);
    }
    default:
      return state;
  }
};

export default reducer;
