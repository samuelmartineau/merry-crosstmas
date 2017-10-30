import { combineReducers } from 'redux';
import contactsReducer, * as contacts from 'Contacts/Contacts.reducer';
import notificationsReducer from 'Notifications/Notifications.reducer';
import editorReducer from 'Editor/Editor.reducer';

export default combineReducers({
  contacts: contactsReducer,
  notifications: notificationsReducer,
  editor: editorReducer,
});

export const getContactById = (state, id) => contacts.getContactById(state.contacts.map, id);
export const getForbiddenById = (state, id) => contacts.getForbiddenById(state.contacts, id);
