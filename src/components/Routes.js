import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BalanceGroup from "pages/BalanceGroup/BalanceGroup.js";
import GuaranteedSuppliers from "pages/GuaranteedSuppliers/GuaranteedSuppliers.js";
import BuBd from "pages/BuBd/BuBd.js";
import Tasks from "pages/Tasks/Tasks.js";
import Home from "pages/Home/Home.js";
import Login from "pages/Login/Login.js";
import Profile from "pages/Profile/Profile.js";
import PrivateRoute from "components/PrivateRoute.js";
import { getSessionCookie } from "components/cookies.js";

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
