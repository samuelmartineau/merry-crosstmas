import Box from '@mui/material/Box';
import Color from 'color';

type Props = { name: string; color: string; size?: number };

const Avatar = ({ name, color, size = 40 }: Props) => (
  <Box
    component="span"
    aria-hidden
    sx={{
      flex: 'none',
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 700,
      fontSize: size * 0.38,
      lineHeight: 1,
    }}
    style={{ background: color, color: Color(color).isLight() ? '#3d3a36' : '#fff' }}
  >
    {name.trim().charAt(0).toUpperCase() || '?'}
  </Box>
);

export default Avatar;
