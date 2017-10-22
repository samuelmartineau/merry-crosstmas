var clone = require("clone");
var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

var validateEmail = function(email) {
  return re.test(email);
};

var isValid = function(params) {
  // has contacts key
  if (!params.contacts) {
    return false;
  }

  // contacts is an array
  if (!Array.isArray(params.contacts)) {
    return false;
  }

  // contacts length > 2 because offer gifts between 2 friends isn't anonymous...
  // More than 20 is broadcasting...
  if (params.contacts.length < 3 || params.contacts.length > 20) {
    return false;
  }

  var mails = [];
  var contactsAreValid = params.contacts.every(function(contact) {
    mails.push(contact.mail);
    return contact.name.length > 0 && validateEmail(contact.mail);
  });

  // each contact has name and mail
  if (!contactsAreValid) {
    return false;
  }

  // each mail is uniq
  if (uniq(mails).length !== mails.length) {
    return false;
  }

  // has content key
  if (!params.content) {
    return false;
  }

  return true;
};

module.exports = {
  validateEmail: validateEmail,
  isValid: isValid
};
