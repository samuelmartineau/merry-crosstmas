import React, { FC } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    title: {
      marginTop: '1em',
      textAlign: 'center',
      fontSize: '1.5rem',
      textShadow: '1px 1px white',
      padding: '0 .5em',
    },
  });

type Props = {} & WithStyles<typeof styles>;

const Title: FC<Props> = ({ classes, children }) => {
  return <h2 className={classes.title}>{children}</h2>;
};

export default withStyles(styles)(Title);
