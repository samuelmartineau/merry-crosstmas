import { ADD_CHAR } from './Contacts.types';

export const addChar = (id, key, value) => ({
  type: ADD_CHAR,
  key,
  id,
  value,
  meta: {
    debounce: {
      time: 500,
    },
  },
});
