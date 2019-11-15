import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { closeNotification } from '../store';
import { WithStyles } from '@material-ui/styles';
import { AppState } from '../store/reducer';
import { Dispatch } from 'redux';

const styles = (theme: Theme) =>
  createStyles({
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

type NotificationsProps = StateProps &
  DispatchProps &
  WithStyles<typeof styles>;

const Notifications = ({
  show,
  message,
  classes,
  onClose,
  kind,
}: NotificationsProps) => {
  if (!kind) return null;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={show}
      ContentProps={{
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
};

const mapStateToProps = (state: AppState) => ({
  ...state.notifications,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose() {
    dispatch(closeNotification());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Notifications));
