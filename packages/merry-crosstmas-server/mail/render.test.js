const { renderMail } = require('./render');
const { resolveLocale } = require('./locales');

const base = {
  fromName: 'Sam',
  toName: 'Aline',
  content: '<p>Hello @you, you offer a gift to @friend</p>',
};

describe('resolveLocale', () => {
  it('keeps supported languages', () => {
    expect(resolveLocale('fr')).toBe('fr');
    expect(resolveLocale('en')).toBe('en');
  });
  it('accepts region tags and any case', () => {
    expect(resolveLocale('fr-FR')).toBe('fr');
    expect(resolveLocale('FR_ca')).toBe('fr');
    expect(resolveLocale('en-US')).toBe('en');
  });
  it('falls back to English', () => {
    expect(resolveLocale()).toBe('en');
    expect(resolveLocale('de')).toBe('en');
    expect(resolveLocale(42)).toBe('en');
  });
});

describe('renderMail', () => {
  it('renders English by default', () => {
    const { lang, subject, html } = renderMail(base);
    expect(lang).toBe('en');
    expect(subject).toBe('Secret Santa friend designation');
    expect(html).toContain('<html lang="en"');
    expect(html).toContain('Your secret friend is');
    expect(html).toContain('Ho ho ho Sam!');
  });

  it('renders French when asked', () => {
    const { lang, subject, html } = renderMail({ ...base, locale: 'fr' });
    expect(lang).toBe('fr');
    expect(subject).toBe('Ton ami secret pour le Secret Santa');
    expect(html).toContain('<html lang="fr"');
    expect(html).toContain('Ton ami secret est');
    expect(html).toContain('Organise ton propre Secret Santa');
    expect(html).not.toContain('Your secret friend is');
  });

  it('replaces @you and @friend in any locale', () => {
    const { html } = renderMail({ ...base, locale: 'fr' });
    expect(html).toContain('Hello Sam, you offer a gift to Aline');
    expect(html).not.toMatch(/@you|@friend/);
  });

  it('does not double-escape already sanitized names', () => {
    const { html } = renderMail({ ...base, fromName: 'Tom &amp; Jerry' });
    expect(html).toContain('Ho ho ho Tom &amp; Jerry!');
    expect(html).not.toContain('&amp;amp;');
  });
});
