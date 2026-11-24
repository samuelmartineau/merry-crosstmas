import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch } from 'redux';
import { closeNotification } from '../store';
import { AppState } from '../store/reducer';
import { colors } from '../theme';
import { useT } from '../i18n/useT';

const backgrounds = {
  error: colors.red,
  success: colors.green,
};

type NotificationsProps = StateProps & DispatchProps;

const Notifications = ({
  show,
  message,
  onClose,
  kind,
}: NotificationsProps) => {
  const t = useT();
  if (!kind) return null;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={show}
      slotProps={{
        content: {
          'aria-describedby': 'message-id',
          sx: { background: backgrounds[kind], borderRadius: '12px' },
        },
      }}
      message={<span id="message-id">{message}</span>}
      action={
        <IconButton
          aria-label={t.close}
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
