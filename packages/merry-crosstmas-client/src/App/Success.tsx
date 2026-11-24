import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { reset } from '../store';
import { useLocale, useT } from '../i18n/useT';
import { colors, serif } from '../theme';

const Success = () => {
  const locale = useLocale();
  const t = useT();
  const dispatch = useDispatch();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ fontSize: 64, lineHeight: 1 }} aria-hidden>
        🎉
      </Box>
      <Box
        component="h2"
        sx={{
          fontFamily: serif,
          color: colors.green,
          fontSize: { xs: 28, md: 34 },
          m: '16px 0 8px',
        }}
      >
        {t.success.title}
      </Box>
      <Box
        component="p"
        sx={{ color: colors.muted, m: '0 auto 24px', maxWidth: 420 }}
      >
        {t.success.body}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(reset(locale))}
      >
        {t.success.again}
      </Button>
    </Box>
  );
};

export default Success;
