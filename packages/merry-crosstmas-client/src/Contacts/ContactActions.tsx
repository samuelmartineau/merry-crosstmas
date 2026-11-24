import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Dispatch } from 'redux';
import { addContact } from '../store';
import { AppState } from '../store/reducer';
import { colors } from '../theme';
import { useT } from '../i18n/useT';

export const MAX_CONTACTS = 20;

type Props = StateProps & DispatchProps;

const ContactActions = ({ onAdd, canAddContact, count }: Props) => {
  const t = useT();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAdd}
        disabled={!canAddContact}
        sx={{ py: 1.1, px: 2.25, fontSize: 14 }}
      >
        {t.contacts.add}
      </Button>
      <Box component="span" sx={{ fontSize: 13, color: colors.muted }}>
        {t.contacts.count(count, MAX_CONTACTS)}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: AppState) => ({
  count: state.contacts.all.length,
  canAddContact: state.contacts.all.length < MAX_CONTACTS,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAdd() {
    dispatch(addContact());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactActions);
