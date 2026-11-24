// thumb up
import { connect } from 'react-redux';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Dispatch } from 'redux';
import { reset } from '../store';

type Props = DispatchProps;

const Success = ({ onReset }: Props) => (
  <Paper sx={{ padding: '1em', textAlign: 'center', color: 'green' }}>
    <ThumbUpIcon
      style={{
        width: 100,
        height: 100,
      }}
    />
    <h2>Mails sent with success</h2>
    <Button onClick={onReset} color="primary" sx={{ m: 1 }}>
      Manage another secret santa
    </Button>
  </Paper>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReset() {
    dispatch(reset());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Success);
