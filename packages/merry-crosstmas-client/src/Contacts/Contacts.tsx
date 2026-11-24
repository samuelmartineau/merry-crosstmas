import React from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { toggleSettings, send } from '../store';
import ContactCard from './ContactCard';
import ContactActions from './ContactActions';
import { AppState } from '../store/reducer';
import { ThunkExtraArgument } from '../api';

type Props = StateProps & DispatchProps;

const Contacts = ({ contacts, swithMode, customMode, onSend }: Props) => (
  <Box
    component="form"
    sx={{ overflow: 'hidden' }}
    onSubmit={onSend}
    autoComplete="off"
    role="presentation"
  >
    <FormControlLabel
      sx={{ margin: 0 }}
      control={<Switch checked={customMode} onChange={swithMode} />}
      label="Custom Mode (ie: exclusions)"
    />
    <Box sx={{ flexDirection: 'column' }}>
      {contacts.map((contact) => (
        <ContactCard
          isRemovable={contacts.length > 3}
          contactId={contact}
          key={contact}
        />
      ))}
    </Box>
    <ContactActions />
  </Box>
);

const mapStateToProps = (state: AppState) => ({
  customMode: state.contacts.customMode,
  contacts: state.contacts.all,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, ThunkExtraArgument, UnknownAction>,
) => ({
  swithMode() {
    dispatch(toggleSettings());
  },
  onSend(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(send());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
