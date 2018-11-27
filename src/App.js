import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Typography from '@material-ui/core/Typography';

// const Styled = createStyled({
//   navBarTitle: {
//     color: 'white',
//     paddingTop: '0.1em'
//   }
// });
// const primary = amber[50];

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<div Col={3} className="App-header">
          <Typography variant="h2" color="secondary">OPR</Typography>
          <Styled>
            { ({classes}) => <Typography className={classes.navBarTitle} variant="h3">OPR</Typography>}
          </Styled>
        </div>*/}
        <NavBar />
        <div className="Main">
          <Typography variant="h1">Hello</Typography>
        </div>
      </div>
    );
  }
}

export default App;
