import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Icon,
  Button,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import clsx from "clsx";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import LoadingOverlay from "react-loading-overlay";
import "../css/graphic.css";
import InfoWindow from "./InfoWindow.js";
import axios from "axios";
import localeRu from "plotly.js-locales/ru";
const Plot = createPlotlyComponent(Plotly);

Plotly.register(localeRu);
Plotly.setPlotConfig({ locale: "ru" });

const useStyles = makeStyles((theme) => ({
  yearsOptionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  yearButton: {
    border: "none",
    borderRadius: 0,
    color: "#252F4A",
    lineHeight: "13px",
    letterSpacing: "0.01em",
    fontSize: "11px",
    fontFamily: "PF Din Text Cond Pro",
  },
  chartTitle: {
    fontSize: "14px",
    lineHeight: "14px",
    paddingTop: "30px",
    paddingLeft: "24px",
    color: "#252F4A",
  },
}));

const HouseStatisticsChart = () => {
  const [pskSum, setPskSum] = useState([]);
  const [pskSeppate, setPskSeppate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  let fiz = "/api/DataCompare/GetFizTimeSeries/1281/" + globalState.fiasId;
  let urik = "/api/PSK/GetLegalPSKData/1281/" + globalState.fiasId;
  let house = "/api/PSK/GetCommonPSKData/1281/" + globalState.fiasId;

  useEffect(() => {
    // setLoading(true);
    if (globalState.fiasId !== "") {
      const requestOne = axios.get(fiz);
      const requestTwo = axios.get(urik);
      const requestThree = axios.get(house);
      axios
        .all([requestOne, requestTwo, requestThree])
        .then(
          axios.spread((...results) => {
            setPskSeppate(results);
            setLoading(false);
            // use/access the results
          })
        )
        .catch((errors) => {
          setLoading(false);
          // react on errors.
        });

      fetch("/api/PSK/GetFullPSKData/1281/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            setPskSum(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
  }, [globalState.fiasId]);

  return globalState.fiasId !== ""
    ? [
        // <LoadingOverlay
        //   active={loading}
        //   spinner={<CircularProgress style={{ color: "#FFFFFF" }} />}
        //   text=""
        //   styles={{
        //     overla   y: (base) => ({
        //       ...base,
        //       background: "rgba(34, 47, 74, 0.3)",
        //     }),
        //   }}
        // >
        <Grid container direction="column">
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Box style={{ minHeight: "450px" }}>
              <Typography className={classes.chartTitle}>
                График показаний по дому согласно статистике гарантирующих
                поставщиков по годам,кВтч
              </Typography>
              <DisplaySummedChart resultData={pskSum} />
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            {/* <Box style={{minHeight: '450px'}}> */}
            <Typography className={classes.chartTitle}>
              График суммарных показаний по дому согласно статистике
              гарантирующих поставщиков , кВтч
            </Typography>
            <DisplaySepparateChart resultData={pskSeppate} />

            {/* </Box> */}
          </Grid>
        </Grid>,
        // </LoadingOverlay>,
      ]
    : null;
};

const DisplaySepparateChart = ({ resultData }) => {
  let empty_data = true;

  var psk_seppate = {
    layout: {
      autosize: true,
      font: {
        family: "Roboto",
        size: 12,
        color: "#A3A3A3",
      },
      barmode: "stack",
      showlegend: true,
      // legend: {
      //   x: 1,
      //   xanchor: "right",
      //   traceorder: 'normal',
      //   y: 1,
      //   bgcolor: 'transparent',
      // },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#4A9CFF" },
        name: "Физ.лица",
        type: "bar",
      },
      {
        x: [],
        y: [],
        marker: { color: "#00EBD3" },
        name: "Юр.лица",
        type: "bar",
      },
      {
        x: [],
        y: [],
        marker: { color: "#A9FF94" },
        name: "Общедомовые нужды",
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

  if (resultData.length > 0) {
    for (let i = 0; i < resultData.length; i++) {
      empty_data = false;
      for (let j = 0; j < resultData[i].data.length; j++) {
        psk_seppate.data[i].x.push(resultData[i].data[j].datetime);
        psk_seppate.data[i].y.push(resultData[i].data[j].value);
      }
    }
  } else {
    empty_data = true;
  }

  return empty_data
    ? [
        <InfoWindow
          label="Извините, недостаточно данных для расчета "
          icon="info"
        />,
      ]
    : [
        <Plot
          style={{ width: "100%", height: "100%" }}
          data={psk_seppate.data}
          layout={psk_seppate.layout}
          config={psk_seppate.config}
        />,
      ];
};

const DisplaySummedChart = ({ resultData }) => {
  let empty_data = false;

  var psk_sum = {
    layout: {
      autosize: true,
      font: {
        family: "Roboto",
        size: 12,
        color: "#A3A3A3",
      },
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#00CAFF" },
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

  if (resultData.length > 0) {
    empty_data = false;
    for (let i = 0; i < resultData.length; i++) {
      psk_sum.data[0].x.push(resultData[i].datetime);
      psk_sum.data[0].y.push(resultData[i].value);
    }
  } else {
    empty_data = true;
  }

  return empty_data
    ? [
        <InfoWindow
          label="Извините, недостаточно данных для расчета "
          icon="info"
        />,
      ]
    : [
        <Plot
          style={{ width: "100%", height: "100%" }}
          // useResizeHandler
          data={psk_sum.data}
          layout={psk_sum.layout}
          config={psk_sum.config}
          // locale='de-CH'
        />,
      ];
};

export { HouseStatisticsChart };
