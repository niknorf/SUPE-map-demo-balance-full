import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
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
      color="primary"
      className={classes.loginButton}
      onClick={() => {
        ButtonLoginClick(history);
      }}
    >
      Войти
    </Button>
  ));

  const ButtonLoginClick = (history) => {
    keycloakAuth({
      username: refUsername.current.value,
      password: refPassword.current.value,
    })
      .then((response) => {
        setSessionCookie(response.data.access_token);
        history.push("/home");
      })
      .catch((error) => {
        //TODO show error message invalid credentialds
        console.error(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8}>
          <Paper className={classes.coverPaper}>
            <Typography className={classes.coverText}>
              Система управления передачей электроэнергии
            </Typography>
            <Box className={classes.imageContainer}>
              <img src={logo} className={classes.logo} alt="" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
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
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  coverText: {
    fontSize: "64px",
    lineHeight: "76.8px",
    width: "500px",
    color: "white",
  },
  loginPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginText: {
    fontSize: "32px",
    lineHeight: "38.4px",
    textAlign: "center",
    marginBottom: "47px",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#4A9CFF",
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    marginTop: "52px",
    boxShadow: "0px 4px 10px rgba(74, 156, 255, 0.33)",
    "&:hover": {
      backgroundColor: "#4A9CFF",
    },
  },
  formInput: {
    width: "100%",
  },
  coverPaper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundImage: `url(${BackgoundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "0",
  },
  imageContainer: {
    width: "500px",
  },
  logo: {
    width: "115px",
    marginTop: "18px",
  },
}));
