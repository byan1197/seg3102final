import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login';
import Home from '../Home';
import Account from '../Account';
import CreateAccount from '../CreateAccount';
import Success from './Success';
import Search from '../Search';
import Properties from '../Properties';
import VisitingList from '../VisitingList'
import CreateProperty from '../CreateProperty';
import OwnerProperties from '../OwnerProperties';
import UpdateProperty from '../UpdateProperty';

const RouteList = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute path="/create_account" component={CreateAccount} />
    <PrivateRoute path="/success" component={Success} />
    <PrivateRoute path="/myAccount" component={Account} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/search" component={Search} />
    <PrivateRoute path="/properties" component={Properties} />
    <PrivateRoute path="/visitingList" component={VisitingList} />
    <PrivateRoute path="/create_property" component={CreateProperty} />
    <PrivateRoute path="/update_property" component={UpdateProperty} />
    <PrivateRoute path="/ownerProperties" component={OwnerProperties} />
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
