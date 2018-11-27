import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';

function Routes() {
    return (
        <Route path="/login" component={ Login } />
    )
}

export default Routes;