import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from '../views/Home';
import Account from './Account';
import CreateAccount from './CreateAccount';
import Success from './Success';
const RouteList = () => (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/login" component={ Login } />
    <Route path="/account" component={ Account } />
    <Route path="/create_account" component = { CreateAccount} />
    <Route path="/success" component = { Success} />
  </Switch>
)

export default RouteList;
