const config = require('config');
const sanitizeHtml = require('sanitize-html');
const async = require('async');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const pug = require('pug');
const path = require('path');
const { isValid } = require('../request/request');
const { getDrawing } = require('../draw/draw');

const friendRe = /@friend/gi;
const youRe = /@you/gi;

const mailTemplate = pug.compileFile(path.resolve(__dirname, 'html.pug'));
const textTemplate = pug.compileFile(path.resolve(__dirname, 'text.pug'));

const nodemailerMailgun = nodemailer.createTransport(mg(config.mailgun));

module.exports = (req, res) => {
  // to add test to check if solution is possible ;)
  if (!isValid(req.body)) {
    res.status(400).send({
      message: 'Invalid Parameters',
    });
  } else {
    const { contacts, content } = req.body;
    const whoToWho = getDrawing(contacts);

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
            html: mailHTML.replace(friendRe, mailLocals.toName).replace(youRe, mailLocals.fromName),
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
};
