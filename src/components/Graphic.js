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
  Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import clsx from "clsx";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import indexes from "../data/graphic/indexes.json";
import full_res from "../data/graphic/full_res_imbalance.json";
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
    display:'inline-block',
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
  imageIcon:{
    width: 13.33,
    height: 13.33,
  }
}));

const column_title_font = {
  size: 12,
  color: "#252F4A",
};

const GraphicGroup = () => {
  const [month, setMonth] = React.useState(7);
  const {globalState } = useContext(Contex);
  const classes = useStyles();

  const handleMonthChange = (event) => {
    console.log(event.target.value);
    setMonth(event.target.value);
  };

  /* Bar charts */
  var input_month = {
    layout: {
      width: 550,
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
    },
  };
  var out_psk_month = {
    layout: {
      width: 550,
      title: {
        text: "График суммарных помесчных показаний от ПСК, кВтч",
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
    },
  };
  var balance_group_tech_loss = {
    layout: {
      width: 550,
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
    },
  };
  var meter_avg = {
    layout: {
      width: 550,
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
    },
  };

  return (
    <div>
      {(() => {
        if (globalState.isClean && globalState.balance_index !== "") {
          return (
            <Container className={classes.bigContainer}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={12} lg={12}>
                  <Paper className={classes.chartsPaper}>
                    <Box className={classes.formControlBox}>
                      <Typography className={classes.reasonText}>
                        Обоснование
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-label">
                          Месяц
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={month}
                          onChange={handleMonthChange}
                        >
                          {/* <MenuItem value={5}>Май</MenuItem>
                          <MenuItem value={6}>Июнь</MenuItem> */}
                          <MenuItem value={7}>Июль</MenuItem>
                          {/* <MenuItem value={8}>Август</MenuItem>
                          <MenuItem value={9}>Сентябрь</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className={classes.chartsContainer}>
                      <DisplayPieChart
                        month={month}
                        balance_index={globalState.balance_index}
                      />
                      {/* <DisplayPieChart month={month} balance_index={globalState.balance_index} type={difference_percent} obj_name='index_compliance_forecast_present_unbalance' /> */}
                      {/* <DisplayPieChart month={month} balance_index={globalState.balance_index} type={person_trust_index} obj_name='trust_index_PSK_fiz' /> */}
                      {/* <DisplayPieChart month={month} balance_index={globalState.balance_index} type={house_trust_index} obj_name='trust_index_PSK_ODN' /> */}
                      {/* <DisplayPieChart month={month} balance_index={globalState.balance_index} type={compnay_trust_index} obj_name='trust_index_PSK_urik' /> */}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} md={12} lg={12}>
                  <Paper className={classes.barPaper}>
                    <DisplayBarChart
                      balance_index={globalState.balance_index}
                      type={input_month}
                      obj_name="input_month"
                    />
                    <DisplayBarChart
                      balance_index={globalState.balance_index}
                      type={out_psk_month}
                      obj_name="out_psk_month"
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} md={12} lg={12}>
                  <Paper
                    className={clsx(classes.barPaper, classes.lastBlockPaper)}
                  >
                    <DisplayBarChart
                      balance_index={globalState.balance_index}
                      type={balance_group_tech_loss}
                      obj_name="imbalance_kwh"
                    />
                    <DisplayBarChart
                      balance_index={globalState.balance_index}
                      type={meter_avg}
                      obj_name="na_meter_avg"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          );
        }
      })()}
    </div>
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

  if (obj_name === 'imbalance_kwh'){
    type.data = [];
    type.layout.title.text = "Недостаточно данных для расчета технических потерь";
  }

  return (<Plot
    data={type.data}
    layout={type.layout}
    config={type.config}
  />)
};

