var uniq = require("lodash-node/compat/array/uniq");
var shuffle = require("lodash-node/compat/collection/shuffle");
const { getAvailableIds } = require("./utils");

const getWhoToWho = contactIds => {
  return contactIds.map((id, index) => {
    const result = {
      from: id
    };
    if (index === contactIds.length - 1) {
      result.to = contactIds[0];
    } else {
      result.to = contactIds[index + 1];
    }
    return result;
  });
};

function getRemainingIds(ids, probs) {
  return ids.filter(id => probs[id] > 0);
}

const isForbiddenLinksCorrect = contacts => {
  let error = false;
  const ids = contacts.map(c => c.id);
  const initialeProbs = ids.reduce(
    (acc, id) => Object.assign(acc, { [id]: 1 }),
    {}
  );
  const probabilities = contacts.reduce((acc, contact) => {
    const forbiddenIds = contact.forbidden || [];
    const availableIds = getAvailableIds(contact.id, ids, forbiddenIds);
    const remainingIds = getRemainingIds(availableIds, acc);
    console.log("remaingsIds", remainingIds);
    if (!remainingIds.length) {
      error = true;
    }
    remainingIds.forEach(availableId => {
      let prob = (acc[availableId] -= 1 / remainingIds.length);
      return Object.assign(acc, { [availableId]: prob });
    });
    return acc;
  }, initialeProbs);
  if (error) {
    return false;
  }
  console.log("probs", probabilities);
  return (
    Object.values(probabilities).reduce((acc, value) => acc + value, 0) === 0
  );
};

const whoToWhoWithForbiddenLinks = contacts => {};

module.exports = {
  getWhoToWho,
  whoToWhoWithForbiddenLinks,
  isForbiddenLinksCorrect
};
