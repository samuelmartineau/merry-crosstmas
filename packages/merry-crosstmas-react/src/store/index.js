import { createStore, applyMiddleware, compose } from 'redux';
// import * as api from 'api';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import rootReducer from './reducer';

const getEnhancer = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(createDebounce(), thunk.withExtraArgument({})));
};

export const configureStore = () => createStore(rootReducer, getEnhancer());

export { getContactById } from './reducer';
export { addChar } from './actions';
