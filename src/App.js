import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography'
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar'
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
