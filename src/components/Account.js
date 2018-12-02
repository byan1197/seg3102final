import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fetcher from '../helpers/fetcher';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
    width: '100vw',
    height: 'calc(100%-4em)',
    paddingTop: '4em',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  innerContainer: {
    width: '60vw',
    height: 'inherit',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
class SimpleExpansionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      username: null,
      email: null,
      type: null,
      maxRent: null
    }
  }

  componentDidMount() {
    Fetcher.getUser()
      .then(res => {
        var newState = {
          name: res.name,
          username: res.username,
          type: res.type,
          maxRent: res.maxRent,
          email: res.email,
          emailTerm: null,
          passwordTerm: null,
          error: null,
          successMsg: null,
        };


        this.setState(newState)
      })

  }

  deleteAccount = () => {
    console.log("ello");
    Fetcher.deleteAccount()
      .then(() => {
        localStorage.clear();
        this.props.history.push("/login");
      })
  }

  handleUpdate = (e) => {

    if (!e.target.email.value.includes('@')) {
      this.setState({ error: "invalid email" });
    } else {
      console.log('about to make the call')
      Fetcher.updateAccount({
        email: e.target.email.value,
        password: e.target.password.value,
        ogpassword: e.target.ogpassword.value
      }).then(res => {
        if (res.email) {
          console.log("herr");
          var newState = {
            successMsg: 'Account Information Updated',
            email: res.email,
            error: null
          }
          this.setState(newState)
        } else {
          this.setState({ error: "Incorrect Password" })
        }

      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.innerContainer}>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Account Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={16}>
                <Grid item md={4}>
                  <Typography>
                    Username: {this.state.username}
                  </Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography>
                    Name: {this.state.name}
                  </Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography>
                    Email: {this.state.email}
                  </Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography>
                    Type: {this.state.type}
                  </Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography>
                    Max Rent: ${this.state.maxRent}
                  </Typography>
                </Grid>


              </Grid>

            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Update Account</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ justifyContent: 'center', alignItems: 'center' }}>

              <form className={classes.form} onSubmit={e => { e.preventDefault(); this.handleUpdate(e) }}>
                <FormControl margin="normal" required fullWidth>
                  <Typography style={this.state.error ? { color: 'red' } : { color: 'green' }}>
                    {
                      this.state.error ?
                        this.state.error :
                        this.state.successMsg
                    }
                  </Typography>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" name="email" autoFocus placeholder={this.state.email} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Original Password</InputLabel>
                  <Input name="ogpassword" type="password" id="ogpassword" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <Input name="password" type="password" id="password" />
                </FormControl>
                <Button
                  style={{ marginBottom: '20px' }}
                  type="submit"
                  fullWidth
                  margin='normal'
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  submit
            </Button>

              </form>

            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Delete Account</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography className={classes.heading} color="secondary" >WARNING: Deleted accounts cannot be recovered</Typography>

              <Button
                type="submit"
                fullWidth
                margin='normal'
                color='secondary'
                variant="contained"
                className={classes.submit}
                onClick={this.deleteAccount}
              >
                Delete
            </Button>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );

  }
}
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(SimpleExpansionPanel);
