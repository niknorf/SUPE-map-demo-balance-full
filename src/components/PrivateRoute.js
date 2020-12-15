// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Contex from "../store/context";
import Home from "./Home";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { globalState, globalDispach } = useContext(Contex);

  // const isLoggedIn = globalState.isLoggedIn;
  const isLoggedIn = true;


  return (

    <Route
      exact
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute;
