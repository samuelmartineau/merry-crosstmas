import { ReactNode } from 'react';
import Box from '@mui/material/Box';

type Props = { children?: ReactNode };

const Title = ({ children }: Props) => (
  <Box
    component="h2"
    sx={{
      marginTop: '1em',
      textAlign: 'center',
      fontSize: '1.5rem',
      textShadow: '1px 1px white',
      padding: '0 .5em',
    }}
  >
    {children}
  </Box>
);

export default Title;
