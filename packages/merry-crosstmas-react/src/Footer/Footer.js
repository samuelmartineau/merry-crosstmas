// @flow
import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  footer: {
    padding: "1em",
    textAlign: "center"
  }
});

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <a href="http://samuelmartineau.com" rel="nofollow" target="_blank">
        © Samuel Martineau
      </a>
    </footer>
  );
};

export default withStyles(styles)(Footer);
