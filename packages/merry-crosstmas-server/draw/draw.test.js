const {
  getWhoToWho,
  whoToWhoWithForbiddenLinks,
  isForbiddenLinksCorrect
} = require("./draw");

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

describe("Draw.isForbiddenLinksCorrect", () => {
  it("should return false if some forbidden links has a propability to be draw superior to 1", () => {
    /*     expect(
      isForbiddenLinksCorrect([
        { id: 1, forbidden: [2, 3, 4] },
        { id: 2, forbidden: [1, 3] },
        { id: 3, forbidden: [1, 2] },
        { id: 4 },
        { id: 5 }
      ])
    ).toEqual(false); */
    expect(
      isForbiddenLinksCorrect([
        { id: 1, forbidden: [2, 3] },
        { id: 2, forbidden: [1, 3] },
        { id: 3, forbidden: [1, 2] },
        { id: 4 },
        { id: 5 }
      ])
    ).toEqual(false);
  });
  it("should return true if a draw is possible", () => {
    expect(
      isForbiddenLinksCorrect([
        { id: 1, forbidden: [2, 3, 4] },
        { id: 2, forbidden: [1, 3] },
        { id: 3, forbidden: [1] },
        { id: 4 },
        { id: 5 }
      ])
    ).toEqual(true);
    expect(
      isForbiddenLinksCorrect([
        { id: 1, forbidden: [2, 3] },
        { id: 2, forbidden: [3, 4] },
        { id: 3, forbidden: [2, 5] },
        { id: 4 },
        { id: 5 }
      ])
    ).toEqual(true);
  });
});

describe("Draw.whoToWhoWithForbiddenLinks", () => {
  const contacts = [
    { id: 1, forbidden: [2, 3] },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];
  xit("should link id 1 to id 4 due to forbidden links", () => {
    expect(whoToWhoWithForbiddenLinks(contacts)).toEqual({ from: 1, to: 4 });
  });
});
