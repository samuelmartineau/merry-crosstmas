import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import App from './App/App';
import { configureStore } from './store';
import './index.css';

if (process.env.NODE_ENV === 'production') {
  const ReactGA = require('react-ga'); // eslint-disable-line global-require
  ReactGA.initialize('UA-65391889-2');
}

const theme = createMuiTheme({
  spacing: 8,
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
