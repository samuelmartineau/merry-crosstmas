const { uniq } = require("lodash");
const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function validateEmail(email) {
  return re.test(email);
}
function containsOnlyUniq(array) {
  return uniq(array).length === array.length;
}

function isValid(params) {
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

  const mails = [];
  const ids = params.contacts.map(c => c.id);
  const contactsAreValid = params.contacts.every(contact => {
    mails.push(contact.mail);
    let isForbiddenTargetCorrect = true;
    if (!!contact.forbidden) {
      isForbiddenTargetCorrect =
        Array.isArray(contact.forbidden) &&
        contact.forbidden.every(id => ids.includes(id));
    }
    return (
      contact.name.length > 0 &&
      validateEmail(contact.mail) &&
      isForbiddenTargetCorrect &&
      !!contact.id
    );
  });

  // each contact has name and mail
  if (!contactsAreValid) {
    return false;
  }

  // each ids should be uniq
  if (!containsOnlyUniq(ids)) {
    return false;
  }

  // each mail is uniq
  if (!containsOnlyUniq(mails)) {
    return false;
  }

  // has content key
  if (!params.content) {
    return false;
  }

  return true;
}

module.exports = {
  validateEmail: validateEmail,
  isValid: isValid
};
