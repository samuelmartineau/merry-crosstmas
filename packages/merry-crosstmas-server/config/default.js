module.exports = {
  port: process.env.PORT || 5000,
  mail: {
    baseUrl: 'http://samuelmartineau.com/merry-crosstmas/mail/',
  },
  mailgun: {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN,
    },
  },
  sanitizeConfig: {
    allowedTags: ['b', 'i', 'u', 'em', 'strong', 'p', 'div', 'br', 'span'],
    allowedAttributes: {
      '*': ['style'],
    },
  },
};
