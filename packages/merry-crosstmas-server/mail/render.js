const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { messages, resolveLocale } = require('./locales');

const friendRe = /@friend/gi;
const youRe = /@you/gi;

const mailTemplate = handlebars.compile(
  fs.readFileSync(path.resolve(__dirname, 'template.hbs')).toString(),
);

// fromName, toName and content must already be sanitized HTML.
function renderMail({
  locale, fromName, toName, content,
}) {
  const lang = resolveLocale(locale);
  const strings = messages[lang];
  const t = {
    ...strings,
    preheader: handlebars.compile(strings.preheader, { noEscape: true })({
      fromName,
    }),
  };
  const html = mailTemplate({
    lang, fromName, toName, content, t,
  })
    .replace(friendRe, toName)
    .replace(youRe, fromName);

  return { lang, subject: strings.subject, html };
}

module.exports = { renderMail };
