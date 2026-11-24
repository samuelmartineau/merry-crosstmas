import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';
import MerryHeader from '../Header/Header';
import MerryTitle from '../Title/Title';
import MerryEditor from '../Editor/Editor';
import MerryFooter from '../Footer/Footer';
import MerryContacts from '../Contacts/Contacts';
import MerryNotifications from '../Notifications/Notifications';
import Success from './Success';
import { AppState } from '../store/reducer';

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundImage:
          "linear-gradient(60deg, rgba(255, 165, 150, .5) 5%, rgba(0, 228, 255, .35)), url('background.jpg')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    }}
  />
);

type Props = StateProps;

export const App = ({ status }: Props) => (
  <Box
    component="section"
    sx={{
      overflow: 'auto',
      marginBottom: '3em',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '600px',
    }}
  >
    {globalStyles}
    <MerryHeader />
    {!status.sending && !status.sended && (
      <>
        <MerryTitle>
          Write your message and tag the buyer with @you and recipient with
          @friend.
        </MerryTitle>
        <MerryEditor />
        <MerryTitle>
          Complete your friends informations (minimum 3 people)
        </MerryTitle>
        <MerryContacts />
        <MerryFooter />
      </>
    )}
    {status.sending && (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ mx: 2 }} color="primary" size={100} />
      </Box>
    )}
    {status.sended && <Success />}
    <MerryNotifications />
  </Box>
);

const mapStateToProps = (state: AppState) => ({
  status: state.contacts.status,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(App);
