
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  footer: {
    padding: '1em',
    textAlign: 'center',
  },
});

type Props = {
  classes: string,
};

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
