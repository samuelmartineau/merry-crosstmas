const { shuffle } = require("lodash");
const { getAvailableIds, getRandomItem, findAllPaths } = require("./utils");

const getWhoToWho = contacts => {
  return contacts.map((contact, index) => {
    const result = {
      from: contact
    };
    if (index === contacts.length - 1) {
      result.to = contacts[0];
    } else {
      result.to = contacts[index + 1];
    }
    return result;
  });
};

const whoToWhoWithForbiddenLinks = contacts => {
  const ids = contacts.map(c => c.id);
  const schema = contacts.reduce(
    (acc, contact) =>
      Object.assign(acc, {
        [contact.id]: getAvailableIds(
          contact.id,
          ids,
          contact.forbidden
        ).map(val => val.toString())
      }),
    {}
  );
  const [startingNode, ...otherNodes] = Object.keys(schema);
  const nodeThatCanPointStartingNode = otherNodes.filter(node =>
    schema[node].includes(startingNode)
  );
  const potentialPahts = nodeThatCanPointStartingNode.reduce(
    (acc, targetNode) =>
      acc.concat(findAllPaths(schema, startingNode, targetNode)),
    []
  );
  return potentialPahts;
};

function getDrawing(contacts) {
  const hasForbiddenTarget = contacts.some(c => !!c.forbidden);
  const randomContacts = shuffle(contacts);
  const randomContactsMap = randomContacts.reduce(
    (acc, contact) => Object.assign(acc, { [contact.id]: contact }),
    {}
  );
  let resultIds;
  if (hasForbiddenTarget) {
    const potentialPahts = whoToWhoWithForbiddenLinks(randomContacts);
    const ids =
      potentialPahts[Math.floor(Math.random() * potentialPahts.length)];
    return getWhoToWho(ids.map(id => randomContactsMap[id]));
  } else {
    return getWhoToWho(contacts);
  }
}

module.exports = {
  getWhoToWho,
  whoToWhoWithForbiddenLinks,
  getDrawing
};
