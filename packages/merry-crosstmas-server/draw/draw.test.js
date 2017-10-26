const { getWhoToWho, whoToWhoWithForbiddenLinks } = require("./draw");

describe("Draw.whoToWho", () => {
  const contacts = [1, 2, 3, 4];

  it("should return from/to array where to entity is the next person", () => {
    expect(getWhoToWho(contacts)).toEqual([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 1 }
    ]);
  });
});

describe("Draw.whoToWhoWithForbiddenLinks", () => {
  it("should return return empty array if draw is impossible", () => {
    expect(
      whoToWhoWithForbiddenLinks([
        { id: 1, forbidden: [2, 3, 4] },
        { id: 2, forbidden: [1, 3] },
        { id: 3, forbidden: [1, 2] },
        { id: 4 },
        { id: 5 }
      ])
    ).toEqual([]);
  });
  it("should return return array of possibolities if draw is possible", () => {
    expect(
      whoToWhoWithForbiddenLinks([
        { id: 1, forbidden: [2, 3, 4] },
        { id: 2, forbidden: [1, 5] },
        { id: 3, forbidden: [1, 5] },
        { id: 4 },
        { id: 5 }
      ]).length
    ).not.toBe(0);
  });
});
