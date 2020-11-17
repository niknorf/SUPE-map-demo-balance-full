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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import clsx from "clsx";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import indexesFile from "../data/graphic/indexes.json";
import full_res from "../data/graphic/res_imbalance_front.json";
import "../css/graphic.css";
import info_icon from "../img/info_icon.svg";
const Plot = createPlotlyComponent(Plotly);

const useStyles = makeStyles((theme) => ({
  formControl: {
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
  },
  textPadding: {
    paddingLeft: "24px",
    paddingTop: "26px",
  },

  textStyle: {
    // position: "relative",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#252F4A",
  },

  selectPadding: {
    paddingRight: "24px",
    paddingTop: "26px",
  },
  paddingsCardBox: {
    paddingLeft: "24px",
    paddingRight: "24px",
    // paddingTop: "26px",
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
    // marginTop: theme.spacing(2.5),
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

const JustificationCards = () => {
  const [indexesData, setIndexes] = useState({});
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const emptyIndexes = {
    date_month: null,
    date_year: null,
    percent_transmission_pu: null,
    index_compliance_forecast_percent_unbalance: null,
    trust_index_psk_fiz: null,
    trust_index_psk_odn: null,
    trust_index_psk_urik: null,
  };

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetResultIndexes/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result === undefined || result.length === 0) {
              setIndexes(emptyIndexes);
            } else {
              setIndexes(result[0]);
            }

          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
  }, [globalState.balance_index]);

  return (
    <div>
      {(() => {
        if (globalState.isClean && globalState.balance_index !== "") {
          return (
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                <Box className={classes.formControlBox}>
                  <Box className={classes.textPadding}>
                    <Typography className={classes.textStyle}>
                      Обоснование
                    </Typography>
                  </Box>
                  <Box className={classes.selectPadding}>
                    <Typography className={classes.textStyle}>
                      Значения за: {indexesData.date_month}.{indexesData.date_year}
                    </Typography>
                    {/* <FormControl className={classes.formControl}>
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
                    {/* <MenuItem value={7}>Июль</MenuItem> */}
                    {/* <MenuItem value={8}>Август</MenuItem>
                            <MenuItem value={9}>Сентябрь</MenuItem> */}
                    {/* </Select> */}
                    {/* </FormControl> */}
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                <Box className={classes.paddingsCardBox}>
                  <DisplayPieChart
                    month={7}
                    balance_index={globalState.balance_index}
                    indexes={indexesData}
                  />
                </Box>
              </Grid>
            </Grid>
          );
        }
      })()}
    </div>
  );
};

const DisplayPieChart = ({ month, balance_index, indexes }) => {
  const classes = useStyles();

  /*TODO to remove*/
  // let value = indexesFile.map((item) => {
  //   if (
  //     item.balance_id.toString() === balance_index.toString() &&
  //     item.date_year === 2020 &&
  //     item.date_month === month
  //   ) {
  //     return item;
  //   }
  // });
  //
  // value = value.filter((obj) => {
  //   return typeof obj !== "undefined";
  // });
  //
  // value = typeof value[0] !== "undefined" ? value[0] : {};

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
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    letterSpacing: "0.01em",
    width: 168,
    display: "inline-block",
    wordWrap: "break-word",
    marginTop: "74px",
  };

  const boxStyle = (value, compare, sign) => {
    let condition = Math.abs(parseInt(value)) > compare;
    if (sign === "<") {
      condition = Math.abs(parseInt(value)) < compare;
    }

    if (typeof value === "undefined" || value === 0 || value === null) {
      return boxGreyStyle;
    } else if (condition) {
      return boxRedStyle;
    } else {
      return boxGreenStyle;
    }
  };

  const textStyle = (value, compare, sign) => {
    let condition = Math.abs(parseInt(value)) > compare;
    if (sign === "<") {
      condition = Math.abs(parseInt(value)) < compare;
    }

    if (typeof value === "undefined" || value === 0 || value === null) {
      return textGreyStyle;
    } else if (condition) {
      return textRedStyle;
    } else {
      return textGreenStyle;
    }
  };

  const textValue = (value) => {
    if (typeof value === "undefined" || value === 0 || value === null) {
      return "Данные для расчета показателя обновляются";
    } else {
      return value + "%";
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
        <Box
          className={`${classes.boxStyle}`}
          style={boxStyle(indexes.percent_transmission_pu, 80, "<")}
        >
          <Typography className={classes.boxTopText}>
            Процент передачи показаний приборов технического учета за месяц
          </Typography>

          <Typography
            style={textStyle(indexes.percent_transmission_pu, 80, "<")}
            className={classes.boxMiddleText}
          >
            {textValue(indexes.percent_transmission_pu)}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
        <Box
          className={classes.boxStyle}
          style={boxStyle(
            indexes.index_compliance_forecast_percent_unbalance,
            30
          )}
        >
          <Typography className={classes.boxTopText}>
            Процент несоответствия предиктивного и фактического небалансов
          </Typography>
          <Typography
            className={classes.boxMiddleText}
            style={textStyle(
              indexes.index_compliance_forecast_percent_unbalance,
              30
            )}
          >
            {textValue(indexes.index_compliance_forecast_percent_unbalance)}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
        <Box
          className={classes.boxStyle}
          style={boxStyle(indexes.trust_index_psk_fiz, 20)}
        >
          <Typography className={classes.boxTopText}>
            Индекс несоответствия показаний физических лиц гарантирующих
            поставщиков
          </Typography>
          <Typography
            className={classes.boxMiddleText}
            style={textStyle(indexes.trust_index_psk_fiz, 20)}
          >
            {textValue(indexes.trust_index_psk_fiz)}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
        <Box className={classes.boxStyle} style={boxStyle(indexes.trust_index_psk_urik)}>
          <Typography className={classes.boxTopText}>
            Индекс несоответствия показаний юридических лиц гарантирующих
            поставщиков
          </Typography>
          <Typography className={classes.boxMiddleText} style={textStyle(indexes.trust_index_psk_urik)}>
            {textValue(indexes.trust_index_psk_urik)}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xl={3} xs={12}>
        <Box
          className={classes.boxStyle}
          style={boxStyle(indexes.trust_index_psk_odn, 20)}
        >
          <Typography className={classes.boxTopText}>
            Индекс несоответствия показаний общедомовых нужд гарантирующих
            поставщиков
          </Typography>
          <Typography
            className={classes.boxMiddleText}
            style={textStyle(indexes.trust_index_psk_odn, 20)}
          >
            {textValue(indexes.trust_index_psk_odn)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export { JustificationCards };
