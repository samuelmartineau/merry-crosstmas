import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { Dispatch } from 'redux';
import { addContact } from '../store';
import { AppState } from '../store/reducer';

type Props = StateProps & DispatchProps;

const ContactActions = ({ onAdd, canAddContact }: Props) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <Button
      color="primary"
      aria-label="add"
      sx={{ m: 1 }}
      onClick={onAdd}
      disabled={!canAddContact}
    >
      <AddIcon />
    </Button>
    <Button color="secondary" aria-label="edit" type="submit" sx={{ m: 1 }}>
      <SendIcon />
    </Button>
  </Box>
);

const mapStateToProps = (state: AppState) => ({
  canAddContact: state.contacts.all.length < 20,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAdd() {
    dispatch(addContact());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactActions);
