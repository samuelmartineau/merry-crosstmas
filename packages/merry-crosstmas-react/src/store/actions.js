import * as contacts from 'Contacts/Contacts.actions';

export * from 'Contacts/Contacts.actions';
export * from 'Notifications/Notifications.actions';
export * from 'Editor/Editor.actions';

export function send() {
  return (dispatch, getState) =>
    dispatch(contacts.send(getState().contacts.map, getState().editor));
}
