import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import RouteList from './components/RouteList';

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false
    }
  }

  render() {
    let navBarProps = {
    }
    return (
      <Router>
            <div className='App'>
              <NavBar {...navBarProps} />
              <div className="App-Content">
                <RouteList />
              </div>
            </div>
      </Router>
    );
  }
}

export default App;
