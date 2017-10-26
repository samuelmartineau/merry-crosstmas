const { getAvailableIds, findAllPaths } = require("./utils");

describe("utils.getAvailableIds", () => {
  it("should exclude self id", () => {
    expect(getAvailableIds(1, [1, 2, 3, 4, 5, 5], [2, 4]).includes(1)).toEqual(
      false
    );
  });
  it("should exclude forbidden ids", () => {
    expect(getAvailableIds(1, [1, 2, 3, 4, 5, 5], [2, 4]).includes(2)).toEqual(
      false
    );
    expect(getAvailableIds(1, [1, 2, 3, 4, 5, 5], [2, 4]).includes(4)).toEqual(
      false
    );
  });
});

describe("utils.findAllPaths", () => {
  const workingExample = {
    a: ["c", "d", "e"],
    b: ["a", "e"],
    c: ["a", "d"],
    d: ["b", "c", "e"],
    e: ["b", "c"]
  };
  it("should return array of working paths", () => {
    expect(findAllPaths(workingExample, "a", "b")).toEqual([
      ["a", "c", "d", "e", "b"],
      ["a", "e", "c", "d", "b"]
    ]);
  });
  it("should return start with first node and finish with nodes that can point the first", () => {
    const lastNode = ["b", "c"];
    for (const path of findAllPaths(workingExample, "a", "b")) {
      expect(path[0]).toEqual("a");
      expect(lastNode.includes(path.slice(-1)[0])).toEqual(true);
    }
  });
});
