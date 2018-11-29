import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => (
  <div style={{width: '100%'}}>
    <p>this is the home page</p>
    <Link to='/test'>Go to Test page</Link>
  </div>
)

export default Home;
