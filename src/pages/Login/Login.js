import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import BackgoundImage from "pages/Login/img/login-map.png";
import logo from "pages/Login/img/login-logo.png";
import Contex from "store/context";
import { keycloakAuth } from "components/keycloak.js";
import { setSessionCookie } from "components/cookies";

export default function CenteredGrid() {
  const refUsername = useRef("");
  const refPassword = useRef("");
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = useStyles();
  const { globalState, globalDispach } = useContext(Contex);

  const ButtonLogin = withRouter(({ history }) => (
    <Button
      variant="contained"
      // color="primary"
      className={classes.loginButton}
      onClick={() => {
        ButtonLoginClick(history);
      }}
    >
      Войти
    </Button>
  ));

  const ButtonLoginClick = history => {
    keycloakAuth({
      username: refUsername.current.value,
      password: refPassword.current.value
    })
      .then(response => {
        setSessionCookie(response.data.access_token);
        history.push("/home");
      })
      .catch(error => {
        //TODO show error message invalid credentialds
        console.error(error);
      });
  };

  return (
    // <div className={classes.root}>
    <Grid container>
      <Grid item lg={5} md={6} sm={6} xl={5} xs={6} spacing={3}>
        <Paper className={classes.coverPaper}>
          <div className={classes.btnTextContainer}>
            <Typography className={classes.coverText}>
              Система управления
            </Typography>
            <Typography className={classes.coverText}>
              передачей
            </Typography>
            <Typography className={classes.coverText}>
              электроэнергии
            </Typography>
          </div>
          <Box className={classes.imageContainer}>
            <img src={logo} className={classes.logo} alt="" />
          </Box>
        </Paper>
      </Grid>
      <Grid item lg={7} md={6} sm={6} xl={7} xs={6} spacing={3}>
        <Paper className={classes.loginPaper}>
          <Box className={classes.loginBox}>
            <Typography className={classes.loginText}>
              Войти в систему
            </Typography>
            <form className={classes.loginForm} noValidate autoComplete="off">
              <TextField
                className={classes.formInput}
                id="standard-basic"
                label="Логин"
                inputRef={refUsername}
              />
              <TextField
                className={classes.formInput}
                id="standard-password-input"
                type="password"
                label="Пароль"
                inputRef={refPassword}
              />
            </form>
            <ButtonLogin />
          </Box>
        </Paper>
      </Grid>
    </Grid>
    // </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  btnTextContainer: {
    position: "absolute",
    left: "40px",
    top: "40px",
    textAlign: "initial"
    // width: "500px",
  },
  coverText: {
    fontSize: "38px",
    lineHeight: "48px",
    letterSpacing: "0.01em",
    color: "white"
  },
  loginPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  loginBox: {
margin: '15px'
  },
  loginText: {
    fontSize: "32px",
    lineHeight: "38.4px",
    textAlign: "center",
    marginBottom: "47px",
    color: "#252F4A"
  },
  loginButton: {
    width: "100%",
    background: 'linear-gradient(127.52deg, #4764B0 20.68%, #252F4A 80.9%)',
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    marginTop: "52px",
    boxShadow: "0px 4px 10px rgba(74, 156, 255, 0.33)",
    "&:hover": {
      backgroundColor: "#4A9CFF"
    }
  },
  formInput: {
    width: "100%"
  },
  coverPaper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundImage: `url(${BackgoundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "0"
  },
  imageContainer: {
    position: "absolute",
    left: "40px",
    top: "240px"
  },
  logo: {
    width: "115px",
    // marginTop: "18px"
  }
}));
