import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/'
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InsertDriveFileicon from '@material-ui/icons/InsertDriveFile';

class OwnerContent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <List>
        <NavLink to='/create_property' style={{textDecoration: "none"}}>
          <ListItem button onClick={this.props.toggleDrawer}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add A Property" />
          </ListItem>
        </NavLink>
        <NavLink to='/ownerProperties' style={{textDecoration: "none"}}>
          <ListItem button onClick={this.props.toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="My Owned Listed Properties" />
          </ListItem>
        </NavLink>
      </List>
    )
  }
}

class CustomerContent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <List>
        <NavLink to="/search" style={{textDecoration: "none"}}>
          <ListItem button onClick={this.props.toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search For Properties" />
          </ListItem>
        </NavLink>
        <NavLink to="/visitingList" style={{textDecoration: "none"}}>
          <ListItem button onClick={this.props.toggleDrawer}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="My Visiting List" />
          </ListItem>
        </NavLink>
      </List>
    )
  }
}

class AgentContent extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <List>
        <NavLink to='/create_account' style={{textDecoration: "none"}}>
          <ListItem button onClick={this.props.toggleDrawer}>
            <ListItemIcon>
              <InsertDriveFileicon />
            </ListItemIcon>
            <ListItemText primary="Create Account" />
          </ListItem>
        </NavLink>
      </List>
    )
  }
}

// module.export = OwnerContent, CustomerContent, AgentContent;
export { AgentContent, OwnerContent, CustomerContent };
