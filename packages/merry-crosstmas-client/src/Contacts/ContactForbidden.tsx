import React from 'react';
import { connect } from 'react-redux';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import fontColorContrast from 'font-color-contrast';
import Button from '@material-ui/core/Button';
import { getForbiddenById, toggleForbidden } from '../store';
import { Dispatch } from 'redux';
import { AppState } from '../store/reducer';

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

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

const ContactForbidden = ({ forbidden, classes, onToggle, onlyOne }: Props) => (
  <section className={classes.root}>
    <p>Toggle name to disable ability to be drawn</p>
    <article className={classes.chips}>
      {forbidden.map(item => (
        <Button
          key={item.id}
          className={classes.chip}
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

const mapStateToProps = (
  state: AppState,
  {
    contactId,
  }: {
    contactId: number;
  },
) => ({
  forbidden: getForbiddenById(state, contactId),
  onlyOne:
    getForbiddenById(state, contactId).filter(f => !f.isForbidden).length === 1,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (
  dispatch: Dispatch,
  {
    contactId,
  }: {
    contactId: number;
  },
) => ({
  onToggle(forbiddenId: number) {
    return () => dispatch(toggleForbidden(contactId, forbiddenId));
  },
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ContactForbidden));
