const DEFAULT_LOCALE = 'en';

const messages = {
  en: {
    subject: 'Secret Santa friend designation',
    title: 'Your Secret Santa match',
    preheader: 'Ho ho ho {{fromName}}! Open to find out who you are gifting this year 🎁',
    revealLabel: 'Your secret friend is',
    cta: 'Organize your own Secret Santa',
    sentWith: 'Sent with love by',
    madeBy: 'made by',
  },
  fr: {
    subject: 'Ton ami secret pour le Secret Santa',
    title: 'Ton ami secret du Secret Santa',
    preheader: 'Ho ho ho {{fromName}} ! Ouvre vite pour découvrir à qui tu offres un cadeau cette année 🎁',
    revealLabel: 'Ton ami secret est',
    cta: 'Organise ton propre Secret Santa',
    sentWith: 'Envoyé avec amour par',
    madeBy: 'créé par',
  },
};

const SUPPORTED_LOCALES = Object.keys(messages);

// Accepts "fr", "fr-FR", "FR"... and falls back to English for anything else.
function resolveLocale(locale) {
  if (typeof locale !== 'string') return DEFAULT_LOCALE;
  const lang = locale.trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
}

module.exports = {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  messages,
  resolveLocale,
};
