const { difference } = require("lodash");

const getAvailableIds = (id, ids, forbidden) => {
  return difference(ids, forbidden.concat([id]));
};

module.exports = {
  getAvailableIds
};
