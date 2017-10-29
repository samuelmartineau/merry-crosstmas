import reducer, { mapReducer, allReducer } from './Contacts.reducer';

describe('Routes reducer', () => {
  it('should init to an object with a status and an map key', () => {
    const actual = reducer(undefined, {});
    expect(actual).toEqual({
      map: expect.anything(),
      all: expect.anything(),
    });
  });
});

describe('mapReducer', () => {
  it('should init to an object with a map and an all key', () => {
    const actual = mapReducer(undefined, {});
    expect(actual).toEqual({
      0: { email: '', id: 0, name: '' },
      1: { email: '', id: 1, name: '' },
      2: { email: '', id: 2, name: '' },
    });
  });
});
describe('allReducer', () => {
  it('should init to an object with an array', () => {
    const actual = allReducer(undefined, {});
    expect(actual).toEqual([0, 1, 2]);
  });
});
