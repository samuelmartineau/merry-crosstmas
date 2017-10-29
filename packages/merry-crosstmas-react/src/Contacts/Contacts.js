// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ContactCard from 'Contacts/ContactCard';

type Props = {
  contacts: Array<number>,
};

const styles = {
  root: {
    flexDirection: 'column',
  },
};

const Contacts = ({ contacts, classes }: Props) => (
  <form>
    <Grid container className={classes.root}>
      {contacts.map(contact => <ContactCard contactId={contact} key={contact} />)}
    </Grid>
  </form>
);

export default compose(
  connect(state => ({
    contacts: state.contacts.all,
  })),
  withStyles(styles),
)(Contacts);
