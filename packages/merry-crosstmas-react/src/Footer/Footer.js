// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  footer: {
    padding: '1em',
    textAlign: 'center',
  },
});

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <a href="http://samuelmartineau.com" rel="noopener noreferrer" target="_blank">
      © Samuel Martineau
    </a>
  </footer>
);

export default withStyles(styles)(Footer);
