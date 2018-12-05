import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import Fetcher from '../helpers/fetcher';
import { Done } from '@material-ui/icons';

const styles = theme => ({
  main: {
    height: '100%',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 17,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: 'green',
    marginBottom: '1em'
    // theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Success = props => {

  setTimeout(() => {
    props.history.push('/');
  }, 1500);

  const { classes } = props;

  return (
    <div style={{ overflowY: 'hidden', width: '100%' }}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Done color='green' />
          </Avatar>
          <Typography style={{ marginBottom: '0.5em' }} component="h1" variant="h5">
            Success!
          </Typography>
          <Typography style={{ fontWeight: '100' }} component="h3" variant="h8" >
            {props.location.state.successMsg}
          </Typography>
        </Paper>
      </main>
    </div>
  )
}

Success.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Success);
