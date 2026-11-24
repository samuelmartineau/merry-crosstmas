const path = require('path');

const drawLogFile = process.env.MERRY_CROSSTMAS_DRAW_LOG;

module.exports = {
  port: process.env.MERRY_CROSSTMAS_PORT || 5000,
  mailgun: {
    auth: {
      api_key: process.env.MERRY_CROSSTMAS_API_KEY || '',
      domain: process.env.MERRY_CROSSTMAS_DOMAIN || '',
    },
  },
  // Draw log used to recover lost emails (see scripts/resend.js).
  // Set MERRY_CROSSTMAS_DRAW_LOG to a path outside any served folder,
  // or to "off" to disable it.
  drawLog: {
    file:
      drawLogFile === 'off'
        ? null
        : drawLogFile || path.resolve(__dirname, '..', 'logs', 'draws.jsonl'),
    // 0 = keep each draw until the 1st of February that follows it.
    retentionDays: Number(process.env.MERRY_CROSSTMAS_DRAW_LOG_RETENTION_DAYS) || 0,
  },
  sanitizeConfig: {
    allowedTags: [
      'b',
      'i',
      'u',
      'em',
      'strong',
      'p',
      'div',
      'br',
      'span',
      'a',
      'img',
    ],
    allowedAttributes: {
      '*': ['style'],
      img: ['src'],
      a: ['href', 'rel', 'target'],
    },
  },
};
