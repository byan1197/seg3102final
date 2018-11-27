import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import {styled} from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    );
  }
}

export default App;
