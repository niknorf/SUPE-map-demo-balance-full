import "./styles.css";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useState, useEffect } from "react";
import Drawer from "components/Drawer";
import GlobalStateProvider from "store/GlobalStateProvider";
import { SessionContext, getSessionCookie } from "components/cookies.js";
import AppRouter from "components/Routes";
import PFDinRegularWoff from "assets/fonts/PFDinTextCondPro-Regular.woff";

const pfdinRegular = {
  fontFamily: "PFDinTextCondPro-Regular",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
    local('PFDinTextCondPro-Regular'),
    url(${PFDinRegularWoff}) format('woff')
    `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "PFDinTextCondPro-Regular !important",
  },
  typographyStyle: {
    color: "red",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [pfdinRegular],
      },
    },
  },
  palette: {
    primary: {
      main: "#4a9cff",
    },
  },
});

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  const location = useLocation().pathname;
  const [session, setSession] = useState({});

  useEffect(() => {
    setSession(getSessionCookie());
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <GlobalStateProvider>
        <div className={classes.container}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {location !== "/" ? <Drawer /> : null}
            <AppRouter />
          </ThemeProvider>
          </MuiPickersUtilsProvider>
        </div>
      </GlobalStateProvider>
    </SessionContext.Provider>
  );
}
