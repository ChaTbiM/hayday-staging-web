import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getStoredUser } from '../core/auth/auth.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        try {
            const currentUser = getStoredUser();
            if (!currentUser) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        } catch (error) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }


        return <Component {...props} />
    }} />
)