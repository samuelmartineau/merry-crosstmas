import React from 'react';
import { withStyles } from 'material-ui/styles';
import MerryHeader from 'Header/Header';
import MerryTitle from 'Title/Title';
import MerryEditor from 'Editor/Editor';
import MerryFooter from 'Footer/Footer';
import MerryContacts from 'Contacts/Contacts';

const styles = theme => ({
  '@global': {
    body: {
      backgroundImage:
        "linear-gradient(60deg, rgba(255, 165, 150, .5) 5%, rgba(0, 228, 255, .35)), url('background.jpg')",
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  },
  app: {
    overflow: 'auto',
    marginBottom: '3em',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '600px',
  },
});

const App = ({ classes }) => (
  <section className={classes.app}>
    <MerryHeader />
    <MerryTitle>
      Write your message and tag the buyer with @you and recipient with @friend.
    </MerryTitle>
    <MerryEditor />
    <MerryTitle>Complete your friends informations (minimum 3 people)</MerryTitle>
    <MerryContacts />
    <MerryFooter />
  </section>
);

export default withStyles(styles)(App);
