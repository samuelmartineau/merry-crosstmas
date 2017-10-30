// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { getForbiddenById, toggleForbidden } from 'store';
import fontColorContrast from 'font-color-contrast';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    '&:after': {
      content: ' ',
      display: 'table',
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '0.2em',
  },
});

const ContactForbidden = ({ forbidden, classes, onToggle }) => (
  <section className={classes.root}>
    <p>Toggle name to disable ability to be drawn</p>
    <article className={classes.chips}>
      {forbidden.map(item => (
        <Chip
          key={item.id}
          className={classes.chip}
          label={item.name}
          onClick={onToggle(item.id)}
          style={
            item.isForbidden
              ? {
                  color: 'grey',
                }
              : {
                  background: item.color,
                  color: fontColorContrast(item.color),
                  opacity: item.isForbidden ? 1 : 0.5,
                }
          }
        />
      ))}
    </article>
  </section>
);

type Props = {
  contactId: number,
};

export default compose(
  connect(
    (state, { contactId }: Props) => ({
      forbidden: getForbiddenById(state, contactId),
    }),
    (dispatch, { contactId }) => ({
      onToggle(forbiddenId) {
        return () => dispatch(toggleForbidden(contactId, forbiddenId));
      },
    }),
  ),
  withStyles(styles),
)(ContactForbidden);
