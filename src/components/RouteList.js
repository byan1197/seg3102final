import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from '../views/Home';

const RouteList = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/login" component={ Login } />
  </Switch>
)

export default RouteList;
