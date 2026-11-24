import Box from '@mui/material/Box';
import { candyStripe, colors, eyebrow, serif } from '../theme';

const Header = () => (
  <Box component="header">
    <Box sx={{ background: colors.red, color: '#fff' }}>
      <Box
        sx={{
          maxWidth: 1180,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 2, md: 3 },
          py: { xs: 1.5, md: 1.75 },
        }}
      >
        <Box component="span" aria-hidden sx={{ fontSize: 28, lineHeight: 1 }}>
          🎅
        </Box>
        <Box>
          <Box sx={{ fontFamily: serif, fontWeight: 700, fontSize: 22, lineHeight: 1.1 }}>
            Secret Santa
          </Box>
          <Box sx={{ ...eyebrow, fontSize: 10, color: colors.redSoft }}>
            Merry Crosstmas
          </Box>
        </Box>
      </Box>
    </Box>
    <Box sx={{ height: 10, background: candyStripe }} />
    <Box
      sx={{
        maxWidth: 1180,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        pt: { xs: 3.5, md: 5.5 },
      }}
    >
      <Box sx={{ ...eyebrow, fontSize: { xs: 10, md: 12 }, letterSpacing: { xs: '2px', md: '3px' } }}>
        Free · no sign-up · emails in one click
      </Box>
      <Box
        component="h1"
        sx={{
          m: '6px 0 0',
          fontFamily: serif,
          fontWeight: 700,
          color: colors.green,
          fontSize: { xs: 34, md: 52 },
          lineHeight: { xs: '40px', md: '58px' },
        }}
      >
        Draw names.
        <br />
        Send surprises.{' '}
        <span aria-hidden>🎁</span>
      </Box>
      <Box
        component="p"
        sx={{ m: '10px 0 0', color: colors.muted, fontSize: { xs: 15, md: 17 } }}
      >
        Everyone gets an email with their secret match. Even you won't know who
        has who.
      </Box>
    </Box>
  </Box>
);

export default Header;
