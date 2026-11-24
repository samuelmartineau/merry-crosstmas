import { fireEvent, screen, within } from '@testing-library/react';
import App from '../App/App';
import { addChar, configureStore, edit, send, setLocale } from '../store';
import { renderWithStore } from '../test-utils';
import { detectLocale, toLocale } from './locale';
import { messages } from './messages';

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe('toLocale', () => {
  it('maps language tags to a supported locale', () => {
    expect(toLocale('fr-FR')).toBe('fr');
    expect(toLocale('EN_gb')).toBe('en');
    expect(toLocale('de')).toBeNull();
    expect(toLocale(null)).toBeNull();
  });
});

describe('detectLocale', () => {
  it('uses the browser language', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['de-DE', 'fr-CA']);
    expect(detectLocale()).toBe('fr');
  });

  it('falls back to English', () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['de-DE']);
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('de-DE');
    expect(detectLocale()).toBe('en');
  });

  it('prefers the language picked before', () => {
    window.localStorage.setItem('merry-crosstmas-locale', 'fr');
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US']);
    expect(detectLocale()).toBe('fr');
  });
});

it('every French string exists', () => {
  const keys = (o: object): string[] =>
    Object.entries(o).flatMap(([k, v]) =>
      v && typeof v === 'object' ? keys(v).map((s) => `${k}.${s}`) : [k],
    );
  expect(keys(messages.fr)).toEqual(keys(messages.en));
});

it('switches the whole UI and the preview to French', () => {
  const { store } = renderWithStore(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Français' }));

  expect(store.getState().locale).toBe('fr');
  expect(document.documentElement.lang).toBe('fr');
  expect(window.localStorage.getItem('merry-crosstmas-locale')).toBe('fr');
  expect(
    screen.getByRole('heading', { level: 1, name: /Tirez au sort/ }),
  ).toBeInTheDocument();
  expect(screen.getAllByLabelText(/Prénom/)).toHaveLength(3);

  const preview = document.getElementById('email-preview')!;
  expect(within(preview).getByText('Ton ami secret est')).toBeInTheDocument();
  expect(within(preview).getByText('Coucou')).toBeInTheDocument();
  expect(preview.textContent).toContain('Organise ton propre Secret Santa');
});

it('translates the sample message but keeps a custom one', () => {
  const store = configureStore();
  store.dispatch(setLocale('en'));
  store.dispatch(setLocale('fr'));
  expect(store.getState().editor.message).toBe(messages.fr.defaultMessage);

  store.dispatch(edit('<p>Mon message à moi</p>'));
  store.dispatch(setLocale('en'));
  expect(store.getState().editor.message).toBe('<p>Mon message à moi</p>');
});

it('sends the chosen locale with the emails', async () => {
  const store = configureStore();
  store.dispatch(setLocale('fr'));
  store.getState().contacts.all.forEach((id, i) => {
    store.dispatch(addChar(id, 'name', `P${i}`));
    store.dispatch(addChar(id, 'email', `p${i}@test.fr`));
  });
  const fetchMock = vi
    .spyOn(window, 'fetch')
    .mockResolvedValue(
      new Response(JSON.stringify({ message: 'ok' }), { status: 200 }),
    );
  await store.dispatch(send() as never);
  const body = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
  expect(body.locale).toBe('fr');
});
