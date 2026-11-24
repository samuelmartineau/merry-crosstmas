import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '../store';

const renderApp = () =>
  render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
  );

it('renders without crashing', () => {
  renderApp();
  expect(
    screen.getByRole('heading', { level: 1, name: 'Merry Crosstmas' }),
  ).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Name/)).toHaveLength(3);
  expect(document.querySelector('.ql-editor')).not.toBeNull();
});

it('adds a contact and shows exclusions in custom mode', () => {
  renderApp();
  fireEvent.click(screen.getByRole('button', { name: 'add' }));
  expect(screen.getAllByLabelText(/Name/)).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);

  fireEvent.click(screen.getByLabelText(/Custom Mode/));
  expect(
    screen.getAllByText('Toggle name to disable ability to be drawn'),
  ).toHaveLength(4);
});
