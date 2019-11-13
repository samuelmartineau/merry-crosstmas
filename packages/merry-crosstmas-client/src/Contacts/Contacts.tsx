import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { toggleSettings, send } from '../store';
import ContactCard from '../Contacts/ContactCard';
import ContactActions from '../Contacts/ContactActions';

type Props = {
  contacts: Array<number>;
  classes: {
    root: any;
  };
  swithMode: Function;
  onSend: Function;
  customMode: boolean;
};

const styles = {
  root: {
    flexDirection: 'column',
  },
  switchRoot: {
    margin: 0,
  },
  form: {
    overflow: 'hidden',
  },
};

const Contacts = ({
  contacts,
  classes,
  swithMode,
  customMode,
  onSend,
}: Props) => (
  <form
    className={classes.form}
    onSubmit={onSend}
    autoComplete="off"
    role="presentation"
  >
    <FormControlLabel
      className={classes.switchRoot}
      control={<Switch checked={customMode} onChange={swithMode} />}
      label="Custom Mode (ie: exclusions)"
    />
    <div className={classes.root}>
      <FlipMove duration={200} easing="ease-out">
        {contacts.map((contact, index) => (
          <ContactCard
            isRemovable={contacts.length > 3}
            contactId={contact}
            key={contact}
            order={index}
            scrollTo={index > 2 && index === contacts.length - 1}
          />
        ))}
      </FlipMove>
    </div>
    <ContactActions />
  </form>
);

export default compose(
  connect(
    state => ({
      customMode: state.contacts.customMode,
      contacts: state.contacts.all,
    }),
    dispatch => ({
      swithMode() {
        dispatch(toggleSettings());
      },
      onSend(evt) {
        evt.preventDefault();
        dispatch(send());
      },
    }),
  ),
  withStyles(styles),
)(Contacts);
