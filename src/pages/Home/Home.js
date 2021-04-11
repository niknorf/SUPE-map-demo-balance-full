import "pages/Home/css/home.css";
import { Grid, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import BarChartIcon from "@material-ui/icons/BarChart";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import TaskIcon from "pages/Home/img/task_icon.svg";
import BuBdIcon from "pages/Home/img/bubd_icon.svg";
import BalanceGroupIcon from "pages/Home/img/balance_group_icon.svg";
import GsIcon from "pages/Home/img/gs_icon.svg";
import React from "react";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import clsx from "clsx";
import { TableBuBbTop5 } from "pages/Home/TableBuBbTop5";
import { BalanceGroupTop5Table } from "pages/BalanceGroup/TableBG";
import { MainChartCards } from "pages/Home/CurrentStatisticsChartHome";
import { MainChartHome } from "pages/Home/WeeklyStatisticsChartHome";

export default function Home() {
  const classes = useStyles();

  const ButtonTasks = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonStyle)}
      onClick={() => {
        history.push("/tasks");
      }}
    >
      <div className={classes.buttonContainer}>
        <img src={TaskIcon} className={classes.icon}></img>
        <div className={classes.btnTextContainer}>
          <span className={classes.buttonText}>Страница заданий</span>
        </div>
      </div>
    </button>
  ));

  const ButtonBalance = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonStyle)}
      onClick={() => {
        history.push("/balancegroup");
      }}
    >
      <div className={classes.buttonContainer}>
        <img src={BuBdIcon} className={classes.icon}></img>
        <div className={classes.btnTextContainer}>
          <span className={classes.buttonText}>Балансовыe группы</span>
        </div>
      </div>
    </button>
  ));

  const ButtonBuBd = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonStyle)}
      onClick={() => {
        history.push("/bubd");
      }}
    >
      <div className={classes.buttonContainer}>
        <img src={BalanceGroupIcon} className={classes.icon}></img>
        <div className={classes.btnTextContainer}>
          <span className={classes.buttonText}>Карта БУ/БД</span>
        </div>
      </div>
    </button>
  ));

  const ButtonPost = withRouter(({ history }) => (
    <button
      type="button"
      className={clsx(classes.button, classes.buttonStyle)}
      onClick={() => {
        history.push("/guaranteedsuppliers");
      }}
    >
      <div className={classes.buttonContainer}>
        <img src={GsIcon} className={classes.icon}></img>
        <div className={classes.btnTextContainer}>
          <span className={classes.buttonText}>Статистика гарантирующих </span>
          <span className={classes.buttonText}>поставщиков</span>
        </div>
      </div>
    </button>
  ));

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        // alignContent="stretch"
        // alignItems="stretch"
        // direction="row"
        // display="flex"
      >
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <ButtonTasks key="home-button-tasks"/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <ButtonBuBd key="home-button-bubd"/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <ButtonBalance key="home-button-balance-group"/>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
          <ButtonPost key="home-button-gs"/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={6} xl={6} xs={12} className={classes.firstColumn}>
          <Grid item xs={12} className={classes.graph}>
            <Paper className={classes.graphPaper}>
              <MainChartCards key="home-component-main-chart-cards"/>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.graphTwoGrid}>
            <Paper className={classes.graphPaper}>
              <MainChartHome key="home-component-main-chart-home"/>
              <div className={classes.mainChartTitle}>
                <span className={classes.mainChartTitleText}>
                  Статистика создания новых заданий
                </span>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xl={6} xs={12}>
          <Paper className={classes.bubdTable}>
            <TableBuBbTop5 key="home-component-main-bubd-top-five"/>
          </Paper>
          <Paper className={classes.bubdTable}>
            <BalanceGroupTop5Table key="home-component-balance-group-top-five"/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

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
    display: "relative",
  },
  btnTextContainer: {
    position: "absolute",
    top: "16px",
    left: "16px",
    textAlign: 'initial'
  },
  icon: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
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
  buttonStyle: {
    background: "linear-gradient(127.52deg, #4764B0 20.68%, #252F4A 80.9%)",
    marginBottom: "24px",
  },
  buttonText: {
    fontFamily: "PFDinTextCondPro-Regular !important",
    fontSize: "24px",
    lineHeight: "29px",
    display: "inline-flex",
  },
  topButtons: {
    marginBottom: "24px",
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
    height: "100%",
    maxHeight: "955px",
  },
  graphTwo: {
    height: "100%",
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
    marginBottom: "24px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  mainChartTitle: {
    display: "flex",
    justifyContent: "center",
  },
  mainChartTitleText: {
    fontFamily: "PFDinTextCondPro-Regular !important",
    color: "#818E9B",
  },
}));
