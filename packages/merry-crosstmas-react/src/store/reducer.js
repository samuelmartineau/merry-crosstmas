import { combineReducers } from 'redux';
import contactsReducer, * as contacts from 'Contacts/Contacts.reducer';

export default combineReducers({
  contacts: contactsReducer,
});

export const getContactById = (state, id) => contacts.getContactById(state.contacts.map, id);
