import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    header: {
      textAlign: 'center',
      margin: '2em 0',
    },
    headerIcon: {
      verticalAlign: 'middle',
      height: 'auto',
      width: '3rem',
      padding: '0.2em',
    },
    headerTitle: {
      fontSize: '3rem',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLinetag: {
      fontWeight: 700,
      margin: '.5em 0',
      '&:after': {
        background: 'white',
        content: '',
        display: 'block',
        height: '2px',
        margin: '1.5em auto 0',
        position: 'relative',
        width: '50%',
      },
    },
  });

type Props = WithStyles<typeof styles>;

const Header = ({ classes }: Props) => (
  <header className={classes.header}>
    <h1 className={classes.headerTitle}>
      <svg
        className={classes.headerIcon}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
      >
        <path d="M5.203 3.758q-0.469 0.719-1.070 2.133-0.172-0.352-0.289-0.566t-0.316-0.496-0.398-0.441-0.492-0.273-0.637-0.113h-1.75q-0.109 0-0.18-0.070t-0.070-0.18v-1.5q0-0.109 0.070-0.18t0.18-0.070h1.75q1.953 0 3.203 1.758zM14 10q0 0.109-0.070 0.18l-2.5 2.5q-0.070 0.070-0.18 0.070-0.102 0-0.176-0.074t-0.074-0.176v-1.5q-0.25 0-0.664 0.004t-0.633 0.008-0.57-0.008-0.555-0.039-0.5-0.082-0.492-0.145-0.453-0.223-0.461-0.312-0.43-0.418-0.438-0.543q0.461-0.727 1.062-2.133 0.172 0.352 0.289 0.566t0.316 0.496 0.398 0.441 0.492 0.273 0.637 0.113h2v-1.5q0-0.109 0.070-0.18t0.18-0.070q0.094 0 0.187 0.078l2.492 2.492q0.070 0.070 0.070 0.18zM14 3q0 0.109-0.070 0.18l-2.5 2.5q-0.070 0.070-0.18 0.070-0.102 0-0.176-0.074t-0.074-0.176v-1.5h-2q-0.375 0-0.68 0.117t-0.539 0.352-0.398 0.48-0.352 0.605q-0.25 0.484-0.609 1.336-0.227 0.516-0.387 0.867t-0.422 0.82-0.5 0.781-0.578 0.648-0.703 0.535-0.832 0.328-1 0.129h-1.75q-0.109 0-0.18-0.070t-0.070-0.18v-1.5q0-0.109 0.070-0.18t0.18-0.070h1.75q0.375 0 0.68-0.117t0.539-0.352 0.398-0.48 0.352-0.605q0.25-0.484 0.609-1.336 0.227-0.516 0.387-0.867t0.422-0.82 0.5-0.781 0.578-0.648 0.703-0.535 0.832-0.328 1-0.129h2v-1.5q0-0.109 0.070-0.18t0.18-0.070q0.094 0 0.187 0.078l2.492 2.492q0.070 0.070 0.070 0.18z" />
      </svg>
      <span>Merry Crosstmas</span>
    </h1>
    <p className={classes.headerLinetag}>
      Receive an email to organize a Secret Santa with your friends
    </p>
  </header>
);

export default withStyles(styles)(Header);
