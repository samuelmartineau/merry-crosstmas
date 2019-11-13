import { SET_NOTIFICATION, CLOSE_NOTIFICATION } from './Notifications.types';

export const reducer = (
  state = {
    show: false,
    kind: null,
    message: '',
  },
  action,
) => {
  switch (action.type) {
    case SET_NOTIFICATION: {
      return {
        show: true,
        kind: action.kind,
        message: action.message,
      };
    }
    case CLOSE_NOTIFICATION: {
      return {
        show: false,
        kind: null,
        message: '',
      };
    }
    default:
      return state;
  }
};

export default reducer;
