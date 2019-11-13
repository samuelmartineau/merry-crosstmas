import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { WithStyles } from '@material-ui/styles';
import Color from 'color';
import ContactForbidden from '../Contacts/ContactForbidden';
import { getContactById, addChar, removeContact } from '../store';

const styles = (theme: Theme) =>
  createStyles({
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
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(),
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
  });

type ContactCardProps = {
  contact: {};
  classes: {};
  onChar: Function;
  onRemove: Function;
  isRemovable: boolean;
  customMode: boolean;
} & WithStyles<typeof styles>;

const ContactCard = ({
  contact,
  classes,
  onChar,
  onRemove,
  isRemovable,
  customMode,
}: ContactCardProps) => (
  <Paper className={classes.paper}>
    {isRemovable && (
      <IconButton
        className={classes.button}
        aria-label="Delete"
        onClick={onRemove}
      >
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
  contactId: number;
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
