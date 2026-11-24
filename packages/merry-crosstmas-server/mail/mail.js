const sanitizeHtml = require('sanitize-html');
const async = require('async');
const config = require('../config');
const { isValid } = require('../request/request');
const { getDrawing } = require('../draw/draw');
const { resolveLocale } = require('./locales');
const { sendDrawMail } = require('./send');
const { createDrawLog } = require('./drawLog');

function createMailRoute({ send = sendDrawMail, drawLog = createDrawLog() } = {}) {
  return (req, res) => {
    if (!isValid(req.body)) {
      res.status(400).send({
        message: 'Invalid Parameters',
      });
      return;
    }
    const { contacts, content } = req.body;
    const locale = resolveLocale(req.body.locale);
    const whoToWho = getDrawing(contacts);
    const clean = (html) => sanitizeHtml(html, config.sanitizeConfig);
    const contentCleaned = clean(content);

    // Send 10 mails at once. Every person is attempted so the draw log
    // records exactly who received their email and who did not.
    async.mapLimit(
      whoToWho,
      10,
      (item, next) => {
        const assignment = {
          fromName: clean(item.from.name),
          fromEmail: item.from.email,
          toName: clean(item.to.name),
          toEmail: item.to.email,
        };
        send({
          locale,
          fromName: assignment.fromName,
          toName: assignment.toName,
          content: contentCleaned,
          email: assignment.fromEmail,
        }).then(
          messageId => next(null, { ...assignment, status: 'accepted', messageId }),
          err => {
            console.error('error sending mail to', assignment.fromEmail, err);
            next(null, { ...assignment, status: 'failed', error: String(err && err.message ? err.message : err) });
          },
        );
      },
      (err, assignments) => {
        let drawId = null;
        try {
          const entry = drawLog.logDraw({ locale, content: contentCleaned, assignments });
          drawId = entry ? entry.id : null;
          if (drawId) console.log('draw logged', drawId);
        } catch (logErr) {
          console.error('could not write draw log', logErr);
        }
        const failed = assignments.filter(a => a.status === 'failed').length;
        if (failed > 0) {
          console.error(`draw ${drawId}: ${failed}/${assignments.length} emails failed`);
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
  };
}

module.exports = createMailRoute();
module.exports.createMailRoute = createMailRoute;
