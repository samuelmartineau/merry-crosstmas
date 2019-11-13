import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    marginTop: '1em',
    textAlign: 'center',
    fontSize: '1.5rem',
    textShadow: '1px 1px white',
    padding: '0 .5em',
  },
});

const Title = ({ classes, children }) => {
  return <h2 className={classes.title}>{children}</h2>;
};

export default withStyles(styles)(Title);
