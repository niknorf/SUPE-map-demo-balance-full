import "./styles.css";
import { Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Drawer from "./components/Drawer";
import GlobalStateProvider from "./store/GlobalStateProvider";
import AppRouter from "./components/Routes";
import PFDinRegularWoff from "./fonts/PFDinTextCondPro-Regular.woff";

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
      main: '#4a9cff',
    }
  }
});

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <GlobalStateProvider>
      <div className={classes.container}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Drawer />
          <AppRouter />
        </ThemeProvider>
      </div>
    </GlobalStateProvider>
  );
}
