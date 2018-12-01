import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from '../views/Home';
import Account from './Account';
import CreateAccount from './CreateAccount';
import Success from './Success';
import Test from '../views/Test'
import Search from '../views/Search';
import Properties from '../views/Properties';
import VisitingList from '../views/VisitingList'
import CreateProperty from '../views/CreateProperty';
import OwnerProperties from '../views/OwnerProperties';

const RouteList = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/test" component={Test} />
    <PrivateRoute path="/create_account" component={CreateAccount} />
    <PrivateRoute path="/success" component={Success} />
    <PrivateRoute path="/me" component={Account} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/search" component={Search} />
    <PrivateRoute path="/properties" component={Properties} />
    <PrivateRoute path="/visitinglist" component={VisitingList} />
    <PrivateRoute path="/create_property" component={CreateProperty} />
    <PrivateRoute path="/ownerprops" component={OwnerProperties} />
  </Switch>
)

const isAuthenticated = () => (
  localStorage.getItem('token')
);

const PrivateRoute = ({ component: Component, path, otherProps }) => (
  <Route
    {...{ path }}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} {...otherProps} />
      ) : (
          <Redirect
            push to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      )
    }
  />
);

export default RouteList;
