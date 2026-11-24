const sanitizeHtml = require('sanitize-html');
const async = require('async');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const config = require('../config');
const { isValid } = require('../request/request');
const { getDrawing } = require('../draw/draw');
const { renderMail } = require('./render');

const nodemailerMailgun = nodemailer.createTransport(mg(config.mailgun));

module.exports = (req, res) => {
  if (!isValid(req.body)) {
    res.status(400).send({
      message: 'Invalid Parameters',
    });
  } else {
    const { contacts, content, locale } = req.body;
    const whoToWho = getDrawing(contacts);
    const clean = (html) => sanitizeHtml(html, config.sanitizeConfig);
    const contentCleaned = clean(content);

    // Send 10 mails at once
    async.mapLimit(
      whoToWho,
      10,
      (item, next) => {
        const { subject, html } = renderMail({
          locale,
          fromName: clean(item.from.name),
          toName: clean(item.to.name),
          content: contentCleaned,
        });

        nodemailerMailgun.sendMail(
          {
            from: 'Merry Crosstmas <messages-noreply@merry-crosstmas.com>',
            to: item.from.email,
            subject,
            html,
          },
          (err, responseStatus) => {
            if (err) {
              return next(err);
            }
            return next(null, responseStatus.message);
          },
        );
      },
      err => {
        if (err) {
          console.error('error sending mail', err);
          res.status(500).send({
            message: 'Email sending error',
          });
          return;
        }
        res.send({
          message: `Succesfully sent ${whoToWho.length} messages`,
        });
      },
    );
  }
};
