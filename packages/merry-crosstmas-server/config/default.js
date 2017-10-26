module.exports = {
  mailgun: {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  },
  sanitizeConfig: {
    allowedTags: ["b", "i", "em", "strong", "p", "div", "br", "span"],
    allowedAttributes: {
      "*": ["style"]
    }
  }
};
