import React from 'react';
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
import { Dispatch } from 'redux';
import { AppState } from '../store/reducer';

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

type Props = {
  isRemovable: boolean;
} & StateProps &
  DispatchProps &
  WithStyles<typeof styles>;

const ContactCard = ({
  contact,
  classes,
  onChar,
  onRemove,
  isRemovable,
  customMode,
}: Props) => {
  return (
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
          background: Color(contact.color)
            .fade(0.5)
            .string(),
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
}

const mapStateToProps = (
  state: AppState,
  {
    contactId,
  }: {
    contactId: number;
  },
) => ({
  contact: getContactById(state, contactId),
  customMode: state.contacts.customMode,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (
  dispatch: Dispatch,
  {
    contactId,
  }: {
    contactId: number;
  },
) => ({
  onChar(key: 'email' | 'name') {
    return (evt: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(addChar(contactId, key, evt.currentTarget.value));
  },
  onRemove() {
    dispatch(removeContact(contactId));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ContactCard));
