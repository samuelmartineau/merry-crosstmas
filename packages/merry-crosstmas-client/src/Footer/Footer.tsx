import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    footer: {
      padding: '1em',
      textAlign: 'center',
    },
  });

type Props = WithStyles<typeof styles>;

const Footer = ({ classes }: Props) => (
  <footer className={classes.footer}>
    <a
      href="http://samuelmartineau.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      © Samuel Martineau
    </a>
  </footer>
);

export default withStyles(styles)(Footer);
