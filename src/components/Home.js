import "../css/home.css";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import React from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import clsx from "clsx";
import BuBdTable from "./BuBdTable";
import { BalanceGroupList } from "./BalanceTable";
import { MainChartCards } from "./MainChartCards";
import { MainChartHome } from "./MainChartHome";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "24px",
    width: "100%",
    maxWidth: "1372px",
    margin: "0 auto",
    background: "#F5F6F8",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  button: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "9px 14px",
    border: "none",
    color: "#FFF",
    width: "100%",
    height: "142px",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  buttonTasks: {
    background: "linear-gradient(127.52deg, #5EDDFF 20.68%, #4A9CFF 80.9%)",
    marginBottom: "24px",
  },
  buttonBalance: {
    background: "linear-gradient(122.56deg, #4A91FF 15.82%, #225899 82.63%)",
    marginBottom: "24px",
  },
  ButtonBuBd: {
    background: "linear-gradient(122.56deg, #4A9CFF 15.82%, #225899 82.63%)",
  },
  ButtonPost: {
    background: 'linear-gradient(127.52deg, #5EDDFF 20.68%, #4A9CFF 80.9%)',
  },
  buttonText: {
    fontFamily: "PFDinTextCondPro-Regular !important",
    fontSize: "24px",
    lineHeight: "29px",
    display: "inline-flex",
  },
  topButtons: {
    marginBottom: '24px'
  },
  icon: {
    position: "absolute",
    top: "15px",
    left: "14px",
    width: '30px',
    height: '30px'
  },
  pieChartPaper: {
    padding: "30px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  firstColumn: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  rightPieChart: {
    marginLeft: "12px",
  },
  leftPieChart: {
    marginRight: "12px",
  },
  pieChartImage: {
    width: "100%",
  },
  boxPaper: {
    display: "flex",
  },
  graphTwoGrid: {
    marginTop: "24px",
    height: '100%',
    maxHeight: '955px'
  },
  graphTwo: {
    height: '100%',
  },
  graphPaper: {
    padding: "20px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  graphOneImage: {
    width: "120%",
  },
  bubdTable: {
    paddingLeft: "15px",
    marginTop: "24px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  mainChartTitle: {
    display: 'flex',
    justifyContent: 'center'
  },
  mainChartTitleText: {
    fontFamily: "PFDinTextCondPro-Regular !important",
    color: '#818E9B'
  }
}));

export default function Home() {
  const classes = useStyles();

  const ButtonTasks = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonTasks)}
      onClick={() => {
        history.push("/tasks");
      }}
    >
      <WorkOutlineOutlinedIcon className={classes.icon} />
      <div className={classes.buttonContainer}>
        <span className={classes.buttonText}>Страница</span>
        <span className={classes.buttonText}>заданий</span>
      </div>
    </button>
  ));

  const ButtonBalance = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonBalance)}
      onClick={() => {
        history.push("/balancegroup");
      }}
    >
      <BarChartIcon className={classes.icon} />
      <div className={classes.buttonContainer}>
        <span className={classes.buttonText}>Балансовыe</span>
        <span className={classes.buttonText}>группы</span>
      </div>
    </button>
  ));

  const ButtonBuBd = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.ButtonBuBd)}
      onClick={() => {
        history.push("/bubd");
      }}
    >
      <MapOutlinedIcon className={classes.icon} />
      <div className={classes.buttonContainer}>
        <span className={classes.buttonText}>Карта</span>
        <span className={classes.buttonText}>БУ/БД</span>
      </div>
    </button>
  ));

  const ButtonPost = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.ButtonPost)}
      onClick={() => {
        history.push("/guaranteedsuppliers");
      }}
    >
      <HomeOutlinedIcon className={classes.icon} />
      <div className={classes.buttonContainer}>
        <span className={classes.buttonText}>Статистика</span>
        <span className={classes.buttonText}>гарантирующих</span>
        <span className={classes.buttonText}>поставщиков</span>
      </div>
    </button>
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} spacing={3} className={classes.firstColumn}>
          <Grid item xs={12} className={classes.graph}>
            <Paper className={clsx(classes.graphPaper, classes.graphOne)}>
              <MainChartCards />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.graphTwoGrid}>
            <Paper className={clsx(classes.graphPaper, classes.graphTwo)}>
              <MainChartHome />
              <div className={classes.mainChartTitle}>
                <span className={classes.mainChartTitleText}>Статистика создания новых заданий</span>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.boxPaper}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <ButtonTasks />
                <ButtonBuBd />
              </Grid>
              <Grid item xs={6}>
                <ButtonBalance />
                <ButtonPost />
              </Grid>
            </Grid>
          </Box>
          <Paper className={classes.bubdTable}>
            <BuBdTable rowsPerPage={5} topFive={true}/>
          </Paper>
          <Paper className={classes.bubdTable}>
            <BalanceGroupList rowsPerPage={5} topFive={true} order="asc" orderBy="imbalancePercent"/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
