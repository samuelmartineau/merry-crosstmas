const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const config = require('../config');
const { renderMail } = require('./render');

const FROM = 'Merry Crosstmas <messages-noreply@merry-crosstmas.com>';

let transport;
function getTransport() {
  if (!transport) transport = nodemailer.createTransport(mg(config.mailgun));
  return transport;
}

/**
 * Render and send one Secret Santa email.
 * Names and content must already be sanitized.
 * Resolves with Mailgun's message id, rejects with the transport error.
 */
function sendDrawMail({
  locale, fromName, toName, content, email,
}) {
  const { subject, html } = renderMail({
    locale, fromName, toName, content,
  });
  return getTransport()
    .sendMail({
      from: FROM, to: email, subject, html,
    })
    .then(info => (info && (info.id || info.messageId)) || null);
}

module.exports = { sendDrawMail };
