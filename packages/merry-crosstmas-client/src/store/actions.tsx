import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import * as contacts from '../Contacts/Contacts.actions';
import { AppState } from './reducer';
import { ThunkExtraArgument } from '../api';

export * from '../Contacts/Contacts.actions';
export * from '../Notifications/Notifications.actions';
export * from '../Editor/Editor.actions';
export * from '../i18n/Locale.actions';

export function send() {
  return (
    dispatch: ThunkDispatch<AppState, ThunkExtraArgument, UnknownAction>,
    getState: () => AppState,
  ) =>
    dispatch(
      contacts.send(
        getState().contacts.map,
        getState().editor.message,
        getState().locale,
      ),
    );
}
