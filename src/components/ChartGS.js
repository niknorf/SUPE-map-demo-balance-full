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
const Plot = createPlotlyComponent(Plotly);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  bigContainer: {
    padding: "0",
  },
  formControlBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
  },
  reasonText: {
    margin: "8px",
  },
  barPaper: {
    display: "flex",
    justifyContent: "space-around",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  chartsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  chartsPaper: {
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
    margin: "12px 0",
  },
  lastBlockPaper: {
    marginTop: "12px",
  },
  boxStyle: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    height: 141,
    width: 200,
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    wordWrap: "break-word",
    // flex: 1,
    // flexWrap: 'wrap'
  },
  boxTopText: {
    position: "absolute",
    height: "43px",
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    marginTop: "16px",
    marginLeft: "16px",
    marginRight: "16px",
    color: "#818E9B",
    width: 168,
    display: "inline-block",
    wordWrap: "break-word",
  },
  boxMiddleText: {
    position: "absolute",
    height: "58px",
    marginBottom: "9px",
    marginLeft: "16px",
    marginTop: "40px",
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "48px",
    lineHeight: "58px",
    letterSpacing: "0.01em",
    wordWrap: "break-word",
  },
  boxTopIcon: {
    position: "relative",
    marginTop: "10px",
    marginLeft: "10px",
  },
  imageIcon: {
    width: 13.33,
    height: 13.33,
  },
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

// const ToggleButton = withStyles({
//   selected: {
//     "&$selected": {
//       borderBottom: '2px solid #252F4A',
//       backgroundColor: "transparent",
//     },
//   }
// })(MuiToggleButton);

const HouseStatisticsChart = () => {
  const [outMonth, setOutMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [year, setFilterYear] = useState('2020');
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  let fiz = "/api/DataCompare/GetFizTimeSeries/1281/" + globalState.fiasId;
  let urik = "/api/PSK/GetLegalPSKData/1281/" + globalState.fiasId;
  let house = "/api/PSK/GetCommonPSKData/1281/" + globalState.fiasId;

  const requestOne = axios.get(fiz);
  const requestTwo = axios.get(urik);
  const requestThree = axios.get(house);

  // const handleYearChange = (event, value) => {
  //   //Cannot be unselected
  //   if(value !== null){
  //     setFilterYear(value);
  //   }
  // };

  useEffect(() => {
    // setLoading(true);
    if (globalState.fiasId !== "") {
      axios
        .all([requestOne, requestTwo, requestThree])
        .then(
          axios.spread((...results) => {
            setOutMonth(results);
            setLoading(false);
            // use/access the results
          })
        )
        .catch((errors) => {
          setLoading(false);
          // react on errors.
        });
    }
  }, [globalState.fiasId]);

  /* Bar charts */
  var psk_sum = {
    layout: {
      autosize: true,
      title: {
        text: "",
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
  var psk_seppate = {
    layout: {
      autosize: true,
      title: {
        text: "",
      },
      barmode: "stack",
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

  return globalState.fiasId !== ""
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
          {/* <Paper elevation={1}> */}
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Box>
                <Typography className={classes.chartTitle}>
                  График показаний по дому согласно статистике гарантирующих
                  поставщиков по годам,кВтч
                </Typography>
                <DisplayBarChart
                  type={psk_sum}
                  obj_name="input_month"
                  resultData={outMonth}
                />
              </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Box>
                <Typography className={classes.chartTitle}>
                  График суммарных показаний по дому согласно статистике
                  гарантирующих поставщиков , кВтч
                </Typography>
                <DisplayBarChart
                  type={psk_seppate}
                  obj_name="out_month"
                  resultData={outMonth}
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
          {/* </Paper> */}
        </LoadingOverlay>,
      ]
    : null;
};

const DisplayBarChart = ({ type, obj_name, resultData }) => {
  let empty_data = true;

  for (let i = 0; i < resultData.length; i++) {
    if (resultData[i].data.length > 0) {
      empty_data = false;
      for (let j = 0; j < resultData[i].data.length; j++) {
        if (obj_name === "input_month") {
        //   sum[] += resultData[i].data[j].value;
        //   // type.data[0].x.push(resultData[i].data[j].datetime);
        //   // type.data[0].y.push(resultData[i].data[j].value);
        } else {
          type.data[i].x.push(resultData[i].data[j].datetime);
          type.data[i].y.push(resultData[i].data[j].value);
        }
      }
    } else {
      if (obj_name === "input_month") {
        empty_data = true;
        type.data[0].x = [];
        type.data[0].y = [];
      } else {
        empty_data = true;
        type.data[i].x = [];
        type.data[i].y = [];
      }
    }
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
          data={type.data}
          layout={type.layout}
          config={type.config}
        />,
      ];
};

export { HouseStatisticsChart };
