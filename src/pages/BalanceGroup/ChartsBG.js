import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  CircularProgress
} from "@material-ui/core";
import MuiToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Contex from "store/context";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import LoadingOverlay from "react-loading-overlay";
import "assets/css/graphic.css";
import InfoWindow from "components/InfoWindow.js"
import localeRu from "plotly.js-locales/ru";
const Plot = createPlotlyComponent(Plotly);

Plotly.register(localeRu);
Plotly.setPlotConfig({ locale: "ru" });

const ToggleButton = withStyles({
  selected: {
    "&$selected": {
      borderBottom: '2px solid #252F4A',
      backgroundColor: "transparent",
    },
  }
})(MuiToggleButton);

const column_title_font = {
  size: 12,
  color: "#252F4A",
};

const GraphicGroup = () => {
  // const [month, setMonth] = useState(7);
  const [meterAvg, setOutMonth] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [year, setFilterYear] = useState('2020');
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const handleYearChange = (event, value) => {
    //Cannot be unselected
    if(value !== null){
      // setFilterYear(value);
    }
  };

  useEffect(() => {
    // setLoading(true);
    if (globalState.balance_index !== "") {
      fetch(
        "/api/Results/GetBalanceGroupMeterpointStats/" + globalState.balance_index
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setOutMonth(result);
            // setLoading(false);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );

    }
  }, [globalState.balance_index]);

  /* Bar charts */
  var balance_group_tech_loss = {
    layout: {
      autosize: true,
      font: {
        family: "Roboto",
        size: 12,
        color: "#A3A3A3",
      },
      title: {
        text: "",
        font: column_title_font,
      },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#a9ff94" },
        type: "bar",
      },
    ],
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
  var meter_avg = {
    layout: {
      autosize: true,
      font: {
        family: "Roboto",
        size: 12,
        color: "#A3A3A3",
      },
      title: {
        text: "",
        font: column_title_font,
      },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#00EBD3" },
        type: "bar",
      },
    ],
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

  return globalState.balance_index !== "" && globalState.isClean
    ? [
  //     <LoadingOverlay
  //   active={loading}
  //   spinner={<CircularProgress style={{ color: "#FFFFFF" }} />}
  //   text=""
  //   styles={{
  //     overlay: (base) => ({
  //       ...base,
  //       background: "rgba(34, 47, 74, 0.3)",
  //     }),
  //   }}
  // >
  <Paper elevation={1} className={classes.paperShadow}>
      <Grid container>
        <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
          <Box>
            <Typography className={classes.chartTitle}>
  Технические потери на балансовой группе, кВтч
            </Typography>
            <DisplayBarChart
              type={balance_group_tech_loss}
              obj_name="tech_loss"
              resultData={[]}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
          <Box>
            <Typography className={classes.chartTitle}>
  Передача показаний приборов технического учета, %
            </Typography>
            <DisplayBarChart
              type={meter_avg}
              obj_name="percent"
              resultData={meterAvg}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <Box className={classes.yearsOptionBox}>
        <ToggleButtonGroup
      value={year}
      exclusive
      onChange={handleYearChange}
      aria-label="text alignment"
        >
      <ToggleButton value="2017" aria-label="left aligned" className={classes.yearButton}>
      2017
      </ToggleButton>
      <ToggleButton value="2018" aria-label="centered" className={classes.yearButton}>
      2018
      </ToggleButton>
      <ToggleButton value="2019" aria-label="right aligned" className={classes.yearButton}>
      2019
      </ToggleButton>
      <ToggleButton value="2020" aria-label="justified" className={classes.yearButton}>
      2020
      </ToggleButton>
      </ToggleButtonGroup>
      </Box> */}
      </Paper>
      // </LoadingOverlay>
      ]
    : null;
};

