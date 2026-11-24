import { render, screen, fireEvent, within } from '@testing-library/react';
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
    screen.getByRole('heading', { level: 1, name: /Draw names/ }),
  ).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Name/)).toHaveLength(3);
  expect(document.querySelector('.ql-editor')).not.toBeNull();
});

it('adds a contact and shows exclusions', () => {
  renderApp();
  expect(screen.queryAllByRole('button', { name: 'Delete' })).toHaveLength(0);
  fireEvent.click(screen.getByRole('button', { name: /Add a friend/ }));
  expect(screen.getAllByLabelText(/Name/)).toHaveLength(4);
  expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);

  fireEvent.click(screen.getByLabelText(/Exclusions/));
  expect(screen.getAllByText(/can draw$/)).toHaveLength(4);
});

it('previews the email with the participants names', () => {
  renderApp();
  const [first, second] = screen.getAllByLabelText(/Name/);
  fireEvent.change(first, { target: { value: 'Alice' } });
  fireEvent.change(second, { target: { value: 'Ben' } });

  const preview = document.getElementById('email-preview')!;
  expect(within(preview).getByText('Hello')).toBeInTheDocument();
  expect(preview.textContent).toContain('Alice');
  expect(preview.querySelector('u')!.textContent).toBe('Ben');
  expect(preview.textContent).not.toMatch(/@you|@friend/);
});

it('points the send buttons at the form', () => {
  renderApp();
  const buttons = screen.getAllByRole('button', { name: /Draw & send/ });
  expect(buttons.length).toBeGreaterThan(0);
  buttons.forEach((b) =>
    expect(b).toHaveAttribute('form', 'secret-santa-form'),
  );
  expect(document.getElementById('secret-santa-form')!.tagName).toBe('FORM');
});
