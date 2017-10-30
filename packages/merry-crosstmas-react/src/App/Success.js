// thumb up
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reset } from 'store';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  success: {
    padding: '1em',
    textAlign: 'center',
    color: 'green',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Success = ({ classes, onReset }) => (
  <Paper className={classes.success}>
    <ThumbUpIcon
      style={{
        width: 100,
        height: 100,
      }}
    />
    <h2>Mails sent with success</h2>
    <Button onClick={onReset} color="primary" className={classes.button}>
      Manage another secret santa
    </Button>
  </Paper>
);

export default compose(
  connect(
    () => ({}),
    dispatch => ({
      onReset() {
        dispatch(reset());
      },
    }),
  ),
  withStyles(styles),
)(Success);
