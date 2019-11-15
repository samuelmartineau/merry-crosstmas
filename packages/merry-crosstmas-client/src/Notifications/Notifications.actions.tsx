import { SET_NOTIFICATION, CLOSE_NOTIFICATION } from './Notifications.types';

export const setNotification = (kind: 'error' | 'success', message: string) =>
  ({
    type: SET_NOTIFICATION,
    kind,
    message,
  } as const);

export const closeNotification = () =>
  ({
    type: CLOSE_NOTIFICATION,
  } as const);

export type NotificationsActions = ReturnType<
  typeof setNotification | typeof closeNotification
>;
