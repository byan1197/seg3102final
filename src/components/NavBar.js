import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 5
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

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
  }

  // componentDidMount(){
  //   this.setState({user : localStorage.getItem('type')})
  // }


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    localStorage.clear();
    this.props.history.push("/login");
  }


  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const auth = localStorage.getItem('uid') && localStorage.getItem("token")
    const open = Boolean(anchorEl);


   
    if (this.state.toAccount)
      return <Redirect push to='/me'></Redirect>

    return (
      
      <div className={classes.root}>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            {auth ?
              (<IconButton onClick={this.props.openDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
               </IconButton>) :
               <div/>
            }
            <Typography variant="h5" color="default" className={classes.grow}>
              <NavLink style={{textDecoration: 'none', color: 'white', fontWeight: '100'}} to='/'>
                OPR System
              </NavLink>
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
                  <MenuItem style={{color: 'red'}} onClick={()=> this.logout()}>Logout</MenuItem>
                </Menu>
              </div>
            ) : <div/>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MenuAppBar));
