import { Contact } from './Contacts/Contacts.reducer';
import { Locale } from './i18n/locale';

const apiBase = import.meta.env.REACT_APP_API || '';

interface TypedResponse<T = unknown> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function sendMails(
  contacts: Omit<Contact, 'color'>[],
  content: string,
  locale: Locale,
) {
  return fetch(`${apiBase}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contacts, content, locale }),
  }).then((response: TypedResponse<{ message: string }>) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    return response
      .json()
      .catch(() => ({ message: response.statusText }))
      .then((result) =>
        Promise.reject(new ApiError(response.status, result.message)),
      );
  });
}

export default sendMails;

export type SendMails = typeof sendMails;

export type ThunkExtraArgument = { sendMails: SendMails };
