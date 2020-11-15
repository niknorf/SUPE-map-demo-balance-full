import { Grid, Paper, Switch, Typography, Box, Icon } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js";
import React, { useContext, useState, useEffect } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import clsx from "clsx";
import Contex from "../store/context";
import full_res from "../data/graphic/res_imbalance_front.json";
import full_res_phantom from "../data/graphic/imbalance_phantom.json";
import phantomic_buildings from "../data/balance_phantom_dict.json";
import InfoWindow from "./InfoWindow.js"

const Plot = createPlotlyComponent(Plotly);
const useStyles = makeStyles((theme) => ({
  paperStyles: {
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  fixedHeight: {
    //height: 500,
  },
  switchRightText: {
    color: "#F19E69",
  },
  switchLeftText: {
    color: "#818E9B",
  },
  pskGrid: {
    maxWidth: "100%",
  },
  swith: {
    display: "flex",
    justifyContent: "flex-end",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "16px",
  },
  graphText: {
    fontSize: "14px",
    lineHeight: "14px",
    paddingLeft: "16px",
    paddingTop: "16px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  boxImabalnceGraphic: {
    // width: "100%",
    // height: "100%",
  },
  boxMiddleTextCard: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "60px",
    paddingTop: "40px",
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  middleText: {
    wordWrap: "normal",
    fontSize: "18px",
    lineHeight: "23px",
    color: "#8C949E",
  },
}));

const OrangeSwitch = withStyles({
  switchBase: {
    color: "#818E9B",
    "&$checked": {
      color: "#F19E69",
    },
    "&$checked + $track": {
      backgroundColor: "#F19E69",
    },
  },
  checked: {},
  track: {},
})(Switch);

const IsPhantomicIncluded = (balance_index) => {
  return typeof phantomic_buildings[balance_index] === "undefined"
    ? false
    : true;
};
let emptyData = false;

const CreateImabalancePSK = ({
  balance_index,
  object,
  switchState,
  imbalanceData,
  imbalancePhantomData,
}) => {
  let year_2017 = {
    x: [],
    y: [],
    name: "2017",
    type: "bar",
    marker: {
      color: "#A9FF94",
    },
  };
  let year_2018 = {
    x: [],
    y: [],
    name: "2018",
    type: "bar",
    marker: {
      color: "#00EBD3",
    },
  };
  let year_2019 = {
    x: [],
    y: [],
    name: "2019",
    type: "bar",
    marker: {
      color: "#00CAFF",
    },
  };
  let year_2020 = {
    x: [],
    y: [],
    name: "2020",
    type: "bar",
    marker: {
      color: "#4A9CFF",
    },
  };

  if (switchState) {
    if (imbalancePhantomData.length > 0) {
      emptyData = false;
      imbalancePhantomData.map(function (item) {
        if (item.balance_id.toString() === balance_index.toString()) {
          if (item.year.toString() === "2017") {
            year_2017.x.push(item.month_rus);
            year_2017.y.push(item.imbalance_phantom_kwh);
          }
          if (item.year.toString() === "2018") {
            year_2018.x.push(item.month_rus);
            year_2018.y.push(item.imbalance_phantom_kwh);
          }
          if (item.year.toString() === "2019") {
            year_2019.x.push(item.month_rus);
            year_2019.y.push(item.imbalance_phantom_kwh);
          }

          if (item.year.toString() === "2020") {
            year_2020.x.push(item.month_rus);
            year_2020.y.push(item.imbalance_phantom_kwh);
          }
        }
        return item;
      });
    } else {
      emptyData = true;
    }
  } else {
    if (imbalanceData.length > 0) {
      emptyData = false;
      imbalanceData.map(function (item) {
        if (item.balance_id.toString() === balance_index.toString()) {
          if (item.year.toString() === "2017") {
            year_2017.x.push(item.month_rus);
            year_2017.y.push(item.imbalance_kwh);
          }
          if (item.year.toString() === "2018") {
            year_2018.x.push(item.month_rus);
            year_2018.y.push(item.imbalance_kwh);
          }
          if (item.year.toString() === "2019") {
            year_2019.x.push(item.month_rus);
            year_2019.y.push(item.imbalance_kwh);
          }

          if (item.year.toString() === "2020") {
            year_2020.x.push(item.month_rus);
            year_2020.y.push(item.imbalance_kwh);
          }
        }
        return item;
      });
    } else {
      emptyData = true;
    }
  }

  object.data.push(year_2017, year_2018, year_2019, year_2020);

  return emptyData
    ? [
        <InfoWindow label="Извините, недостаточно данных для расчета" icon="info" />,
      ]
    : [
        <Plot
          style={{ width: "100%", height: "500px" }}
          useResizeHandler
          data={object.data}
          layout={object.layout}
          config={object.config}
        />,
      ];
};

const ImbalancePskPu = () => {
  const [switchState, setState] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartPhantomData, setChartPhantomData] = useState([]);
  const { globalState } = useContext(Contex);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetResImbalanceFront/" + globalState.balance_index)
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
    }
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetImbalancePhantom/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            setChartPhantomData(result);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
  }, [globalState.balance_index]);

  const handleSwitchChange = (event) => {
    setState(event.target.checked);
  };

  var imbalance_psk_pu = {
    layout: {
      hoverinfo: "none",
      autosize: true,
      //title: "График небалансов между <br>показаниями ПСК и ПУ, в кВтч от ПУ",
      // width: 550,
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

  return globalState.balance_index !== "" && globalState.isClean
    ? [
        <>
          <Box className={classes.header}>
            <Typography className={classes.graphText}>
              График небалансов между показаниями гарантирующих поставщиков и
              ПУ, в кВтч
            </Typography>
            {IsPhantomicIncluded(globalState.balance_index) ? (
              <Box
                className={classes.swith}
                component="label"
                container
                alignItems="center"
                justify="flex-end"
                direction="row"
                spacing={1}
              >
                <Box item className={classes.switchLeftText}>
                  Без фантомных обьектов
                </Box>
                <Box item>
                  <OrangeSwitch
                    checked={switchState}
                    onChange={handleSwitchChange}
                    name="checkedA"
                  />
                </Box>
                <Grid item className={classes.switchRightText}>
                  Включая фантомные обьекты
                </Grid>
              </Box>
            ) : null}
          </Box>

          <Box>
            <CreateImabalancePSK
              balance_index={globalState.balance_index}
              object={imbalance_psk_pu}
              switchState={switchState}
              imbalanceData={chartData}
              imbalancePhantomData={chartPhantomData}
            />
          </Box>
        </>,
      ]
    : null;
};

export { ImbalancePskPu };
