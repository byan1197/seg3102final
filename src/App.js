import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/functional/NavBar'
import RouteList from './components/functional/RouteList';

class App extends Component {
  constructor() {
    super()
    this.state = {
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
