import { combineReducers } from 'redux';
import { ADD_CHAR } from './Contacts.types';

const initialContacts = Array(3)
  .fill()
  .map((_, i) => ({
    name: '',
    email: '',
    id: i,
  }));

const initialMapContacts = initialContacts.reduce(
  (acc, contact) =>
    Object.assign(acc, {
      [contact.id]: contact,
    }),
  {},
);
const initialAllContacts = initialContacts.map(contact => contact.id);

export const mapReducer = (state = initialMapContacts, action) => {
  switch (action.type) {
    case ADD_CHAR:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
};
export const getContactById = (state, id) => state[id];

export const allReducer = (state = initialAllContacts, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export default reducer;
