var { uniq, shuffle } = require("lodash");
const { getAvailableIds, getRandomItem, findAllPaths } = require("./utils");

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

module.exports = {
  getWhoToWho,
  whoToWhoWithForbiddenLinks
};
