import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InsertDriveFileicon from '@material-ui/icons/InsertDriveFile';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import RouteList from './components/RouteList';

const drawerContents = redirFn => {
  return {
    OWNER: (
      <List>
        <ListItem button onClick={() => redirFn('/create_property')}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add A Property" />
        </ListItem>
        <ListItem button onClick={() => redirFn('/proplist')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Your Listed Properties" />
        </ListItem>
      </List>
    ),
    CUSTOMER: (
      <List>
        <ListItem button onClick={() => redirFn('/search')}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search For Properties" />
        </ListItem>
        <ListItem button onClick={() => redirFn('/visitinglist')}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Visiting List" />
        </ListItem>
      </List>
    ),
    AGENT: (
      <List>
        <ListItem button onClick={() => redirFn('/create_account')}>
          <ListItemIcon>
            <InsertDriveFileicon />
          </ListItemIcon>
          <ListItemText primary="Create Account" />
        </ListItem>
      </List>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      isNavbar: false,
      drawerOpen: false,
    }
  }

  drawerClose = () => {
    this.setState({
      drawerOpen: false
    })
  }

  drawerOpen = () => {
    this.setState({
      drawerOpen: true
    })
  }

  drawerLinking = link => {
    window.location.href = link
  }



  render() {
    let navBarProps = {
      openDrawer: this.drawerOpen
    }

    return (
      <div>

        <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.drawerClose}>
          {drawerContents(this.drawerLinking)[localStorage.getItem('type')]}
        </Drawer>

        <Router>
          {}
          {localStorage.getItem('token') ?
            (
              <div className='App'>
                <NavBar {...navBarProps} />
                <div className="App-Content">
                  <RouteList />
                </div>
              </div>
            ) :
            (
              <div className='App'>
                <NavBar />
                <div className="App-Content">
                  <RouteList />
                </div>
              </div>
            )
          }
        </Router>

      </div>
    );
  }
}

export default App;