const DisplayPieChart = ({ month, balance_index }) => {
  const classes = useStyles();
  let value = indexes.map((item) => {
    if (
      item.balance_id.toString() === balance_index.toString() &&
      item.date_year === 2020 &&
      item.date_month === month
    ) {
      return item;
    }
  });

  value = value.filter((obj) => {
    return typeof obj !== "undefined";
  });


  let boxRedStyle = {
    background: "rgba(222, 32, 19, 0.1)",
  };

  let boxGreenStyle = {
    background: "rgba(96, 200, 125, 0.1)",
  };

  let boxGreyStyle = {
    background: "rgba(140, 148, 158, 0.1)",
    color: "#8C949E",
  };

  let textRedStyle = {
    color: "#D33126",
    marginTop: "74px",
  };

  let textGreenStyle = {
    color: "#21BA49",
    marginTop: "74px",
  };

  let textGreyStyle = {
    color: "#8C949E",
    fontFamily: 'PF Din Text Cond Pro',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.01em',
    width: 168,
    display:'inline-block',
    wordWrap: "break-word",
    marginTop: "74px",
  };

  const boxStyle = (value) => {
    if (typeof value === "undefined" || value === "" || !value) {
      return boxGreyStyle;
    } else if (parseInt(value) > 50 || parseInt(value) < 0) {
      return boxRedStyle;
    }else{
      return boxGreenStyle;
    }
  };

  const textStyle = (value) => {
    if (typeof value === "undefined" || value === 0 || value === null) {
      return textGreyStyle;
    } else if (parseInt(value) > 50 || parseInt(value) < 0) {
      return textRedStyle;
    }else{
      return textGreenStyle;
    }
  };

  const textValue = (value) => {
    console.log(value);
    if (typeof value === "undefined" || value === 0 || value === null) {
      return 'Данные для расчета показателя обновляются';
    } else {
      return value + '%';
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item>
        <Box
          className={`${classes.boxStyle}`}
          style={boxStyle(value[0].percent_transmission_PU)}
        >
          <Typography className={classes.boxTopText}>
            Процент передачи показаний приборов технического учета за месяц
          </Typography>
          {/* <Icon classes={classes.boxTopIcon }>
            <img className={classes.imageIcon} src={info_icon} alt="" />
          </Icon> */}
          <Typography
            style={textStyle(value[0].percent_transmission_PU)}
            className={classes.boxMiddleText} >
            {textValue(value[0].percent_transmission_PU)}
          </Typography>
        </Box>
      </Grid>
      <Grid item >
        <Box className={classes.boxStyle}
          style={boxStyle(value[0].index_compliance_forecast_present_unbalance)}>
          <Typography className={classes.boxTopText}>
            Процент соответствия предиктивного и фактического небалансов
          </Typography>
          {/* <Icon classes={classes.boxTopIcon }>
            <img className={classes.imageIcon} src={info_icon} alt="" />
          </Icon> */}
          <Typography className={classes.boxMiddleText}
            style={textStyle(value[0].index_compliance_forecast_present_unbalance)}>
            {textValue(value[0].index_compliance_forecast_present_unbalance)}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box className={classes.boxStyle}
          style={boxStyle(value[0].trust_index_PSK_fiz)}>
          <Typography className={classes.boxTopText}>
            Индекс доверия показаниям физических лиц в ПСК
          </Typography>
          {/* <Icon classes={classes.boxTopIcon }>
            <img className={classes.imageIcon} src={info_icon} alt="" />
          </Icon> */}
          <Typography className={classes.boxMiddleText}
            style={textStyle(value[0].trust_index_PSK_fiz)}>
            {textValue(value[0].trust_index_PSK_fiz)}
          </Typography>
        </Box>
      </Grid>
      <Grid item >
        <Box className={classes.boxStyle}
          style={boxStyle(value[0].trust_index_PSK_fiz)}>
          <Typography className={classes.boxTopText}>
            Индекс доверия показаниям физических лиц в ПСК
          </Typography>
          {/* <Icon classes={classes.boxTopIcon }>
            <img className={classes.imageIcon} src={info_icon} alt="" />
          </Icon> */}
          <Typography className={classes.boxMiddleText}
            style={textStyle(value[0].trust_index_PSK_fiz)}>
            {textValue(value[0].trust_index_PSK_fiz)}
          </Typography>
        </Box>
      </Grid>
      <Grid item >
        <Box className={classes.boxStyle}
          style={boxStyle(value[0].trust_index_PSK_ODN)}>
          <Typography className={classes.boxTopText}>
            Индекс доверия показаниям общедомовых нужд в ПСК
          </Typography>
          {/* <Icon classes={classes.boxTopIcon }>
            <img className={classes.imageIcon} src={info_icon} alt="" />
          </Icon> */}
          <Typography className={classes.boxMiddleText}
            style={textStyle(value[0].trust_index_PSK_ODN)}>
            {textValue(value[0].trust_index_PSK_ODN)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export { GraphicGroup };
