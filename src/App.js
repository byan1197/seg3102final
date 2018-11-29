import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import RouteList from './components/RouteList';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      isNavbar: false
    }
  }

  render() {
    let navBarProps = {
    }
    return (
      <Router>
        {localStorage.getItem('token') ?
          (
            <div className='App'>
              <NavBar />
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
    );
  }
}

export default App;
