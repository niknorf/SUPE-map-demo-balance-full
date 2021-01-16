import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js";
import React, { useContext, useState, useEffect } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";

const Plot = createPlotlyComponent(Plotly);
const useStyles = makeStyles((theme) => ({
  paperStyles: {
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  boxPaddingLabel: {
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  },
  boxPaddingCards: {
    paddingLeft: "16px",
    paddingBottom: "16px",
    paddingRight: "16px",
  },
  boxPaddingTabs: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  boxStyle: {
    display: "block",
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF",
    minWidth: '180px'
  },
  cornerTextCard: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "16px",
    paddingLeft: "16px",
    color: "#252F4A",
    opacity: "0.25",
  },
  cornerTitle: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "9px",
    paddingLeft: "12px",
    paddingRight: "12px",
    color: "#FFFFFF",
  },
  boxValuesText: {
    position: "relative",
    fontSize: "28px",
    lineHeight: "40px",
    fontWeight: "bold",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
    paddingBottom: "10px",
    paddingLeft: "12px",
    color: "#FFFFFF",
  },
  balanceGroupLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
  },
  middleText: {
    wordWrap: "normal",
    fontSize: "18px",
    lineHeight: "23px",
    color: "#8C949E",
  },
}));


const CreatePieTasks = (props) => {
  let data_object = {
    values:[],
    labels: ['Новые', 'Просроченные', 'Выполененные', 'В процессе'],
    type: 'pie',
    hole: .7,
    textinfo: "label+percent",
    textposition: "outside",
    automargin: true,
    showlegend: false,
    marker: {
      colors: ['rgb(215,223,233,1)', 'rgb(255,107,74,1)', 'rgb(99,255,74,1)', 'rgb(74,156,255,1)']
    },
  }

  let emptyData = true;

  if(Object.keys(props.dataObject).length){
    emptyData = false;
    data_object.values.push(props.dataObject.['Новые'], props.dataObject.['Просроченные'], props.dataObject.['Выполененные'], props.dataObject.['В процессе'])
  }else{
    emptyData = true;
  }

  props.pieChartData.data.push(data_object);

  return emptyData
    ? [
        <InfoWindow
          label="Извините, недостаточно данных для расчета"
          icon="info"
        />,
      ]
    : [
        <Plot
          style={{ width: "100%", height: "100%" }}
          useResizeHandler
          data={props.pieChartData.data}
          layout={props.pieChartData.layout}
          config={props.pieChartData.config}
        />,
      ];
};

const MainChartCards = () => {
  const [chartData, setChartData] = useState({});
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  useEffect(() => {
      fetch("/api/UserTasks/CurrentStatistic")
        .then((res) => res.json())
        .then(
          (result) => {
            setChartData(result);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
  }, []);

  const handleSwitchChange = (event) => {
    setState(event.target.checked);
  };

  var tasks_statistic = {
    layout: {
      hoverinfo: "none",
      autosize: true,
      height: 300,
      width: 350,
    },
    data: [],
    config: {
      modeBarButtonsToRemove: [
        "pan2d",
        "select2d",
        "lasso2d",
        "resetScale2d",
        "toggleSpikelines",
        "hoverClosestCartesian",
        "hoverCompareCartesian",
      ],
      displaylogo: false,
      responsive: true,
    },
  };

  return(
    <Grid
              container
              spacing={3}
              alignContent="stretch"
              alignItems="stretch"
              direction="row"
              display="flex"
            >
                <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                  {/* Cards area */}
                  <Grid
                    container
                    spacing={3}
                    justify="flex-start"
                    alignContent="flex-start"
                    alignItems="baseline"
                    direction="column"
                    wrap="wrap"
                  >
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                      <Box className={classes.boxStyle}>
                        <Typography className={classes.cornerTitle}>
                          Количество новых заданий
                        </Typography>
                        <Typography className={classes.boxValuesText}>
                          {chartData.['Количество задач']}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                      <Box className={classes.boxStyle}>
                        <Typography className={classes.cornerTitle}>
                          Количество исполнителей
                        </Typography>
                        <Typography className={classes.boxValuesText}>
                            {chartData.['Количество исполнителей']}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                      <Box className={classes.boxStyle}>
                        <Typography className={classes.cornerTitle}>
                          Количество завершенных
                        </Typography>
                        <Typography className={classes.boxValuesText}>
                            {chartData.['Выполененные']}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
                  {/* Pie chart area */}
                  <CreatePieTasks
                    dataObject={chartData}
                    pieChartData={tasks_statistic}/>
                </Grid>
            </Grid>
  );
};

export { MainChartCards };
