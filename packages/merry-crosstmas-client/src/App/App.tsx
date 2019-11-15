import React from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import MerryHeader from '../Header/Header';
import MerryTitle from '../Title/Title';
import MerryEditor from '../Editor/Editor';
import MerryFooter from '../Footer/Footer';
import MerryContacts from '../Contacts/Contacts';
import MerryNotifications from '../Notifications/Notifications';
import Success from './Success';
import { AppState } from '../store/reducer';

// Theme-dependent styles
const styles = (theme: Theme) =>
  createStyles({
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
      margin: `0 ${theme.spacing(2)}px`,
    },
    spinner: {
      textAlign: 'center',
    },
  });

type Props = StateProps & WithStyles<typeof styles>;

const App = ({ classes, status }: Props) => (
  <section className={classes.app}>
    <MerryHeader />
    {!status.sending &&
      !status.sended && [
        <MerryTitle key={1}>
          Write your message and tag the buyer with @you and recipient with
          @friend.
        </MerryTitle>,
        <MerryEditor key={2} />,
        <MerryTitle key={3}>
          Complete your friends informations (minimum 3 people)
        </MerryTitle>,
        <MerryContacts key={4} />,
        <MerryFooter key={5} />,
      ]}
    {status.sending && (
      <div className={classes.spinner}>
        <CircularProgress
          className={classes.progress}
          color="primary"
          size={100}
        />
      </div>
    )}
    {status.sended && <Success />}
    <MerryNotifications />
  </section>
);

const mapStateToProps = (state: AppState) => ({
  status: state.contacts.status,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(withStyles(styles)(App));
