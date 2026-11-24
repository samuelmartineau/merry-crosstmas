import { createTheme } from '@mui/material/styles';

// Palette shared with the Candy Cane email (server/mail/template.hbs).
export const colors = {
  red: '#c8102e',
  redDark: '#a00d25',
  redSoft: '#ffd7dc',
  green: '#1e6b3a',
  greenDark: '#165530',
  greenSoft: '#e3f0e7',
  cream: '#f4ede4',
  paper: '#fbf6ef',
  line: '#f0e6d8',
  line2: '#e7d8c4',
  ink: '#3d3a36',
  muted: '#8a7a6a',
  faint: '#9b8c7c',
};

export const serif = "Georgia, 'Times New Roman', serif";
export const sans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const candyStripe = `repeating-linear-gradient(-45deg, ${colors.red} 0 12px, #fff 12px 24px)`;

export const eyebrow = {
  fontSize: 12,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: colors.muted,
} as const;

const theme = createTheme({
  spacing: 8,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  palette: {
    primary: { main: colors.green, dark: colors.greenDark, contrastText: '#fff' },
    secondary: { main: colors.red, dark: colors.redDark, contrastText: '#fff' },
    error: { main: colors.red },
    success: { main: colors.green },
    background: { default: colors.cream, paper: '#fff' },
    text: { primary: colors.ink, secondary: colors.muted },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: sans,
    h1: { fontFamily: serif, fontWeight: 700 },
    h2: { fontFamily: serif, fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: { boxShadow: '0 6px 16px rgba(30,107,58,.25)' },
        },
      ],
      styleOverrides: {
        root: { borderRadius: 999, padding: '12px 24px', fontSize: 15 },
        outlined: {
          borderWidth: 2,
          borderColor: colors.line2,
          background: '#fff',
          '&:hover': { borderWidth: 2 },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#fff',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.line2,
            borderWidth: 1.5,
          },
        },
      },
    },
  },
});

export default theme;
