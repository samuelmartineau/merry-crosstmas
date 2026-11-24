import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';
import MerryHeader from '../Header/Header';
import MerryEditor from '../Editor/Editor';
import MerryFooter from '../Footer/Footer';
import MerryContacts from '../Contacts/Contacts';
import MerryNotifications from '../Notifications/Notifications';
import EmailPreview, { PREVIEW_ID } from '../Preview/EmailPreview';
import Success from './Success';
import SendButton from './SendButton';
import { AppState } from '../store/reducer';
import { colors } from '../theme';
import { useT } from '../i18n/useT';

const statusCardSx = {
  background: '#fff',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(90,60,30,.07)',
  maxWidth: 560,
  mx: 'auto',
  p: { xs: '40px 20px', md: '56px 40px' },
  textAlign: 'center',
} as const;

type Props = StateProps;

export const App = ({ status }: Props) => {
  const t = useT();
  const editing = !status.sending && !status.sended;
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MerryHeader />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: 1180,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          pt: { xs: 2, md: 3.5 },
          pb: { xs: 3, md: 8 },
        }}
      >
        {editing && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                md: 'minmax(0, 1fr) 400px',
              },
              gap: { xs: 0, md: 4 },
              alignItems: 'start',
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <MerryContacts />
              <MerryEditor />
            </Box>
            <Box
              component="aside"
              sx={{ minWidth: 0, position: { md: 'sticky' }, top: { md: 24 } }}
            >
              <EmailPreview />
              <SendButton
                fullWidth
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mt: 2.5,
                  py: 2,
                  fontSize: 16,
                }}
              />
            </Box>
          </Box>
        )}
        {status.sending && (
          <Box sx={statusCardSx}>
            <CircularProgress color="secondary" size={64} />
            <Box component="p" sx={{ color: colors.muted, mt: 3, mb: 0 }}>
              {t.send.sending}
            </Box>
          </Box>
        )}
        {status.sended && (
          <Box sx={statusCardSx}>
            <Success />
          </Box>
        )}
      </Box>
      {editing && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            gap: 1.25,
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            p: '12px 16px 20px',
            background: 'rgba(255,255,255,.96)',
            borderTop: `1px solid ${colors.line}`,
            boxShadow: '0 -8px 24px rgba(90,60,30,.08)',
          }}
        >
          <Button
            variant="outlined"
            href={`#${PREVIEW_ID}`}
            sx={{ flex: 1, px: 1.5 }}
          >
            👁&nbsp; {t.send.preview}
          </Button>
          <SendButton short sx={{ flex: 1, px: 1.5 }} />
        </Box>
      )}
      <MerryFooter />
      <MerryNotifications />
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  status: state.contacts.status,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(App);
