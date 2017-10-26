const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const sanitizeHtml = require("sanitize-html");
const pug = require("pug");
const path = require("path");
const cors = require("cors");
const ExpressBrute = require("express-brute");
const { isValid } = require("./request/request");
const { getDrawing } = require("./draw/draw");

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // support encoded bodies

const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store);

const re = /@friend/gi;

const template = pug.compileFile(path.resolve(__dirname, "mail/html.pug"));

const port = process.env.PORT || 5000;

const nodemailerMailgun = nodemailer.createTransport(mg(config.mailgun));

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
  (req, res) => {
    // to add test to check if solution is possible ;)
    if (!isValid(req.body)) {
      res.status(400).send({
        message: "Invalid Parameters"
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
          item.content = contentCleaned;
          item.from.name = sanitizeHtml(item.from.name, sanitizeConfig);
          item.to.name = sanitizeHtml(item.to.name, sanitizeConfig);

          template.render(item, (err, results) => {
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
