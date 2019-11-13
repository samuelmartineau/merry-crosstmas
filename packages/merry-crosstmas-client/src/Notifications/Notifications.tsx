import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeNotification } from '../store';

const styles = theme => ({
  close: {
    width: theme.spacing() * 4,
    height: theme.spacing() * 4,
  },
  error: {
    background: 'red',
  },
  success: {
    background: 'green',
  },
});

type NotificationsProps = {
  show: boolean;
  message: string;
  classes: {};
  onClose: Function;
  kind: ['error', 'success'];
};

const Notifications = ({
  show,
  message,
  classes,
  onClose,
  kind,
}: NotificationsProps) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={show}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
      classes: {
        root: classes[kind],
      },
    }}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

export default compose(
  connect(
    state => ({
      ...state.notifications,
    }),
    dispatch => ({
      onClose() {
        dispatch(closeNotification());
      },
    }),
  ),
  withStyles(styles),
)(Notifications);
