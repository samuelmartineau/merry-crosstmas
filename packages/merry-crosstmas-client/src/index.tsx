import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from './App/App';
import { configureStore } from './store';
import './index.css';

const theme = createTheme({
  spacing: 8,
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
