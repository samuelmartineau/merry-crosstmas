const { uniq } = require('lodash');
const { whoToWhoWithForbiddenLinks } = require('../draw/draw');

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

function validateEmail(email) {
  return re.test(email);
}
function containsOnlyUniq(array) {
  return uniq(array).length === array.length;
}

function isValid(params) {
  // has contacts key
  if (!params.contacts) {
    console.error('contacts is missing');
    return false;
  }

  // contacts is an array
  if (!Array.isArray(params.contacts)) {
    console.error('contacts should be an array');
    return false;
  }

  // contacts length > 2 because offer gifts between 2 friends isn't anonymous...
  // More than 20 is broadcasting...
  if (params.contacts.length < 3 || params.contacts.length > 20) {
    console.error('contacts length should be 3 <= length <= 20');
    return false;
  }

  const mails = [];
  let hasForbiddenRules = false;
  const ids = params.contacts.map(c => c.id);
  const contactsAreValid = params.contacts.every(contact => {
    mails.push(contact.email);
    let isForbiddenTargetCorrect = true;
    if (contact.forbidden) {
      hasForbiddenRules = true;
      isForbiddenTargetCorrect =
        Array.isArray(contact.forbidden) &&
        contact.forbidden.every(id => ids.includes(id));
    }

    return (
      contact.name.length > 0 &&
      validateEmail(contact.email) &&
      isForbiddenTargetCorrect &&
      Object.prototype.hasOwnProperty.call(contact, 'id')
    );
  });

  // each contact has name and mail
  if (!contactsAreValid) {
    console.error('contact name + valid email + forbidden + id');
    return false;
  }

  if (
    hasForbiddenRules &&
    whoToWhoWithForbiddenLinks(params.contacts).length === 0
  ) {
    console.error('no path possible with forbidden rules');
    return false;
  }
  // each ids should be uniq
  if (!containsOnlyUniq(ids)) {
    console.error('uniq ids');
    return false;
  }

  // each mail is uniq
  if (!containsOnlyUniq(mails)) {
    console.error('uniq email');
    return false;
  }

  // has content key
  if (!params.content) {
    console.error('content should exist');
    return false;
  }

  return true;
}

module.exports = {
  validateEmail,
  isValid,
};
