import Box from '@mui/material/Box';
import { candyStripe, colors } from '../theme';

const Footer = () => (
  <Box component="footer">
    <Box
      sx={{
        textAlign: 'center',
        color: colors.faint,
        fontSize: 12,
        pt: 1,
        pb: { xs: 3, md: 4 },
        '& a': { color: colors.faint },
      }}
    >
      Made with ❤️ by{' '}
      <a href="http://samuelmartineau.com" rel="noopener noreferrer" target="_blank">
        Samuel Martineau
      </a>
    </Box>
    <Box sx={{ height: 6, background: candyStripe }} />
  </Box>
);

export default Footer;
