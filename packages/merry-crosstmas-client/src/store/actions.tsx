import { Dispatch } from 'redux';
import * as contacts from '../Contacts/Contacts.actions';
import { AppState } from './reducer';

export * from '../Contacts/Contacts.actions';
export * from '../Notifications/Notifications.actions';
export * from '../Editor/Editor.actions';

export function send() {
  return (dispatch: Dispatch, getState: () => AppState) =>
    dispatch(contacts.send(getState().contacts.map, getState().editor));
}
