import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import BackgoundImage from '../img/login-map.png'
import logo from '../img/login-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  coverText: {
    fontSize: '64px',
    lineHeight: '76.8px',
    width: '500px',
    color: 'white'
  },
  loginPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  loginText: {
    fontSize: '32px',
    lineHeight: '38.4px',
    textAlign: 'center',
    marginBottom: '47px'
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#4A9CFF',
    textTransform: 'none',
    fontWeight: 'bold',
    marginTop: '52px',
    boxShadow: '0px 4px 10px rgba(74, 156, 255, 0.33)',
    '&:hover': {
      backgroundColor: '#4A9CFF',
    },
  },
  formInput: {
    width: '100%'
  },
  coverPaper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${BackgoundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '0'
  },
  imageContainer: {
    width: '500px'
  },
  logo: {
    width: '115px',
    marginTop: '18px'
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const ButtonLogin = withRouter(({ history }) => (
    <Button
      variant="contained"
      color="primary"
      className={classes.loginButton}
      onClick={() => { history.push('/home') }}
    >
      Войти
    </Button>
  ))

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8}>
          <Paper className={classes.coverPaper}>
            <Typography className={classes.coverText}>
              Система управления передачей электроэнергии
            </Typography>
            <Box className={classes.imageContainer}>
              <img src={logo} className={classes.logo} alt=''/>
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
                <TextField className={classes.formInput} id="standard-basic" label="Логин" />
                <TextField className={classes.formInput} id="standard-password-input" type="password" label="Пароль" />
              </form>
              <ButtonLogin />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
