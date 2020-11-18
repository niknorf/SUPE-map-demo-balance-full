import React, { useContext, useEffect, useState, useRef } from 'react';
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
import Popup from 'reactjs-popup';
import '../css/taskPopup.css';
import Contex from "../store/context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  },
  new: {
    marginRight: '14px',
    fontSize: '14px',
    lineHeight: '42px',
    fontFamily: "PFDinTextCondPro-Bold !important",
  },
  status: {
    marginRight: '62px',
    fontSize: '14px',
    lineHeight: '17px',
    textDecoration: 'underline'
  },
  taskNumPopup: {
    fontSize: '14px',
    lineHeight: '17px',
    fontFamily: "PFDinTextCondPro-Bold !important",
  },
  addressPopup: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '44px',
    paddingBottom: '59px',
    fontSize: '24px',
    lineHeight: '23px',
    color: '#8C949E',
  },
  columnsPopup: {
    display: 'flex',
    flexDirection: 'column'
  },
  columnTitle: {
    fontSize: '11px',
    lineHeight: '13px',
    color: '#818E9B'
  },
  columnContent: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  fullWidth: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: '18px',
    marginTop: '24px'
  },
  fullWidthTitle: {
    color: '#818E9B'
  },
  buttons: {
    marginTop: '24px',
    marginBottom: '16px',
    display: 'flex'
  },
  exitButton: {
    width: '50%',
    marginRight: '8px',
    color: '#4A9CFF',
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      color: '#4A9CFF',
    },
  },
  feedbackButton: {
    width: '50%',
    marginLeft: '8px',
    textTransform: 'none',
    backgroundColor: '#4A9CFF',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#4A9CFF',
    },
  },
  note: {
    fontSize: '11px',
    lineHeight: '13px',
    color: '#818E9B',
    marginTop: '16px'
  }
}));

export default function AutoGrid() {
  const classes = useStyles();
  const [tasks, setTaskContent] = useState([]);
  const { globalState, globalDispach } = useContext(Contex);



  //let firstName = 

  useEffect(() => {
    fetch("/api/UserTasks")
      .then((res) => res.json())
      .then(
        (result) => {
          setTaskContent(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
    // setLoading(true);
  }, []);

  const taskCount = useRef();

  function count() {
    console.log(taskCount.current.childNodes.length)
  }

  // Counter 

  // useEffect(() => {
  //   taskCount.current = taskCount
  // })

  const TaskPopup = () => (
    <Popup
      className={classes.pop}
      trigger={
        <Button variant="contained" color="primary">Open</Button>
      }
      modal
      nested
    >
      {close => (
        
        <div className="modal">
        {tasks.map((task) => (
          <div className="content">
            <div className="top">
              <img src={BlueDot} className={classes.taskDot}></img>
              <span className={classes.new}>Новое</span>
              <span className={classes.status}>Изменить статус</span>
              <span className={classes.taskNumPopup}>Задание №{task.id}</span>
            </div>
            <div className={classes.addressPopup}>
              <span className={classes.addressText}>{task.fiasAddress}</span>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={6} className={classes.columnsPopup}>
                <span className={classes.columnTitle}>Дата и время</span>
                <span className={classes.columnContent}>{task.date}</span>
              </Grid>
              <Grid item xs={6} className={classes.columnsPopup}>
                <span className={classes.columnTitle}>Исполнитель</span>
                <span className={classes.columnContent}>Иванов Константин</span>
              </Grid>
            </Grid>
            <div className={classes.fullWidth}>
              <span className={classes.fullWidthTitle}>Описание обьекта:</span>
              <span className={classes.fullWidthContent}>Жилое помещение в многоквартирном доме, находится на первом этаже.</span>
            </div>
            <div className={classes.fullWidth}>
              <span className={classes.fullWidthTitle}>Причина создания заявки:</span>
              <span className={classes.fullWidthContent}>{task.descriptionTask}</span>
            </div>
            <div className={classes.buttons}>
              <Button variant="outlined" color="primary" className={classes.exitButton}>
                Выйти
              </Button>
              <Button variant="contained" color="primary" className={classes.feedbackButton}>
                Обратная связь
              </Button>
            </div>
            <span className={classes.note}>* чтобы отправить обратную связь, измените статус задания на “В процессе”</span>
          </div>
          ))}
        </div>
      )}
    </Popup>
  );

  //console.log(tasks);

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
              <Grid item xs={3} className={classes.newTasks}>
                <img src={BlueDot} className={classes.titleDot}></img>
                <span className={classes.title}>Новые (7)</span>
                <div ref={taskCount} onLoad={count}>
                  {tasks.map((task) => (
                    <Paper className={classes.taskCard}>
                      <span className={classes.address}>{task.fiasAddress}</span>
                      <div>
                        <img src={BlueDot} className={classes.taskDot}></img>
                        <span className={classes.taskNumber}>Задание №{task.id}</span>
                      </div>
                      <span className={classes.description}>{task.descriptionTask}</span>
                      <div>
                        <CalendarTodayOutlinedIcon className={classes.pregressIcon} />
                        <span className={classes.progress}>{task.date}</span>
                      </div>
                      <TaskPopup />
                    </Paper>
                  ))}
                </div>
              </Grid>
              <Grid item xs={3}>
                <img src={YellowDot} className={classes.titleDot}></img>
                <span className={classes.title}>В процессе (0)</span>
                {/* <Paper className={classes.taskCard}>
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
                </Paper> */}
              </Grid>
              <Grid item xs={3}>
                <img src={GreenDot} className={classes.titleDot}></img>
                <span className={classes.title}>Выполнено (0)</span>
                {/* <Paper className={classes.taskCard}>
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
                </Paper> */}
              </Grid>
              <Grid item xs={3}>
                <img src={RedDot} className={classes.titleDot}></img>
                <span className={classes.title}>Просрочено (0)</span>
                {/* <Paper className={classes.taskCard}>
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
                </Paper> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}