import uniq from 'lodash.uniq';
import { setNotification } from 'Notifications/Notifications.actions';
import {
  ADD_CHAR,
  ADD_CONTACT,
  REMOVE_CONTACT,
  TOGGLE_MODE,
  TOGGLE_FORBIDDEN,
  MAIL_SENDING,
  MAIL_SUCCESS,
  MAIL_ERROR,
  RESET,
} from './Contacts.types';
import getNextId from './id.service';

export const addChar = (id, key, value) => ({
  type: ADD_CHAR,
  key,
  id,
  value,
});
export const addContact = () => ({
  type: ADD_CONTACT,
  id: getNextId(),
});
export const removeContact = id => ({
  type: REMOVE_CONTACT,
  id,
});
export const toggleSettings = () => ({
  type: TOGGLE_MODE,
});
export const toggleForbidden = (contactId, forbiddenId) => ({
  type: TOGGLE_FORBIDDEN,
  contactId,
  forbiddenId,
});
export const mailsRequest = () => ({
  type: MAIL_SENDING,
});
export const mailSuccess = () => ({
  type: MAIL_SUCCESS,
});
export const mailError = () => ({
  type: MAIL_ERROR,
});
export const reset = () => ({
  type: RESET,
});

export function send(contactsMap, message) {
  return async (dispatch, _, { sendMails }) => {
    const contacts = Object.values(contactsMap);
    const emails = contacts.map(c => c.email);
    const isEmailsUniq = uniq(emails).length === emails.length;
    if (!isEmailsUniq) {
      dispatch(setNotification('error', 'Emails should be uniq'));
    } else {
      dispatch(mailsRequest());
      try {
        await sendMails(
          contacts.map(c => ({
            id: c.id,
            forbidden: c.forbidden,
            name: c.name,
            email: c.email,
          })),
          message,
        );
        dispatch(mailSuccess());
      } catch (e) {
        dispatch(mailError());
        dispatch(setNotification('error', e.message));
      }
    }
  };
}
