import reducer, { mapReducer, allReducer } from './Contacts.reducer';
import { addContact, removeContact, toggleForbidden } from './Contacts.actions';

const init = { type: '@@INIT' } as never;

describe('Contacts reducer', () => {
  it('should init with map, all, customMode and status keys', () => {
    const actual = reducer(undefined, init);
    expect(actual).toEqual({
      map: expect.anything(),
      all: expect.anything(),
      customMode: false,
      status: { sending: false, sended: false, error: false },
    });
  });
});

describe('mapReducer', () => {
  it('should init with 3 empty contacts', () => {
    const actual = mapReducer(undefined, init);
    expect(Object.values(actual)).toHaveLength(3);
    Object.entries(actual).forEach(([id, contact]) => {
      expect(contact).toEqual({
        id: Number(id),
        name: '',
        email: '',
        forbidden: [],
        color: expect.any(String),
      });
    });
  });

  it('should toggle a forbidden contact', () => {
    const state = mapReducer(undefined, init);
    const [a, b] = Object.keys(state).map(Number);
    const once = mapReducer(state, toggleForbidden(a, b));
    expect(once[a].forbidden).toEqual([b]);
    const twice = mapReducer(once, toggleForbidden(a, b));
    expect(twice[a].forbidden).toEqual([]);
  });
});

describe('allReducer', () => {
  it('should init with the 3 contact ids', () => {
    const actual = allReducer(undefined, init);
    expect(actual).toEqual(Object.keys(mapReducer(undefined, init)).map(Number));
  });

  it('should add and remove contacts', () => {
    const state = allReducer(undefined, init);
    const add = addContact();
    const added = allReducer(state, add);
    expect(added).toEqual([...state, add.id]);
    expect(allReducer(added, removeContact(add.id))).toEqual(state);
  });
});
