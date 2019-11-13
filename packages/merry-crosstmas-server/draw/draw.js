const { shuffle } = require('lodash');

/**
 * contact object
 * @typedef {Object} Contact
 * @property {number} id - contact identifier.
 * @property {number[]} forbidden - forbidden identifiers
 * @property {string} email - user email
 * @property {string} name - user name
 */
/**
 * User Drawing
 * @typedef {Object} UserDrawing
 * @property {Contact} from - emitter.
 * @property {Contact} to - receiver
 */

/**
 * @param {Contact[]} contacts
 * @param {UserDrawing[]} draw
 */
function checkDrawValidity(contacts, draw) {
  const forbiddenByContact = contacts.reduce((acc, contact) => {
    acc[contact.id] = contact.forbidden || [];
    return acc;
  }, {});
  return draw.every(
    ({ to, from }) => !forbiddenByContact[from.id].includes(to.id),
  );
}

/**
 * @param {Contact[]} contacts
 */
const getWhoToWho = contacts =>
  contacts.map((contact, index) => {
    const result = {
      from: contact,
    };
    if (index === contacts.length - 1) {
      result.to = contacts[0]; // eslint-disable-line
    } else {
      result.to = contacts[index + 1];
    }
    return result;
  });

/**
 * @param {Contact[]} contacts
 */
const whoToWhoWithForbiddenLinks = contacts => {
  const limit = 20000;
  let i = 0;
  let found = false;
  let drawing;
  while (i < limit && !found) {
    const shuffledContats = shuffle(contacts);
    drawing = getWhoToWho(shuffledContats);
    found = checkDrawValidity(shuffledContats, drawing);
    i += 1;
  }

  if (found) {
    return drawing;
  }
  return [];
};

function getDrawing(contacts) {
  const hasForbiddenTarget = contacts.some(c => !!c.forbidden);
  const randomContacts = shuffle(contacts);
  if (hasForbiddenTarget) {
    return whoToWhoWithForbiddenLinks(randomContacts);
  }
  return getWhoToWho(randomContacts);
}

module.exports = {
  getWhoToWho,
  whoToWhoWithForbiddenLinks,
  getDrawing,
  checkDrawValidity,
};
