import { useDispatch } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { setLocale } from './Locale.actions';
import { Locale, LOCALES } from './locale';
import { messages } from './messages';
import { useLocale, useT } from './useT';
import { colors } from '../theme';

const LocaleSwitch = () => {
  const locale = useLocale();
  const t = useT();
  const dispatch = useDispatch();
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={locale}
      aria-label={t.switchLabel}
      onChange={(_, value: Locale | null) =>
        value && dispatch(setLocale(value))
      }
      sx={{
        ml: 'auto',
        background: 'rgba(255,255,255,.12)',
        borderRadius: 999,
        p: '3px',
        '& .MuiToggleButton-root': {
          border: 0,
          borderRadius: '999px !important',
          color: '#fff',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: '1px',
          lineHeight: 1,
          px: 1.25,
          py: 0.75,
          '&.Mui-selected, &.Mui-selected:hover': {
            background: '#fff',
            color: colors.red,
          },
        },
      }}
    >
      {LOCALES.map((l) => (
        <ToggleButton
          key={l}
          value={l}
          lang={l}
          aria-label={messages[l].langName}
        >
          {l.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LocaleSwitch;
