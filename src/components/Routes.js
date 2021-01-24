import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BalanceGroup from "./BalanceGroup";
import GuaranteedSuppliers from "./GuaranteedSuppliers";
import BuBd from "./BuBd";
import Tasks from "./Tasks";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute.js";
import { getSessionCookie } from "./cookies";

const AppRouter = () => {
  return (
    <Switch>
      <PrivateRoute path="/home" component={Home}/>
      <PrivateRoute path="/balancegroup" component={BalanceGroup} />
      <PrivateRoute
        path="/guaranteedsuppliers"
        component={GuaranteedSuppliers}
      />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/bubd" component={BuBd} />
      <PrivateRoute path="/tasks" component={Tasks} />
      <FirstPage />
    </Switch>
  );
};

const FirstPage = () => {
  return (
    // <Route
    //   exact
    //   render={(props) =>
    //     Object.entries(getSessionCookie()).length === 0  ? (
    //       <Login/>
    //     ) : (
    //       <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
    //     )
    //   }
    // />
    <Route exact path="/">
      {Object.entries(getSessionCookie()).length > 0 ? (
        <Redirect to="/home" />
      ) : (
        <Login />
      )}
    </Route>
  );
};

export default AppRouter;
