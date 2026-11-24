import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from './store';

export const renderWithStore = (
  ui: ReactElement,
  store = configureStore(),
) => ({
  store,
  ...render(<Provider store={store}>{ui}</Provider>),
});
