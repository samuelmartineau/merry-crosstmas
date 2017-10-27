const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const sanitizeHtml = require('sanitize-html');
const pug = require('pug');
const path = require('path');
const cors = require('cors');
const async = require('async');
const ExpressBrute = require('express-brute');
const { isValid } = require('./request/request');
const { getDrawing } = require('./draw/draw');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
})); // support encoded bodies

const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store);

const friendRe = /@friend/gi;
const youRe = /@you/gi;

const mailTemplate = pug.compileFile(path.resolve(__dirname, 'mail/html.pug'));
const textTemplate = pug.compileFile(path.resolve(__dirname, 'mail/text.pug'));

const nodemailerMailgun = nodemailer.createTransport(mg(config.mailgun));

app.get('/', (req, res) => {
  res.redirect(301, 'http://samuelmartineau.com/projects/merry-crosstmas/');
});

app.get('/test', (req, res) => {
  res.send({
    message: 'API running',
  });
});

app.post(
  '/send',
  bruteforce.prevent, // error 429 if we hit this route too often
  (req, res) => {
    // to add test to check if solution is possible ;)
    if (!isValid(req.body)) {
      res.status(400).send({
        message: 'Invalid Parameters',
      });
    } else {
      const { contacts, content } = req.body;
      const whoToWho = getDrawing(contacts);
      console.log(whoToWho);

      const contentCleaned = sanitizeHtml(content, config.sanitizeConfig);
      // Send 10 mails at once
      async.mapLimit(
        whoToWho,
        10,
        (item, next) => {
          const mailLocals = {
            fromName: sanitizeHtml(item.from.name, config.sanitizeConfig),
            toName: sanitizeHtml(item.to.name, config.sanitizeConfig),
            content: contentCleaned,
          };
          const mailHTML = mailTemplate(mailLocals);
          const mailText = textTemplate(mailLocals);

          nodemailerMailgun.sendMail(
            {
              from: 'Merry Crosstmas <messages-noreply@merry-crosstmas.com>',
              to: item.from.mail,
              subject: 'Secret Santa friend designation',
              html: mailHTML
                .replace(friendRe, mailLocals.toName)
                .replace(youRe, mailLocals.fromName),
              text: mailText,
            },
            (err, responseStatus) => {
              if (err) {
                return next(err);
              }
              return next(null, responseStatus.message);
            },
          );
        },
        (err) => {
          if (err) {
            console.error('error sending mail', err);
            res.status(500).send({
              message: 'Email sending error',
            });
          }
          res.send({
            message: `Succesfully sent ${whoToWho.length} messages`,
          });
        },
      );
    }
  },
);

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port :', config.port);
