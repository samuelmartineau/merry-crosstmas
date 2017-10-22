const { getAvailableIds } = require("./utils");

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
