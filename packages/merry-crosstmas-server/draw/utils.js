const { difference } = require("lodash");

const getAvailableIds = (id, ids, forbidden = []) => {
  return difference(ids, forbidden.concat([id]));
};
const getRandomItem = ids => {
  return ids[Math.floor(Math.random() * ids.length)];
};

function findAllPaths(graph, start, end, path = []) {
  const size = Object.keys(graph).length;
  const newPath = path.concat([start]);
  if (start === end && newPath.length === size) {
    return [newPath];
  } else if (start === end) {
    return [];
  }
  if (!graph.hasOwnProperty(start)) {
    return [];
  }
  const paths = [];
  for (const node of graph[start]) {
    if (!newPath.includes(node)) {
      const newpaths = findAllPaths(graph, node, end, newPath);
      for (const newpath of newpaths) {
        paths.push(newpath);
      }
    }
  }
  return paths;
}

module.exports = {
  getAvailableIds,
  getRandomItem,
  findAllPaths
};
