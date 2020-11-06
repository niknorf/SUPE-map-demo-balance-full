import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import BlueDot from "../img/blue-dot.svg";
import YellowDot from "../img/yellow-dot.svg";
import GreenDot from "../img/green-dot.svg";
import RedDot from "../img/red-dot.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '23px 27px'
  },
  tasksContainer: {
    padding: '24px',
  },
  paperChange: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  buttonChange: {
    background: '#4A9CFF',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      background: '#4A9CFF',
    },
  },
  searchForm: {
    padding: '8px 20px 20px',
  },
  taskNavigation: {
    marginTop: '11px'
  },
  titleDot: {
    marginRight: '8px',
    marginLeft: '16px',
  },
  title: {
    fontSize: '14px',
    lineHeight: '42px'
  },
  taskCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    marginBottom: '17px',
    boxShadow: '4px 6px 18px rgba(0, 0, 0, 0.06)'
  },
  address: {
    fontSize: '10px',
    lineHeight: '12px',
    color: '#8C949E',
    marginBottom: '5px',
  },
  taskNumber: {
    fontSize: '16px',
    lineHeight: '20px',
    marginBottom: '9px',
  },
  description: {
    fontSize: '14px',
    lineHeight: '17px',
    marginBottom: '11px',
    fontFamily: "PFDinTextCondPro-Regular !important",
  },
  progress: {
    fontSize: '14px',
    lineHeight: '17px',
    color: '#8C949E',
    fontFamily: "PFDinTextCondPro-Regular !important",
  },
  taskDot: {
    marginRight: '6px'
  },
  pregressIcon: {
    color: '#8C949E',
    width: '13px',
    height: '13px',
    marginRight: '6px'
  }
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <Paper className={classes.paperPanel}>
            <AccountCircleOutlinedIcon style={{ fontSize: 39, marginBottom: '16px' }} />
            <span style={{ fontSize: '20px', lineHeight: '25px', marginBottom: '3px' }}>Сидоров Егор Павлович</span>
            <span style={{ fontSize: '14px', lineHeight: '17px', marginBottom: '21px' }}>Менеджер</span>
          </Paper>
        </Grid>
        <Grid item xs>
          <Box className={classes.tasksContainer}>
            <span style={{ fontSize: '32px', lineHeight: '38px', marginBottom: '3px' }}>Задания по северному РЭС</span>
            <Grid container spacing={3} className={classes.taskNavigation}>
              <Grid item xs={4}>
                <Paper className={classes.paperChange}>
                  <span style={{ fontSize: '14px', lineHeight: '18px' }}>Период: 1 Октября - 14 Октября</span>
                  <Button
                    variant="contained"
                    className={classes.buttonChange}
                    startIcon={<CalendarTodayOutlinedIcon />}
                  >
                    Изменить
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                  <form className={classes.searchForm} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Найти задание" style={{ width: '100%' }} />
                  </form>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <img src={BlueDot} className={classes.titleDot}></img>
                <span className={classes.title}>Новые (3)</span>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={BlueDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={BlueDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={BlueDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <img src={YellowDot} className={classes.titleDot}></img>
                <span className={classes.title}>В процессе (2)</span>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={YellowDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={YellowDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <img src={GreenDot} className={classes.titleDot}></img>
                <span className={classes.title}>Выполнено (3)</span>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={GreenDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={GreenDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={GreenDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
              <img src={RedDot} className={classes.titleDot}></img>
                <span className={classes.title}>Просрочено (1)</span>
                <Paper className={classes.taskCard}>
                  <span className={classes.address}>ул. Фёдора Абрамова, 19 к1</span>
                  <div>
                    <img src={RedDot} className={classes.taskDot}></img>
                    <span className={classes.taskNumber}>Задание №1334</span>
                  </div>
                  <span className={classes.description}>Возможное безучетно потребление физ. лица. Требуется проверка исполнителя.</span>
                  <div>
                    <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                    <span className={classes.progress}>В работе 10 дней</span>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        </Grid>
    </div>
      );
}