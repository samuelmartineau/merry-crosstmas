import React from 'react';
import { compose } from 'recompose';
import { WithStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { addContact } from '../store';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    button: {
      margin: theme.spacing(),
    },
  });

type Props = {
  contacts: Array<number>;
  canAddContact: boolean;
} & WithStyles<typeof styles>;

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
    <Button
      fab
      color="accent"
      aria-label="edit"
      type="submit"
      className={classes.button}
    >
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
