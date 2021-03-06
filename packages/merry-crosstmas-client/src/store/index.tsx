import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as api from '../api';
import rootReducer from './reducer';

interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

declare let window: CustomWindow;

const getEnhancer = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));
};

export const configureStore = () => createStore(rootReducer, getEnhancer());

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
