import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography'
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import Routes from './components/Routes';
import { timingSafeEqual } from 'crypto';

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
      <div>
        <BrowserRouter>
          <div>
            <NavBar {...navBarProps} />
            <Routes />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
