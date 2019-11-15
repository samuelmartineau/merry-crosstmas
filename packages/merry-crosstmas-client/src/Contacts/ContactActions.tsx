import React from 'react';
import { WithStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { addContact } from '../store';
import { AppState } from '../store/reducer';
import { Dispatch } from 'redux';

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

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

const ContactActions = ({ classes, onAdd, canAddContact }: Props) => (
  <div className={classes.root}>
    <Button
      color="primary"
      aria-label="add"
      className={classes.button}
      onClick={onAdd}
      disabled={!canAddContact}
    >
      <AddIcon />
    </Button>
    <Button
      color="secondary"
      aria-label="edit"
      type="submit"
      className={classes.button}
    >
      <SendIcon />
    </Button>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  canAddContact: state.contacts.all.length < 20,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAdd() {
    dispatch(addContact());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ContactActions));
