const {
  getWhoToWho,
  whoToWhoWithForbiddenLinks,
  checkDrawValidity,
} = require('./draw');

describe('draw', () => {
  describe('checkDrawValidity', () => {
    const contacts = [
      { id: 1, forbidden: [2, 3, 4] },
      { id: 2, forbidden: [1, 3] },
      { id: 3, forbidden: [1, 2] },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];

    it('should return false if drawing is not valid', () => {
      expect(
        checkDrawValidity(contacts, [
          { from: { id: 1 }, to: { id: 2 } },
          { from: { id: 2 }, to: { id: 3 } },
          { from: { id: 3 }, to: { id: 4 } },
          { from: { id: 4 }, to: { id: 5 } },
          { from: { id: 5 }, to: { id: 6 } },
          { from: { id: 6 }, to: { id: 1 } },
        ]),
      ).toEqual(false);
    });
    it('should return true if drawing is valid', () => {
      expect(
        checkDrawValidity(contacts, [
          { from: { id: 1 }, to: { id: 5 } },
          { from: { id: 2 }, to: { id: 4 } },
          { from: { id: 3 }, to: { id: 6 } },
          { from: { id: 4 }, to: { id: 1 } },
          { from: { id: 5 }, to: { id: 2 } },
          { from: { id: 6 }, to: { id: 3 } },
        ]),
      ).toEqual(true);
      expect(
        checkDrawValidity(
          [
            { id: 1, forbidden: [2, 3, 4] },
            { id: 2, forbidden: [1, 5] },
            { id: 3, forbidden: [1, 5] },
            { id: 4 },
            { id: 5 },
          ],
          [
            { from: { id: 1 }, to: { id: 5 } },
            { from: { id: 2 }, to: { id: 3 } },
            { from: { id: 3 }, to: { id: 4 } },
            { from: { id: 4 }, to: { id: 1 } },
            { from: { id: 5 }, to: { id: 3 } },
          ],
        ),
      ).toEqual(true);
    });
  });
  describe('whoToWho', () => {
    const contacts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    it('should return from/to array where to entity is the next person', () => {
      expect(getWhoToWho(contacts)).toEqual([
        { from: { id: 1 }, to: { id: 2 } },
        { from: { id: 2 }, to: { id: 3 } },
        { from: { id: 3 }, to: { id: 4 } },
        { from: { id: 4 }, to: { id: 1 } },
      ]);
    });
  });

  describe('whoToWhoWithForbiddenLinks', () => {
    it('should return return empty array if draw is impossible', () => {
      expect(
        whoToWhoWithForbiddenLinks([
          { id: 1, forbidden: [2, 3, 4] },
          { id: 2, forbidden: [1, 3] },
          { id: 3, forbidden: [1, 2] },
          { id: 4 },
          { id: 5 },
        ]),
      ).toEqual([]);
    });
    it('should return return array of possibolities if draw is possible', () => {
      expect(
        whoToWhoWithForbiddenLinks([
          { id: 1, forbidden: [2, 3, 4] },
          { id: 2, forbidden: [1, 5] },
          { id: 3, forbidden: [1, 5] },
          { id: 4 },
          { id: 5 },
        ]).length,
      ).not.toBe(0);
    });
    it('should return return array of possibolities if draw is possible with huge number of contacts', () => {
      expect(
        whoToWhoWithForbiddenLinks([
          { id: 1, forbidden: [2, 3, 4] },
          { id: 2, forbidden: [1, 5] },
          { id: 3, forbidden: [1, 5] },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12, forbidden: [8, 3] },
          { id: 13 },
          { id: 14 },
          { id: 15, forbidden: [2, 1] },
          { id: 16 },
        ]).length,
      ).not.toBe(0);
    });
  });
});
