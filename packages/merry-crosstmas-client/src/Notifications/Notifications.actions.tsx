import { SET_NOTIFICATION, CLOSE_NOTIFICATION } from './Notifications.types';

export const setNotification = (kind, message) => ({
  type: SET_NOTIFICATION,
  kind,
  message,
});
export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});
