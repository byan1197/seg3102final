import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink, Redirect } from 'react-router-dom';
import Fetcher from '../helpers/fetcher';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      toHome: false,
      user: localStorage.getItem('type'),
      toAccount: false
    }
  }

  // componentDidMount(){
  //   this.setState({user : localStorage.getItem('type')})
  // }

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    localStorage.clear();
    this.setState({toHome: true})
  }  

  viewAccount = () => {
    this.handleClose();
    this.setState({toAccount: true})
  } 

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const auth = localStorage.getItem('uid') && localStorage.getItem("token")
    const open = Boolean(anchorEl);

    if (this.state.toHome)
      return <Redirect to='/'></Redirect>
    if (this.state.toAccount)
      return this.props.history.push('/account');
    console.log(this.state.user);
    return (
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink to='/'>OPR</NavLink>
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.viewAccount}>My account</MenuItem>
                  {this.state.user== 'AGENT' ? <MenuItem>Create account</MenuItem> : null}
                  <MenuItem style={{color: 'red'}} onClick={()=> this.logout()}>Logout</MenuItem>
                </Menu>
              </div>
            ) : <NavLink to='/login'><Button variant="contained" color='secondary'>Login</Button></NavLink>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