const OutInputMonthGraphic = () => {
  const [month, setMonth] = useState(7);
  const [outMonth, setOutMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setFilterYear] = useState('2021');
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const handleYearChange = (event, value) => {
    //Cannot be unselected
    if(value !== null){
      setFilterYear(value);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (globalState.balance_index !== "") {
      fetch(
        "/api/Results/GetResImbalanceFrontByYear/" + year + "/" + globalState.balance_index
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setOutMonth(result);
            setLoading(false);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );

    }
  }, [year, globalState.balance_index]);

  /* Bar charts */
  var input_month = {
    layout: {
      autosize: true,
      title: {
        text:
          ""
      },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#00ebd3" },
        type: "bar",
      },
    ],
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
  var out_psk_month = {
    layout: {
      autosize: true,
      title: {
        text:
          ""
      },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#00caff" },
        type: "bar",
      },
    ],
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


  return globalState.balance_index !== "" && globalState.isClean
    ? [
      <LoadingOverlay
    active={loading}
    spinner={<CircularProgress style={{ color: "#FFFFFF" }} />}
    text=""
    styles={{
      overlay: (base) => ({
        ...base,
        background: "rgba(34, 47, 74, 0.3)",
      }),
    }}
  >
<Paper elevation={1} className={classes.paperShadow}>
      <Grid container>
        <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
          <Box>
            <Typography className={classes.chartTitle}>
График суммарных помесячных показаний согласно приборам учета, кВтч
            </Typography>
            <DisplayBarChart
              type={input_month}
              obj_name="input_month"
              resultData={outMonth}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
          <Box>
            <Typography className={classes.chartTitle}>
График суммарных помесячных показаний гарантирующих поставщиков, кВтч
            </Typography>
            <DisplayBarChart
              type={out_psk_month}
              obj_name="out_month"
              resultData={outMonth}
            />
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.yearsOptionBox}>
        <ToggleButtonGroup
      value={year}
      exclusive
      onChange={handleYearChange}
      aria-label="text alignment"
        >
      <ToggleButton value="2017" aria-label="left aligned" className={classes.yearButton}>
      2017
      </ToggleButton>
      <ToggleButton value="2018" aria-label="centered" className={classes.yearButton}>
      2018
      </ToggleButton>
      <ToggleButton value="2019" aria-label="right aligned" className={classes.yearButton}>
      2019
      </ToggleButton>
      <ToggleButton value="2020" aria-label="justified" className={classes.yearButton}>
      2020
      </ToggleButton>
      <ToggleButton value="2021" aria-label="justified" className={classes.yearButton}>
      2021
      </ToggleButton>
      </ToggleButtonGroup>
      </Box>
      </Paper>
      </LoadingOverlay>
      ]
    : null;
};

const DisplayBarChart = ({ type, obj_name, resultData }) => {
  let empty_data = true;
    if (resultData.length > 0) {
      empty_data = false;
      for (let i = 0; i < resultData.length; i++) {
          type.data[0].x.push(resultData[i].month);
          type.data[0].y.push(resultData[i].[obj_name]);
      }
    }else{
      empty_data = true;
      type.data[0].x = [];
      type.data[0].y  = [];
    }

  return (
    empty_data ? [
      <InfoWindow label="Извините, недостаточно данных для расчета " icon="info" />
    ] : [
      <Plot
        style={{ width: "100%", height: "500px" }}
        // useResizeHandler
        data={type.data}
        layout={type.layout}
        config={type.config}
      />
    ]


  );
};

const useStyles = makeStyles((theme) => ({
  yearsOptionBox:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  yearButton:{
    border: 'none',
    borderRadius: 0,
    color: '#252F4A',
    lineHeight: '13px',
    letterSpacing: '0.01em',
    fontSize: '11px',
    fontFamily: 'PF Din Text Cond Pro'
  },
  chartTitle: {
    fontSize: "14px",
    lineHeight: "14px",
    paddingTop: "30px",
    paddingLeft: "24px",
    color: "#252F4A",
  },
  paperShadow: {
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06) !important',
  },
}));

export { GraphicGroup, OutInputMonthGraphic };
