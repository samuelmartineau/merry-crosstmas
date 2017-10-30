// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { addContact } from 'store';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SendIcon from 'material-ui-icons/Send';

type Props = {
  contacts: Array<number>,
  canAddContact: boolean,
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const ContactActions = ({ classes, onAdd, canAddContact }: Props) => (
  <div className={classes.root}>
    <Button
      fab
      color="primary"
      aria-label="add"
      className={classes.button}
      onClick={onAdd}
      disabled={!canAddContact}
    >
      <AddIcon />
    </Button>
    <Button fab color="accent" aria-label="edit" type="submit" className={classes.button}>
      <SendIcon />
    </Button>
  </div>
);

export default compose(
  connect(
    state => ({
      canAddContact: state.contacts.all.length < 20,
    }),
    dispatch => ({
      onAdd() {
        dispatch(addContact());
      },
    }),
  ),
  withStyles(styles),
)(ContactActions);
