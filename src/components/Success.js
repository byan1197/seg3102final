import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// import Fetcher from '../helpers/fetcher';
import { Done } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
const styles = theme => ({
  main: {
    height: '100vh',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Success extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      success: null,
      toHome: false
    }
  }





  render() {

    const { classes } = this.props;
    var redirectToHome = this.state.toHome;

    if (redirectToHome)
      return <Redirect to='/'></Redirect>

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Done />
          </Avatar>
          <Typography component="h1" variant="h5">
            Success
          </Typography>



        </Paper>
      </main>

    )

  }
}

Success.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Success);
