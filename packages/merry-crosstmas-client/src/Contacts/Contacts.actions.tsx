import uniq from 'lodash/uniq';
import { setNotification } from '../Notifications/Notifications.actions';
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
import { Dispatch } from 'redux';
import { MapState } from './Contacts.reducer';
import { ApiError, SendMails } from '../api';
import { Locale } from '../i18n/locale';
import { messages } from '../i18n/messages';

export const addChar = (id: number, key: 'name' | 'email', value: string) =>
  ({
    type: ADD_CHAR,
    key,
    id,
    value,
  }) as const;

export const addContact = () =>
  ({
    type: ADD_CONTACT,
    id: getNextId(),
  }) as const;

export const removeContact = (id: number) =>
  ({
    type: REMOVE_CONTACT,
    id,
  }) as const;

export const toggleSettings = () =>
  ({
    type: TOGGLE_MODE,
  }) as const;

export const toggleForbidden = (contactId: number, forbiddenId: number) =>
  ({
    type: TOGGLE_FORBIDDEN,
    contactId,
    forbiddenId,
  }) as const;

export const mailsRequest = () =>
  ({
    type: MAIL_SENDING,
  }) as const;

export const mailSuccess = () =>
  ({
    type: MAIL_SUCCESS,
  }) as const;

export const mailError = () =>
  ({
    type: MAIL_ERROR,
  }) as const;

export const reset = (locale: Locale) =>
  ({
    type: RESET,
    locale,
  }) as const;

const errorMessage = (locale: Locale, e: unknown) => {
  const { errors } = messages[locale];
  if (e instanceof ApiError) {
    if (e.status === 429) return errors.tooManyRequests;
    if (e.status === 400) return errors.invalid;
  }
  return errors.failed;
};

export function send(contactsMap: MapState, message: string, locale: Locale) {
  return async (
    dispatch: Dispatch,
    _: unknown,
    { sendMails }: { sendMails: SendMails },
  ) => {
    const contacts = Object.values(contactsMap);
    const emails = contacts.map((c) => c.email);
    const isEmailsUniq = uniq(emails).length === emails.length;
    if (!isEmailsUniq) {
      dispatch(
        setNotification('error', messages[locale].errors.duplicateEmails),
      );
    } else {
      dispatch(mailsRequest());
      try {
        await sendMails(
          contacts.map((c) => ({
            id: c.id,
            forbidden: c.forbidden,
            name: c.name,
            email: c.email,
          })),
          message,
          locale,
        );
        dispatch(mailSuccess());
      } catch (e) {
        dispatch(mailError());
        dispatch(setNotification('error', errorMessage(locale, e)));
      }
    }
  };
}

export type ContactsActions = ReturnType<
  | typeof addChar
  | typeof addContact
  | typeof removeContact
  | typeof toggleSettings
  | typeof toggleForbidden
  | typeof mailsRequest
  | typeof mailSuccess
  | typeof mailError
  | typeof reset
>;
