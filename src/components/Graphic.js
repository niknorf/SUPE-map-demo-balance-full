import React, { useContext } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import clsx from "clsx";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import indexes from "../data/graphic/indexes.json";
import full_res from "../data/graphic/res_imbalance_front.json";
import "../css/graphic.css";
import info_icon from "../img/info_icon.svg";
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
}));

const column_title_font = {
  size: 12,
  color: "#252F4A",
};

const GraphicGroup = () => {
  const [month, setMonth] = React.useState(7);
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const handleMonthChange = (event) => {
    console.log(event.target.value);
    setMonth(event.target.value);
  };

  /* Bar charts */
  var input_month = {
    layout: {
      autosize: true,
      title: {
        text:
          "График суммарных помесчных показаний согласно приборам учета, кВтч",
        font: column_title_font,
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
          "График суммарных помесячных показаний гарантирующих поставщиков, кВтч",
        font: column_title_font,
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
  var balance_group_tech_loss = {
    layout: {
      autosize: true,
      title: {
        text: "Технические потери на балансовой группе, кВтч",
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
      title: {
        text: "Передача показаний приборов технического учета, %",
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

  return (
    <>
      {(() => {
        if (globalState.isClean && globalState.balance_index !== "") {
          return (
            <>
              <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                <Paper elevation={1}>
                  <Box>
                    <Grid container>
                      <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
                        <DisplayBarChart
                          balance_index={globalState.balance_index}
                          type={input_month}
                          obj_name="input_month"
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
                        <DisplayBarChart
                          balance_index={globalState.balance_index}
                          type={out_psk_month}
                          obj_name="out_psk_month"
                        />
                      </Grid>
                    </Grid>
                    <Box align="center">
                      <Typography>2018 2019 2020</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                <Paper elevation={1}>
                  <Box>
                    <Grid container>
                      <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
                        <Box
                          style={{
                            height: "180px",
                            marginLeft: "100px",
                            marginBottom: "100px",
                            marginTop: "100px",
                            marginLeft: "100px",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Недостаточно данных для расчета технических потерь
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
                        <DisplayBarChart
                          balance_index={globalState.balance_index}
                          type={meter_avg}
                          obj_name="na_meter_avg"
                        />
                      </Grid>
                    </Grid>
                    <Box align="center">
                      <Typography>2018 2019 2020</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </>
          );
        }
      })()}
    </>
  );
};

const DisplayBarChart = ({ balance_index, type, obj_name }) => {
  full_res.map(function (item) {
    if (item.balance_id.toString() === balance_index.toString()) {
      type.data[0].x.push(item.month);
      type.data[0].y.push(item[obj_name]);
    }
    return type;
  });

  if (obj_name === "imbalance_kwh") {
    type.data = [];
    type.layout.title.text =
      "Недостаточно данных для расчета технических потерь";
  }

  return (
    <Plot
      style={{ width: "100%", height: "100%" }}
      useResizeHandler
      data={type.data}
      layout={type.layout}
      config={type.config}
    />
  );
};

export { GraphicGroup };
