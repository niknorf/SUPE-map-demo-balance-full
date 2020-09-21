import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '38px 40px 0',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  profileInfo: {
    display: 'flex',
    marginBottom: '40px',
  },
  properties: {
    marginRight: '39px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: '17px'
  },
  link: {
    display: 'flex',
    color: '#252F4A',
    textDecoration: 'underline',
    marginBottom: '17px'
  },
  outerBox: {
    padding: '74px 77px 50px;'
  }
}));

export default function ProfileNoAuth() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="div" className={classes.outerBox}>
              <Box fontSize="32px" lineHeight="38px" marginBottom="24px">
                Личный кабинет
              </Box>
              <Box fontSize="24px" lineHeight="29px" marginBottom="24px">
                Данные пользователя
              </Box>
              <Box className={classes.profileInfo}>
                <Box className={classes.properties}>
                  <Box>
                    Имя
                </Box>
                  <Box>
                    Отчество
                </Box>
                  <Box>
                    Фамилия
                </Box>
                  <Box>
                    Роль
                  </Box>
                </Box>
                <Box className={classes.data}>
                  <Box>
                    Константин
                </Box>
                  <Box>
                    Владимирович
                </Box>
                  <Box>
                    Иванов
                </Box>
                  <Box>
                    Диспетчер
                  </Box>
                </Box>
              </Box>
              <Box className={classes.links}>
                <Link href="#" className={classes.link}>
                  <InfoOutlined style={{ fontSize: '17px', marginRight: '6px', color: '#4A9CFF' }} />
                  Информация о проекте
                </Link>
                <Link href="#" className={classes.link}>
                  <InfoOutlined style={{ fontSize: "17px", marginRight: '6px', color: '#4A9CFF' }} />
                  Документация
                </Link>
              </Box>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}