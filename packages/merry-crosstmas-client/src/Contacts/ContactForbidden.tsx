import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { Dispatch } from 'redux';
import Avatar from './Avatar';
import { getContactById, getForbiddenById, toggleForbidden } from '../store';
import { AppState } from '../store/reducer';
import { colors } from '../theme';
import { useT } from '../i18n/useT';

type Props = StateProps & DispatchProps;

const ContactForbidden = ({ name, forbidden, onToggle, onlyOne }: Props) => {
  const t = useT();
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 1,
        mt: 1.5,
        ml: { xs: 0, md: '50px' },
        pt: 1.5,
        borderTop: `1px dashed ${colors.line2}`,
      }}
    >
      <Box component="span" sx={{ fontSize: 13, color: colors.muted, mr: 0.5 }}>
        {t.contacts.canDraw(name.trim() || t.contacts.thisFriend)}
      </Box>
      {forbidden.map((item, index) => {
        const label = item.name.trim() || t.contacts.friendN(index + 1);
        return (
          <ButtonBase
            key={item.id}
            disabled={onlyOne && !item.isForbidden}
            onClick={onToggle(item.id)}
            aria-pressed={!item.isForbidden}
            title={
              item.isForbidden
                ? t.contacts.allow(label)
                : t.contacts.never(label)
            }
            sx={{
              gap: 0.75,
              borderRadius: 999,
              p: '5px 12px 5px 5px',
              fontSize: 13,
              fontWeight: 500,
              border: `1.5px solid ${colors.line2}`,
              background: '#fff',
              color: colors.ink,
              ...(item.isForbidden && {
                background: colors.paper,
                color: '#b3a596',
                textDecoration: 'line-through',
                borderStyle: 'dashed',
                '& > span:first-of-type': { opacity: 0.4 },
              }),
              '&.Mui-disabled': { opacity: 0.6 },
            }}
          >
            <Avatar name={label} color={item.color} size={20} />
            {label}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

type OwnProps = {
  contactId: number;
};

const mapStateToProps = (state: AppState, { contactId }: OwnProps) => {
  const forbidden = getForbiddenById(state, contactId);
  return {
    name: getContactById(state, contactId).name,
    forbidden,
    onlyOne: forbidden.filter((f) => !f.isForbidden).length === 1,
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, { contactId }: OwnProps) => ({
  onToggle(forbiddenId: number) {
    return () => dispatch(toggleForbidden(contactId, forbiddenId));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactForbidden);
