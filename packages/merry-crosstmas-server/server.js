const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const sanitizeHtml = require("sanitize-html");
const EmailTemplate = require("email-templates").EmailTemplate;
const path = require("path");
const utils = require("./utils");
const async = require("async");
const cors = require("cors");
const ExpressBrute = require("express-brute");

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // support encoded bodies

const sanitizeConfig = {
  allowedTags: ["b", "i", "em", "strong", "p", "div", "br", "span"],
  allowedAttributes: {
    "*": ["style"]
  }
};

const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store);

const re = /@friend/gi;

const template = new EmailTemplate(path.join(__dirname, "mail"));

const port = process.env.PORT || 5000;

// mailer auth
const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN
  }
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.get("/", function(req, res) {
  res.redirect(301, "http://samuelmartineau.com/projects/merry-crosstmas/");
});

app.get("/test", function(req, res) {
  res.send({
    message: "API running"
  });
});

app.post(
  "/send",
  bruteforce.prevent, // error 429 if we hit this route too often
  function(req, res) {
    if (!utils.isValid(req.body)) {
      res.status(400).send({
        message: "Invalid Parameters"
      });
    } else {
      const { contact, content } = req.body;
      var whoToWho = utils.getWhoToWho(contacts);

      var contentCleaned = sanitizeHtml(content, sanitizeConfig);

      // Send 10 mails at once
      async.mapLimit(
        whoToWho,
        10,
        function(item, next) {
          item.content = contentCleaned;
          item.from.name = sanitizeHtml(item.from.name, sanitizeConfig);
          item.to.name = sanitizeHtml(item.to.name, sanitizeConfig);

          template.render(item, function(err, results) {
            if (err) return next(err);

            nodemailerMailgun.sendMail(
              {
                from: "Merry Crosstmas <messages-noreply@merry-crosstmas.com>",
                to: item.from.mail,
                subject: "Secret Santa friend designation",
                html: results.html.replace(re, item.to.name),
                text: results.text
              },
              function(err, responseStatus) {
                if (err) {
                  return next(err);
                }
                next(null, responseStatus.message);
              }
            );
          });
        },
        function(err) {
          if (err) {
            console.error("error sending mail", err);
            res.status(500).send({
              message: "Email sending error"
            });
          }
          res.send({
            message: "Succesfully sent " + whoToWho.length + " messages"
          });
        }
      );
    }
  }
);

process.on("uncaughtException", function(err) {
  console.log("uncaughtException", err);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port :", port);
