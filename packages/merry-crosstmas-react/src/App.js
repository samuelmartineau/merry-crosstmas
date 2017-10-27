import React from "react";
import { withStyles } from "material-ui/styles";
import MerryHeader from "Header/Header";
import logo from "./logo.svg";
import "./App.css";

const styles = theme => ({
  app: {
    overflow: "auto",
    backgroundImage:
      "linear-gradient(60deg, rgba(255, 165, 150, .5) 5%, rgba(0, 228, 255, .35)), url('background.jpg')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "3em"
  }
});

const App = ({ classes }) => (
  <section className={classes.app}>
    <MerryHeader />
  </section>
);

export default withStyles(styles)(App);

{
  /* <app-instructions>Write your message and tag the friend name with @friend</app-instructions>
      <app-editor></app-editor>
      <app-instructions>Complete your friends informations (minimum 3 people)</app-instructions>
      <app-contacts></app-contacts>
      <app-footer></app-footer> */
}
