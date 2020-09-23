import { Grid, Paper, Switch, Typography, Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js";
import React, { useContext, useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import clsx from "clsx";
import Contex from "../../store/context";
import full_res from "../../data/graphic/res_imbalance_front.json";
import full_res_phantom from "../../data/graphic/imbalance_phantom.json";
import phantomic_buildings from "../../data/balance_phantom_dict.json";

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

const CreateImabalancePSK = ({ balance_index, object, switchState }) => {
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
    full_res_phantom.map(function (item) {
      if (item.balance_id.toString() === balance_index.toString()) {
        if (item.year.toString() === "2017") {
          year_2017.x.push(item.month);
          year_2017.y.push(item.imbalance_phantom_kwh);
        }
        if (item.year.toString() === "2018") {
          year_2018.x.push(item.month);
          year_2018.y.push(item.out_phantom_kwh);
        }
        if (item.year.toString() === "2019") {
          year_2019.x.push(item.month);
          year_2019.y.push(item.out_phantom_kwh);
        }

        if (item.year.toString() === "2020") {
          year_2020.x.push(item.month);
          year_2020.y.push(item.out_phantom_kwh);
        }
      }
      return item;
    });
  } else {
    full_res.map(function (item) {
      if (item.balance_id.toString() === balance_index.toString()) {
        if (item.year.toString() === "2017") {
          year_2017.x.push(item.month);
          year_2017.y.push(item.imbalance_kwh);
        }
        if (item.year.toString() === "2018") {
          year_2018.x.push(item.month);
          year_2018.y.push(item.imbalance_kwh);
        }
        if (item.year.toString() === "2019") {
          year_2019.x.push(item.month);
          year_2019.y.push(item.imbalance_kwh);
        }

        if (item.year.toString() === "2020") {
          year_2020.x.push(item.month);
          year_2020.y.push(item.imbalance_kwh);
        }
      }
      return item;
    });
  }

  console.log(year_2019);

  object.data.push(year_2017, year_2018, year_2019, year_2020);

  return (
    <Plot data={object.data} layout={object.layout} config={object.config} />
  );
};

const ImbalancePskPu = () => {
  const [switchState, setState] = useState(false);
  const { globalState } = useContext(Contex);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleSwitchChange = (event) => {
    setState(event.target.checked);
  };

  var imbalance_psk_pu = {
    layout: {
      hoverinfo: "none",
      //title: "График небалансов между <br>показаниями ПСК и ПУ, в кВтч от ПУ",
      width: 550,
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
    },
  };

  return globalState.balance_index !== "" && globalState.isClean
    ? [
        <Grid item xs={12} md={6} lg={6} className={classes.pskGrid}>
          <Paper className={clsx(fixedHeightPaper, classes.paperStyles)}>
            <Box className={classes.header}>
              <Typography className={classes.graphText}>
                График небалансов между показаниями ПСК и ПУ, в кВтч
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

            <CreateImabalancePSK
              balance_index={globalState.balance_index}
              object={imbalance_psk_pu}
              switchState={switchState}
            />
          </Paper>
        </Grid>,
      ]
    : null;
};

export { ImbalancePskPu };
