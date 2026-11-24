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
import Panel from '../Panel/Panel';
import { AppState } from '../store/reducer';
import { ThunkExtraArgument } from '../api';

export const FORM_ID = 'secret-santa-form';

type Props = StateProps & DispatchProps;

const Contacts = ({ contacts, swithMode, customMode, onSend }: Props) => (
  <Panel
    icon="👥"
    title="Who's playing?"
    action={
      <FormControlLabel
        sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: 14, fontWeight: 500 } }}
        control={<Switch checked={customMode} onChange={swithMode} />}
        label="Exclusions"
      />
    }
    hint="Add at least 3 friends. Turn on exclusions to stop couples drawing each other."
  >
    <Box
      component="form"
      id={FORM_ID}
      onSubmit={onSend}
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, md: 2 }, pt: 0.5 }}
    >
      {contacts.map((contact) => (
        <ContactCard
          isRemovable={contacts.length > 3}
          contactId={contact}
          key={contact}
        />
      ))}
    </Box>
    <ContactActions />
  </Panel>
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
