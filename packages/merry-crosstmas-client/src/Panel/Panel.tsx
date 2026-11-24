import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { colors, serif } from '../theme';

type Props = {
  title: ReactNode;
  icon?: string;
  action?: ReactNode;
  hint?: ReactNode;
  children?: ReactNode;
};

const Panel = ({ title, icon, action, hint, children }: Props) => (
  <Box
    component="section"
    sx={{
      background: '#fff',
      borderRadius: { xs: '16px', md: '20px' },
      p: { xs: '20px 16px', md: '26px 28px' },
      boxShadow: '0 10px 30px rgba(90,60,30,.07)',
      mb: 3,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 0.75,
      }}
    >
      <Box
        component="h2"
        sx={{
          m: 0,
          fontFamily: serif,
          fontSize: { xs: 21, md: 24 },
          whiteSpace: 'nowrap',
          color: colors.ink,
        }}
      >
        {icon && (
          <Box component="span" aria-hidden sx={{ mr: 1 }}>
            {icon}
          </Box>
        )}
        {title}
      </Box>
      {action}
    </Box>
    {hint && (
      <Box
        component="p"
        sx={{ m: '0 0 16px', color: colors.muted, fontSize: 14, lineHeight: '21px' }}
      >
        {hint}
      </Box>
    )}
    {children}
  </Box>
);

export const Tag = ({ kind, children }: { kind: 'you' | 'friend'; children: ReactNode }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      borderRadius: 999,
      px: 1.25,
      fontWeight: 700,
      background: kind === 'you' ? colors.redSoft : colors.greenSoft,
      color: kind === 'you' ? colors.redDark : colors.green,
    }}
  >
    {children}
  </Box>
);

export default Panel;
