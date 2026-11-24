import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import fontColorContrast from 'font-color-contrast';
import { Dispatch } from 'redux';
import { getForbiddenById, toggleForbidden } from '../store';
import { AppState } from '../store/reducer';

type Props = StateProps & DispatchProps;

const ContactForbidden = ({ forbidden, onToggle, onlyOne }: Props) => (
  <Box component="section" sx={{ m: 1 }}>
    <p>Toggle name to disable ability to be drawn</p>
    <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {forbidden.map((item) => (
        <Button
          key={item.id}
          sx={{ margin: '0.2em' }}
          disabled={onlyOne && !item.isForbidden}
          onClick={onToggle(item.id)}
          style={
            item.isForbidden
              ? {
                  color: 'grey',
                }
              : {
                  background: item.color,
                  color: fontColorContrast(item.color),
                  opacity: 0.5,
                }
          }
        >
          {item.name}
        </Button>
      ))}
    </Box>
  </Box>
);

type OwnProps = {
  contactId: number;
};

const mapStateToProps = (state: AppState, { contactId }: OwnProps) => {
  const forbidden = getForbiddenById(state, contactId);
  return {
    forbidden,
    onlyOne: forbidden.filter((f) => !f.isForbidden).length === 1,
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, { contactId }: OwnProps) => ({
  onToggle(forbiddenId: number) {
    return () => dispatch(toggleForbidden(contactId, forbiddenId));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactForbidden);
