import { combineReducers } from 'redux';
import contactsReducer, * as contacts from '../Contacts/Contacts.reducer';
import notificationsReducer from '../Notifications/Notifications.reducer';
import editorReducer from '../Editor/Editor.reducer';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  notifications: notificationsReducer,
  editor: editorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const getContactById = (state: AppState, id: number) =>
  contacts.getContactById(state.contacts.map, id);
export const getForbiddenById = (state: AppState, id: number) =>
  contacts.getForbiddenById(state.contacts, id);

export default rootReducer;
