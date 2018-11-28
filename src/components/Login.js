import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fetcher from '../helpers/fetcher';
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

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      success: null,
      toHome: false
    }
  }



  handleLogin = (e) => {

    Fetcher.postLogin({
      username: e.target.username.value,
      password: e.target.password.value
    }).then(res => {
      var newState = {
        errorMessage: res.message || null,
        success: res.success || null,
      };

      if (res.success)
        newState['toHome'] = true;
      this.setState(newState)
    })

  }

  render() {

    const { classes } = this.props;
    var error = this.state.errorMessage;
    var successMsg = this.state.success;
    var redirectToHome = this.state.toHome;

    if (redirectToHome)
      return <Redirect to='/'></Redirect>

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Typography component="p" variant="b" style={error ? { color: 'red' } : { color: 'green' }}>
            {
              error ?
                error :
                successMsg
            }
          </Typography>

          <form className={classes.form} onSubmit={e => { e.preventDefault(); this.handleLogin(e) }}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              LOGIN
            </Button>
          </form>
        </Paper>
      </main>

    )

  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
