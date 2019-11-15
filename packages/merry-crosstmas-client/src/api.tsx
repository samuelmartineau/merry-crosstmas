import { Contact } from './Contacts/Contacts.reducer';

const apiBase = process.env.REACT_APP_API || '';

interface TypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

export function sendMails(contacts: Omit<Contact, 'color'>[], content: string) {
  return fetch(`${apiBase}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contacts, content }),
  }).then((response: TypedResponse<{ message: string }>) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else if (response.status === 429) {
      return Promise.reject(new Error('Too Many Requests'));
    }
    return response
      .json()
      .then(result => Promise.reject(new Error(result.message)));
  });
}

export default sendMails;

export type SendMails = typeof sendMails;
