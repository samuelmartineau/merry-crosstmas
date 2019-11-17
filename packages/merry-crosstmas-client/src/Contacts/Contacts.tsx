import React from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { toggleSettings, send } from '../store';
import ContactCard from '../Contacts/ContactCard';
import ContactActions from '../Contacts/ContactActions';
import { WithStyles } from '@material-ui/styles';
import { AppState } from '../store/reducer';
import { ThunkDispatch } from 'redux-thunk';

const styles = () =>
  createStyles({
    root: {
      flexDirection: 'column',
    },
    switchRoot: {
      margin: 0,
    },
    form: {
      overflow: 'hidden',
    },
  });

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

const Contacts = ({
  contacts,
  classes,
  swithMode,
  customMode,
  onSend,
}: Props) => {

  return (
    <form
      className={classes.form}
      onSubmit={onSend}
      autoComplete="off"
      role="presentation"
    >
      <FormControlLabel
        className={classes.switchRoot}
        control={<Switch checked={customMode} onChange={swithMode} />}
        label="Custom Mode (ie: exclusions)"
      />
      <div className={classes.root}>
        {contacts.map((contact) => (
          <ContactCard
            isRemovable={contacts.length > 3}
            contactId={contact}
            key={contact}
          />
        ))}
      </div>
      <ContactActions />
    </form>
  )
};

const mapStateToProps = (state: AppState) => ({
  customMode: state.contacts.customMode,
  contacts: state.contacts.all,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  swithMode() {
    dispatch(toggleSettings());
  },
  onSend(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(send());
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Contacts));
