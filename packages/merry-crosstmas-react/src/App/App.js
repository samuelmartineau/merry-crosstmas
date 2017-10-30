import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MerryHeader from 'Header/Header';
import MerryTitle from 'Title/Title';
import { CircularProgress } from 'material-ui/Progress';
import MerryEditor from 'Editor/Editor';
import MerryFooter from 'Footer/Footer';
import MerryContacts from 'Contacts/Contacts';
import MerryNotifications from 'Notifications/Notifications';
import Success from './Success';

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
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  spinner: {
    textAlign: 'center',
  },
});

const App = ({ classes, status }) => (
  <section className={classes.app}>
    <MerryHeader />
    {!status.sending &&
      !status.sended && [
        <MerryTitle key={1}>
          Write your message and tag the buyer with @you and recipient with @friend.
        </MerryTitle>,
        <MerryEditor key={2} />,
        <MerryTitle key={3}>Complete your friends informations (minimum 3 people)</MerryTitle>,
        <MerryContacts key={4} />,
        <MerryFooter key={5} />,
      ]}
    {status.sending && (
      <div className={classes.spinner}>
        <CircularProgress className={classes.progress} color="accent" size={100} />
      </div>
    )}
    {status.sended && <Success />}
    <MerryNotifications />
  </section>
);

export default compose(
  connect(state => ({
    status: state.contacts.status,
  })),
  withStyles(styles),
)(App);
