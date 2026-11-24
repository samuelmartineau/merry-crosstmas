import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { withExtraArgument } from 'redux-thunk';
import * as api from '../api';
import rootReducer from './reducer';

interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare let window: CustomWindow;

const getEnhancer = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(withExtraArgument(api)));
};

export const configureStore = () => createStore(rootReducer, undefined, getEnhancer());

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
} from './actions';
