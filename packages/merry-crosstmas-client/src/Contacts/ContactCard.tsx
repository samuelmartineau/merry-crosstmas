import React from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Color from 'color';
import { Dispatch } from 'redux';
import ContactForbidden from './ContactForbidden';
import { getContactById, addChar, removeContact } from '../store';
import { AppState } from '../store/reducer';

const textFieldSx = { mx: 1, flexGrow: 1 };

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
}: Props) => (
  <Paper
    sx={{
      position: 'relative',
      margin: '1em auto',
      '&:after': {
        content: '" "',
        display: 'table',
      },
    }}
  >
    {isRemovable && (
      <IconButton
        sx={{ m: 1, position: 'absolute', right: 0, zIndex: 1 }}
        aria-label="Delete"
        onClick={onRemove}
      >
        <DeleteIcon />
      </IconButton>
    )}
    <Box
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      style={{
        background: Color(contact.color).fade(0.5).string(),
      }}
    >
      <TextField
        variant="standard"
        label="Name"
        placeholder="Toto"
        sx={textFieldSx}
        name={`name-${contact.id}`}
        margin="normal"
        value={contact.name}
        onChange={onChar('name')}
        required
      />
      <TextField
        variant="standard"
        label="Email"
        placeholder="toto@gmail.com"
        sx={textFieldSx}
        margin="normal"
        name={`email-${contact.id}`}
        type="email"
        value={contact.email}
        onChange={onChar('email')}
        required
      />
    </Box>
    {customMode && <ContactForbidden contactId={contact.id} />}
  </Paper>
);

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
