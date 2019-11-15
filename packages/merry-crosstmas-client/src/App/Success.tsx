// thumb up
import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { reset } from '../store';
import { Dispatch } from 'redux';

const styles = (theme: Theme) =>
  createStyles({
    success: {
      padding: '1em',
      textAlign: 'center',
      color: 'green',
    },
    button: {
      margin: theme.spacing(),
    },
  });

type Props = DispatchProps & WithStyles<typeof styles>;

const Success = ({ classes, onReset }: Props) => (
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReset() {
    dispatch(reset());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(null, mapDispatchToProps)(withStyles(styles)(Success));
