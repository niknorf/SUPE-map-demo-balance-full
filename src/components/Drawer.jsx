import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import React from "react";
import clsx from "clsx";
import PFDinBoldWoff from "assets/fonts/PFDinTextCondPro-Bold.woff";
import { removeSessionCookie } from "components/cookies.js";
import logo from "assets/img/logo.png";

const pfdinBold = {
  fontFamily: "PFDinTextCondPro-Bold",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
    local('PFDinTextCondPro-Bold'),
    url(${PFDinBoldWoff}) format('woff')
    `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "PFDinTextCondPro-Bold !important",
    fontSize: 11,
    textTransform: "uppercase",
  },
  typographyStyle: {
    color: "red",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [pfdinBold],
      },
    },
  },
});

const useStyles = makeStyles({
  drawer: {
    width: "68px",
  },
  drawerPaper: {
    color: "#252F4A",
  },
  drawerList: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    color: "#FFF",
  },
  listIcon: {
    color: "#FFF",
    justifyContent: "center",
  },
  exit: {
    marginTop: "auto",
  },
  logo: {
    width: "37px",
    paddingTop: "10px",
    paddingBottom: "15px",
  },
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();

  const handleExitButtonClick = (event) => {
    removeSessionCookie(history);
  };

  const itemsList = [
    {
      icon: <img src={logo} className={classes.logo} alt="" />,
      onClick: () => history.push("/home"),
    },
    {
      text: "КАБИНЕТ",
      icon: (
        <PermIdentityIcon
          className={classes.icon}
          style={{ fontSize: "25px" }}
        />
      ),
      onClick: () => history.push("/profile"),
    },
  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <List className={classes.drawerList}>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem
                button
                key={index}
                onClick={onClick}
                className={classes.listItemContainer}
              >
                {icon && (
                  <ListItemIcon className={classes.listIcon}>
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
          <ListItem
            button
            className={clsx(classes.listItemContainer, classes.exit)}
            onClick={handleExitButtonClick}
          >
            <ListItemIcon className={classes.listIcon}>
              <ExitToAppIcon style={{ fontSize: "25px" }} />
            </ListItemIcon>
            <ListItemText primary="ВЫХОД" />
          </ListItem>
        </List>
      </ThemeProvider>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
