// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { getSessionCookie } from "components/cookies";

const PrivateRoute = ({ component: Component, ...rest }) => {


  return (

    <Route
      exact
      {...rest}
      render={props =>
        Object.entries(getSessionCookie()).length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute;
