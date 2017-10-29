// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { getContactById, addChar } from 'store';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

type Props = {
  contactId: number,
};

const styles = theme => ({
  paper: {
    margin: '1em auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const ContactCard = ({ contact, classes, onChar }) => (
  <Paper className={classes.paper}>
    <fieldset>
      <TextField
        label="Email"
        placeholder="toto@gmail.com"
        className={classes.textField}
        margin="normal"
        type="email"
        onChange={onChar('email')}
      />
      <TextField
        label="Name"
        placeholder="Toto"
        className={classes.textField}
        margin="normal"
        onChange={onChar('name')}
      />
    </fieldset>
  </Paper>
);

export default compose(
  connect(
    (state, { contactId }: Props) => ({
      contact: getContactById(state, contactId),
    }),
    (dispatch, props) => ({
      onChar(key) {
        return evt => dispatch(addChar(props.contactId, key, evt.target.value));
      },
    }),
  ),
  withStyles(styles),
)(ContactCard);
