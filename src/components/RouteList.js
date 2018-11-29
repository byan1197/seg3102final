import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from '../views/Home';
import Search from '../views/Search'

const RouteList = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/login" component={ Login } />
    <Route path="/s" component={ Search } />
  </Switch>
)

export default RouteList;
