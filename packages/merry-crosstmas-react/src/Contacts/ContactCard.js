// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { getContactById, addChar, removeContact } from 'store';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ContactForbidden from 'Contacts/ContactForbidden';
import Color from 'color';

const styles = theme => ({
  paper: {
    margin: '1em auto',
    '&:after': {
      content: '" "',
      display: 'table',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

type ContactCardProps = {
  contact: {},
  classes: {},
  onChar: Function,
  onRemove: Function,
  isRemovable: boolean,
  customMode: boolean,
};

const ContactCard = ({
  contact,
  classes,
  onChar,
  onRemove,
  isRemovable,
  customMode,
}:
ContactCardProps) => (
  <Paper className={classes.paper}>
    {isRemovable && (
      <IconButton className={classes.button} aria-label="Delete" onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    )}
    <div
      className={classes.container}
      style={{
        background: Color(contact.color).fade(0.5),
      }}
    >
      <TextField
        label="Name"
        placeholder="Toto"
        className={classes.textField}
        name={`name-${contact.id}`}
        margin="normal"
        value={contact.name}
        onChange={onChar('name')}
        required
      />
      <TextField
        label="Email"
        placeholder="toto@gmail.com"
        className={classes.textField}
        margin="normal"
        name={`email-${contact.id}`}
        type="email"
        value={contact.email}
        onChange={onChar('email')}
        required
      />
    </div>
    {customMode && <ContactForbidden contactId={contact.id} />}
  </Paper>
);

type Props = {
  contactId: number,
};

export default compose(
  connect(
    (state, { contactId }: Props) => ({
      contact: getContactById(state, contactId),
      customMode: state.contacts.customMode,
    }),
    (dispatch, props) => ({
      onChar(key) {
        return evt => dispatch(addChar(props.contactId, key, evt.target.value));
      },
      onRemove() {
        dispatch(removeContact(props.contactId));
      },
    }),
  ),
  withStyles(styles),
)(ContactCard);
