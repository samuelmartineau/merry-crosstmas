import { SET_NOTIFICATION, CLOSE_NOTIFICATION } from './Notifications.types';
import { NotificationsActions } from '../store/actions';

type State = {
  kind: 'error' | 'success' | null;
  message: string;
  show: boolean;
};

export const reducer = (
  state: State = {
    show: false,
    kind: null,
    message: '',
  },
  action: NotificationsActions,
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
