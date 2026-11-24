import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dispatch } from 'redux';
import { reset } from '../store';
import { colors, serif } from '../theme';

type Props = DispatchProps;

const Success = ({ onReset }: Props) => (
  <Box sx={{ textAlign: 'center' }}>
    <Box sx={{ fontSize: 64, lineHeight: 1 }} aria-hidden>
      🎉
    </Box>
    <Box
      component="h2"
      sx={{ fontFamily: serif, color: colors.green, fontSize: { xs: 28, md: 34 }, m: '16px 0 8px' }}
    >
      Emails sent!
    </Box>
    <Box component="p" sx={{ color: colors.muted, m: '0 auto 24px', maxWidth: 420 }}>
      Everyone just received their secret match. If someone can't find theirs,
      ask them to check their spam folder.
    </Box>
    <Button variant="contained" color="primary" onClick={onReset}>
      Organize another Secret Santa
    </Button>
  </Box>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReset() {
    dispatch(reset());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(Success);
