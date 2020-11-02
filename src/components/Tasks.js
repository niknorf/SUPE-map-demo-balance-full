import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

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
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}