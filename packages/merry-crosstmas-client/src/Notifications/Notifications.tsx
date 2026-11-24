import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch } from 'redux';
import { closeNotification } from '../store';
import { AppState } from '../store/reducer';

const backgrounds = {
  error: 'red',
  success: 'green',
};

type NotificationsProps = StateProps & DispatchProps;

const Notifications = ({
  show,
  message,
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
      slotProps={{
        content: {
          'aria-describedby': 'message-id',
          sx: { background: backgrounds[kind] },
        },
      }}
      message={<span id="message-id">{message}</span>}
      action={
        <IconButton
          aria-label="Close"
          color="inherit"
          sx={{ width: 32, height: 32 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
