import * as contacts from '../Contacts/Contacts.actions';
import { AppState } from './reducer';
import { ThunkDispatch } from 'redux-thunk';

export * from '../Contacts/Contacts.actions';
export * from '../Notifications/Notifications.actions';
export * from '../Editor/Editor.actions';

export function send() {
  return (dispatch:  ThunkDispatch<{}, {}, any>, getState: () => AppState) =>
    dispatch(contacts.send(getState().contacts.map, getState().editor));
}
