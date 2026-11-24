const express = require('express');
const { rateLimit } = require('express-rate-limit');
const config = require('./config');
const mailRoute = require('./mail/mail');
const { createDrawLog } = require('./mail/drawLog');

const app = express();
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  }),
); // support encoded bodies

// error 429 if the send route is hit too often (in-memory store)
const sendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

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
  sendLimiter,
  mailRoute,
);

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
});

// Drop expired draws at startup (they are also purged on every new draw).
try {
  const purged = createDrawLog().purge();
  if (purged) console.log(`draw log: purged ${purged} expired entries`);
} catch (err) {
  console.error('draw log purge failed', err);
}

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port :', config.port);
