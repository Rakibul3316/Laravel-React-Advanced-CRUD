import React from 'react'
import { Redirect, Route } from 'react-router';

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} exact={true} />
                : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;