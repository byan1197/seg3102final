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
import { AgentContent, CustomerContent, OwnerContent } from './DrawerContent'
import { Drawer } from '@material-ui/core/'

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
      toAccount: false,
      isDrawerOpen: false
    }

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
    this.viewAccount = this.viewAccount.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  // componentDidMount(){
  //   this.setState({user : localStorage.getItem('type')})
  // }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose(){
    this.setState({ anchorEl: null });
  }
  logout(){
    this.handleClose();
    localStorage.clear();
    this.props.history.push("/login");
  }
  viewAccount(){
    this.handleClose();
    this.props.history.push("/myAccount");
  }
  toggleDrawer(){
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const auth = localStorage.getItem('uid') && localStorage.getItem("token")
    const open = Boolean(anchorEl);

    if (this.state.toAccount)
      return <Redirect push to='/myAccount'/>

    return (
      <div className={classes.root}>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            {auth ?
              (<IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
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
                  <MenuItem onClick={this.viewAccount}>My account</MenuItem>
                  <MenuItem style={{color: 'red'}} onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : <div/>}
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={this.state.isDrawerOpen} onClose={this.toggleDrawer}>
          <h1 style={{fontWeight: '100', marginLeft: '0.8em', width: 'fit-content'}}>
            Manage
          </h1>
          {
            localStorage.getItem('type') === 'CUSTOMER' ? <CustomerContent toggleDrawer={this.toggleDrawer} /> :
            localStorage.getItem('type') === 'OWNER' ? <OwnerContent toggleDrawer={this.toggleDrawer} /> :
            <AgentContent toggleDrawer={this.toggleDrawer} />
          }
        </Drawer>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
// DrawerContent(this.drawerLinking)[localStorage.getItem('type')]
export default withStyles(styles)(withRouter(MenuAppBar));
