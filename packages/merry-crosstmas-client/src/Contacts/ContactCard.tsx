import React from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch } from 'redux';
import ContactForbidden from './ContactForbidden';
import Avatar from './Avatar';
import { getContactById, addChar, removeContact } from '../store';
import { AppState } from '../store/reducer';
import { colors } from '../theme';
import { useT } from '../i18n/useT';

type Props = {
  isRemovable: boolean;
} & StateProps &
  DispatchProps;

const ContactCard = ({
  contact,
  onChar,
  onRemove,
  isRemovable,
  customMode,
}: Props) => {
  const t = useT();
  return (
    <Box
      sx={{
        background: {
          xs: colors.paper,
          md: customMode ? colors.paper : 'transparent',
        },
        border: '1px solid',
        borderColor: {
          xs: colors.line,
          md: customMode ? colors.line : 'transparent',
        },
        borderRadius: '14px',
        p: { xs: 1.25, md: customMode ? 1.25 : 0 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 1.25,
        }}
      >
        <Avatar name={contact.name} color={contact.color} />
        <TextField
          label={t.contacts.name}
          placeholder={t.contacts.namePlaceholder}
          sx={{ flex: { xs: '1 1 calc(100% - 100px)', md: '0 0 30%' } }}
          name={`name-${contact.id}`}
          value={contact.name}
          onChange={onChar('name')}
          required
        />
        <TextField
          label={t.contacts.email}
          placeholder={t.contacts.emailPlaceholder}
          sx={{
            flex: { xs: '1 1 100%', md: '1 1 auto' },
            order: { xs: 4, md: 0 },
          }}
          name={`email-${contact.id}`}
          type="email"
          value={contact.email}
          onChange={onChar('email')}
          required
        />
        {isRemovable ? (
          <IconButton
            aria-label={t.contacts.delete}
            onClick={onRemove}
            sx={{ color: colors.faint }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : (
          <Box sx={{ width: 40, flex: 'none' }} />
        )}
      </Box>
      {customMode && <ContactForbidden contactId={contact.id} />}
    </Box>
  );
};

type OwnProps = {
  contactId: number;
};

const mapStateToProps = (state: AppState, { contactId }: OwnProps) => ({
  contact: getContactById(state, contactId),
  customMode: state.contacts.customMode,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, { contactId }: OwnProps) => ({
  onChar(key: 'email' | 'name') {
    return (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      dispatch(addChar(contactId, key, evt.currentTarget.value));
  },
  onRemove() {
    dispatch(removeContact(contactId));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
