module.exports = {
  port: process.env.MERRY_CROSSTMAS_PORT || 5000,
  mail: {
    baseUrl:
      process.env.MERRY_CROSSTMAS_BASE_URL ||
      'https://santa.samuelmartineau.com/mail/',
  },
  mailgun: {
    auth: {
      api_key: process.env.MERRY_CROSSTMAS_API_KEY || '',
      domain: process.env.MERRY_CROSSTMAS_DOMAIN || '',
    },
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
