import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fetcher from '../helpers/fetcher';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginBottom: '-0.5em'
  },

  main: {
    height: '100%',
    width: 'auto',
    overflowY: 'hidden',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
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
  submit: {
      textTransform: 'none',
      fontSize: '1em',
      marginLeft: '1em',
      width: '45%'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  gridItem: {
  },
  gridContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const types = [
  {
    value: 'OWNER',
    label: 'Owner'
  },
  {
    value: 'CUSTOMER',
    label: 'Customer'
  }
];

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      success: null,
      toHome: false,
      type: 'CUSTOMER',

    }

    this.onCancel = this.onCancel.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAccountCreation = (e) => {
    const rent = this.state.type === 'CUSTOMER' ? e.target.rent.value : -1;
    let error = "";

    if (e.target.confirmPassword.value !== e.target.password.value)
      error = error +  " Passwords are not equal."
    if (!(e.target.email.value.includes('@')))
      error = error + " Email is not in the correct form"
    if (error !== "")
      this.setState({errorMessage : error})
    else{
      Fetcher.createAccount({
        username: e.target.username.value,
        password: e.target.password.value,
        maxRent : rent,
        name: e.target.name.value,
        lastName : e.target.lastName.value,
        email : e.target.email.value,
        type: this.state.type
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
  }

  onCancel(){
    this.props.history.goBack();
  }

  render() {
    const { classes } = this.props;
    var error = this.state.error;
    var successMsg = this.state.success;
    var redirectToHome = this.state.toHome;

    if (redirectToHome)
      return <Redirect push to={{
        pathname: '/Success',
        state: { successMsg: "Account has been Created!" }
      }} />

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Typography component="p" variant="b" style={error ? { color: 'red' } : { color: 'green' }}>
            {
              error ?
                error :
                successMsg
            }
          </Typography>

          <form className={classes.form} onSubmit={e => { e.preventDefault(); this.handleAccountCreation(e) }}>
            <Grid container spacing={16} className={classes.gridContainer}>
              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input id="username" name="username" autoFocus />
                </FormControl>
              </Grid>
              <Grid item md={6} className={classes.gridItem}>
                <TextField
                  id="account-type"
                  select
                  fullWidth
                  className={classes.textField}
                  value={this.state.type}
                  onChange={this.handleChange('type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {types.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Given Name</InputLabel>
                <Input id="name" name="givenName" autoFocus />
              </FormControl>
              </Grid>

              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Last Name</InputLabel>
                <Input id="lastName" name="lastName" autoFocus />
              </FormControl>
              </Grid>

              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Email Address</InputLabel>
                <Input id="email" name="email" autoFocus />
              </FormControl>
              </Grid>

              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
              </Grid>

              <Grid item md={6} className={classes.gridItem}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <Input name="confirmPassword" type="password" id="confirmPassword" />
                </FormControl>
              </Grid>
              {
                this.state.type === "CUSTOMER" ?
                <Grid item md={6} className={classes.gridItem}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Rent</InputLabel>
                    <Input id="rent" name="rent" autoFocus />
                  </FormControl>
                </Grid> : null
              }
              <Grid style={{ marginTop: '1em' }} item md={8}>
                <Button
                    type="button"
                    onClick={this.onCancel}
                    margin='normal'
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                >
                    Cancel
                </Button>
                <Button
                  type="submit"
                  margin='normal'
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    )
  }
}

CreateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAccount);
