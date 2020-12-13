import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./Home.js";
import LoginPage from "./Login.js";
import BalanceGroup from "./BalanceGroup";
import GuaranteedSuppliers from "./GuaranteedSuppliers";
import BuBd from "./BuBd";
import Tasks from "./Tasks";
import Home from "./Home";
import Login from "./Login";
import Profile from "./ProfileNoAuth";
import PrivateRoute from "./PrivateRoute.js";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Login {...props} />} />
      <PrivateRoute path="/home/" component={Home} />
      <PrivateRoute path="/balancegroup" component={BalanceGroup} />
      <PrivateRoute
        path="/guaranteedsuppliers"
        component={GuaranteedSuppliers}
      />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/bubd" component={BuBd} />
      <PrivateRoute path="/tasks" component={Tasks} />
    </Switch>
  );
};

export default AppRouter;
