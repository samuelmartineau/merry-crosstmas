import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { withExtraArgument } from 'redux-thunk';
import * as api from '../api';
import rootReducer from './reducer';
import { saveLocale } from '../i18n/locale';

interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare let window: CustomWindow;

const getEnhancer = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(withExtraArgument(api)));
};

export const configureStore = () => {
  const store = createStore(rootReducer, undefined, getEnhancer());
  // Remember the language and keep <html lang> in sync with it.
  let locale = store.getState().locale;
  document.documentElement.lang = locale;
  store.subscribe(() => {
    const next = store.getState().locale;
    if (next !== locale) {
      locale = next;
      document.documentElement.lang = locale;
      saveLocale(locale);
    }
  });
  return store;
};

export { getContactById, getForbiddenById } from './reducer';
export {
  addChar,
  addContact,
  removeContact,
  toggleSettings,
  toggleForbidden,
  send,
  closeNotification,
  edit,
  reset,
  setLocale,
} from './actions';
