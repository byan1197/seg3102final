import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from '../views/Home';
import Test from '../views/Test'

const RouteList = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/test" component={Test} />
    <Route path="/login" component={Login} />
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
