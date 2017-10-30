// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'App/App';
import { configureStore } from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV === 'production') {
  const ReactGA = require('react-ga');
  ReactGA.initialize('UA-65391889-2');
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
