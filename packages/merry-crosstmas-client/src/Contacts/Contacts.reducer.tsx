import { combineReducers } from 'redux';
import randomColor from 'randomcolor';
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
import { ContactsActions } from '../store/actions';

function getNewContact(id: number) {
  const color = randomColor();
  return {
    name: '',
    email: '',
    forbidden: [] as number[],
    id,
    color,
  };
}

type Contact = {
  name: string;
  email: string;
  forbidden: number[];
  id: number;
  color: string;
};

const initialContacts = Array(3)
  .fill(null)
  .map(() => getNewContact(getNextId()));

const initialMapContacts = initialContacts.reduce(
  (acc, contact) =>
    Object.assign(acc, {
      [contact.id]: contact,
    }),
  {} as { [id: number]: Contact },
);
const initialAllContacts = initialContacts.map(contact => contact.id);

export type MapState = { [id: number]: Contact };

export const mapReducer = (
  state: MapState = initialMapContacts,
  action: ContactsActions,
) => {
  switch (action.type) {
    case ADD_CHAR:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.key]: action.value,
        },
      };
    case ADD_CONTACT: {
      const newContact = getNewContact(action.id);
      return {
        ...state,
        [newContact.id]: newContact,
      };
    }
    case REMOVE_CONTACT: {
      const { [action.id]: id, ...rest } = state;
      return rest;
    }
    case TOGGLE_FORBIDDEN: {
      const { contactId, forbiddenId } = action;
      const previousState = state[contactId];
      const index = previousState.forbidden.indexOf(forbiddenId);
      let newForbidden;
      if (index > -1) {
        newForbidden = [
          ...previousState.forbidden.slice(0, index),
          ...previousState.forbidden.slice(index + 1),
        ];
      } else {
        newForbidden = [...previousState.forbidden, forbiddenId];
      }
      return {
        ...state,
        [contactId]: {
          ...previousState,
          forbidden: newForbidden,
        },
      };
    }
    case RESET: {
      return initialMapContacts;
    }
    default:
      return state;
  }
};
export const getContactById = (state: MapState, id: number) => state[id];

type AllState = number[];

export const allReducer = (
  state: AllState = initialAllContacts,
  action: ContactsActions,
) => {
  switch (action.type) {
    case ADD_CONTACT: {
      return [...state, action.id];
    }
    case REMOVE_CONTACT: {
      const index = state.indexOf(action.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case RESET: {
      return initialAllContacts;
    }
    default:
      return state;
  }
};

type CustomModeState = boolean;

export const customModeReducer = (
  state: CustomModeState = false,
  action: ContactsActions,
) => {
  switch (action.type) {
    case TOGGLE_MODE: {
      return !state;
    }
    case RESET: {
      return false;
    }
    default:
      return state;
  }
};

const initialStatus = {
  sending: false,
  sended: false,
  error: false,
};

type StateState = {
  sending: boolean;
  sended: boolean;
  error: boolean;
};

export const statusReducer = (
  state: StateState = initialStatus,
  action: ContactsActions,
) => {
  switch (action.type) {
    case MAIL_SENDING: {
      return {
        sending: true,
        sended: false,
        error: false,
      };
    }
    case MAIL_SUCCESS: {
      return {
        sending: false,
        sended: true,
        error: false,
      };
    }
    case MAIL_ERROR: {
      return {
        sending: false,
        sended: false,
        error: true,
      };
    }
    case RESET: {
      return initialStatus;
    }
    default:
      return state;
  }
};

export const getForbiddenById = (state: StateType, contactId: number) => {
  const contact = getContactById(state.map, contactId);
  return state.all
    .filter(c => c !== contactId)
    .map(cId => ({
      ...getContactById(state.map, cId),
      isForbidden: contact.forbidden.includes(cId),
    }));
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer,
  customMode: customModeReducer,
  status: statusReducer,
});

type StateType = ReturnType<typeof reducer>;

export default reducer;
