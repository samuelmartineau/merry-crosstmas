import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import fontColorContrast from 'font-color-contrast';
import Button from '@material-ui/core/Button';
import { getForbiddenById, toggleForbidden } from '../store';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(),
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: '0.2em',
    },
  });

const ContactForbidden = ({
  forbidden,
  classes,
  onToggle,
  onlyOne,
}: WithStyles<typeof styles>) => (
  <section className={classes.root}>
    <p>Toggle name to disable ability to be drawn</p>
    <article className={classes.chips}>
      {forbidden.map(item => (
        <Button
          key={item.id}
          className={classes.chip}
          disabled={onlyOne && !item.isForbidden}
          raised={!item.isForbidden}
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
        >
          {item.name}
        </Button>
      ))}
    </article>
  </section>
);

export default compose(
  connect(
    (
      state,
      {
        contactId,
      }: {
        contactId: number;
      },
    ) => ({
      forbidden: getForbiddenById(state, contactId),
      onlyOne:
        getForbiddenById(state, contactId).filter(f => !f.isForbidden)
          .length === 1,
    }),
    (dispatch, { contactId }) => ({
      onToggle(forbiddenId) {
        return () => dispatch(toggleForbidden(contactId, forbiddenId));
      },
    }),
  ),
  withStyles(styles),
)(ContactForbidden);
