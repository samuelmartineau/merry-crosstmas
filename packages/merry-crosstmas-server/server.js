const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const ExpressBrute = require('express-brute');
const mailRoute = require('./mail/mail');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
); // support encoded bodies

const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store);

app.get('/', (req, res) => {
  res.redirect(301, 'http://samuelmartineau.com/projects/merry-crosstmas/');
});

app.get('/test', (req, res) => {
  res.send({
    message: 'API running 😇',
  });
});

app.post(
  '/send',
  bruteforce.prevent, // error 429 if we hit this route too often
  mailRoute,
);

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
});

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port :', config.port);
