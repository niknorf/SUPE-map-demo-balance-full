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
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import Plotly from "plotly.js";
import clsx from "clsx";
import createPlotlyComponent from "react-plotly.js/factory";
import InfoWindow from "./InfoWindow.js";
import icon_fiz from "../img/fiz_icon.svg";
import icon_urik from "../img/urik_icon.svg";
import icon_house from "../img/house_icon.svg";
import icon_mean from "../img/mean_icon.svg";
import icon_average from "../img/average_icon.svg";
import icon_area from "../img/area_icon.svg";
import icon_interval from "../img/interval_icon.svg";
import localeRu from "plotly.js-locales/ru";
import LoadingOverlay from "react-loading-overlay";
const Plot = createPlotlyComponent(Plotly);

Plotly.register(localeRu);
Plotly.setPlotConfig({ locale: "ru" });

const GreyCheckbox = withStyles({
  root: {
    color: "#252F4A",
    '&$checked': {
      color: "#252F4A",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const useStyles = makeStyles((theme) => ({

  chartTitle: {
    fontSize: "14px",
    lineHeight: "14px",
    paddingTop: "30px",
    paddingLeft: "35px",
    color: "#252F4A",
  },
  imageIcon:{
    width: 10,
    height: 10,
  },
  balanceGroupLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
  },
  boxPaddingLabel: {
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  },
  boxChartLegend: {
    width: "222px",
    height: "200px",
    background: "rgba(140, 148, 158, 0.1)",
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  },
  chartLegendTextBox:{
    display: 'flex',
    alignItems: 'flex-end'

  },
  chartLegendText:{
    color: '#818E9B',
    letterSpacing: '0.01em',
    lineHeight: '13px',
    fontSize: '11px',
  }
}));

const BottomSectionGS = () => {
  const [legalType, setLegalTyped] = useState("entity");
  const [outMonth, setOutMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageAllData, setAverageAll] = useState([]);
  const [meanAndLimit, setMeanAndLimit] = useState([]);
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const [state, setState] = useState({
    mediana: false,
    average: false,
    interval: false,
  });

  const { mediana, average, interval } = state;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleDropDownChange = (event) => {
    setLegalTyped(event.target.value);
  };

  useEffect(() => {
    let api_url = "";
    if (legalType === "entity") {
      api_url = "/api/PSK/GetLegalPSKData/1281/" + globalState.fiasId;
    } else if (legalType === "population") {
      api_url = "/api/DataCompare/GetFizTimeSeries/1281/" + globalState.fiasId;
    } else if (legalType === "utility" + globalState.fiasId) {
      api_url = "/api/PSK/GetCommonPSKData/1281/" + globalState.fiasId;
    }
    if (globalState.fiasId !== "" && api_url !== "") {
      setLoading(true);
      fetch(api_url)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setOutMonth(result);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
    if(globalState.fiasId !== ''){
      setLoading(true);
      fetch("/api/Results/GetFiasStatQuarter/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(false);
            setAverageAll(result);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );

        fetch("/api/Results/GetFiasPskStat/" + globalState.fiasId)
          .then((res) => res.json())
          .then(
            (result) => {
              setLoading(false);
              setMeanAndLimit(result);
            },
            (error) => {
              // setLoading(true);
              // setError(error);
            }
          );
    }

  }, [legalType, globalState.fiasId]);

  return globalState.fiasId !== ""
    ? [
      <LoadingOverlay
        active={loading}
        spinner={<CircularProgress style={{ color: "#252F4A" }} />}
        text=""
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(34, 47, 74, 0.3)",
          }),
        }}
      >
        <Grid container>
          <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
            <Box className={classes.boxPaddingLabel}>
              <Typography className={classes.balanceGroupLabel}>
                Анализ
              </Typography>
            </Box>
            <Box className={classes.boxPaddingLabel}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Тип абонента
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={legalType}
                  onChange={handleDropDownChange}
                >
                  <MenuItem value="entity">Юридические лица</MenuItem>
                  <MenuItem value="population">Физические лица</MenuItem>
                  <MenuItem value="utility">Общедомовые нужды</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormGroup className={classes.boxPaddingLabel}>
              <FormControlLabel
                control={
                  <GreyCheckbox
                    checked={mediana}
                    onChange={handleChange}
                    name="mediana"
                    iconStyle={{fill: 'white'}}
                  />
                }
                label="Медиана"
              />
              <FormControlLabel
                control={
                  <GreyCheckbox
                    checked={average}
                    onChange={handleChange}
                    name="average"
                    iconStyle={{fill: 'white'}}
                  />
                }
                label="Среднее"
              />
              <FormControlLabel
                control={
                  <GreyCheckbox
                    checked={interval}
                    onChange={handleChange}
                    name="interval"
                    iconStyle={{fill: 'white'}}
                  />
                }
                label="Межквартильный интервал"
              />
            </FormGroup>
            <Box className={classes.boxPaddingLabel}>
              <Box className={classes.boxChartLegend}>
                <Typography className={classes.balanceGroupLabel}>
                  Обоснование
                </Typography>
                <Box className={classes.chartLegendTextBox}>
                  <Icon>
                    <img className={classes.imageIcon} src={icon_fiz} alt="" />
                  </Icon>
                  <Typography className={classes.chartLegendText}>
                    Физ.лица
                  </Typography>
                </Box>
                  <Box className={classes.chartLegendTextBox}>
                  <Icon>
                  <img className={classes.imageIcon} src={icon_urik} alt="" />
                </Icon>
                <Typography className={classes.chartLegendText}>
                  Юр.лица
                </Typography>
            </Box>
              <Box className={classes.chartLegendTextBox}>
                <Icon>
                  <img className={classes.imageIcon} src={icon_house} alt="" />
                </Icon>
                <Typography className={classes.chartLegendText}>
                  Общедомовые нужды
                </Typography>
              </Box>
                <Box className={classes.chartLegendTextBox}>
                  <Icon>
                  <img className={classes.imageIcon} src={icon_mean} alt="" />
                </Icon>
                <Typography className={classes.chartLegendText}>
                Медиана
                </Typography>
              </Box>
                <Box className={classes.chartLegendTextBox}>
                  <Icon>
                  <img className={classes.imageIcon} src={icon_average} alt="" />
                </Icon>
                <Typography className={classes.chartLegendText}>
                  Среднее
                </Typography>
              </Box>
              <Box className={classes.chartLegendTextBox}>
                <Icon>
                <img className={classes.imageIcon} src={icon_area} alt="" />
              </Icon>
              <Typography className={classes.chartLegendText}>
                Межквартильный интервал
              </Typography>
            </Box>

              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
            <Box>
              <Typography className={classes.chartTitle}>
                График суммарных показаний по дому согласно статистике
                гарантирующих поставщиков , кВтч
              </Typography>
              <DisplayBarChart obj_name={legalType}
                resultData={outMonth}
                average={averageAllData}
                meanAndLimit={meanAndLimit}
                checkBoxSelected={state}
               />
            </Box>
          </Grid>
        </Grid>
        </LoadingOverlay>,
      ]
    :
      null
        // <InfoWindow
        //   label="Извините, недостаточно данных для расчета "
        //   icon="info"
        // />,
      ;
};

const DisplayBarChart = ({ obj_name, resultData, average, meanAndLimit, checkBoxSelected }) => {
  var fiz_seppate = {
    layout: {
      autosize: true,
      font: {
            family: "Roboto",
            size: 12,
            color: "#A3A3A3",
          },
      showlegend: false,
      barmode: "stack",
      shapes: []
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#4A9CFF" },
        type: "bar",
      }

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
  var urik_seppate = {
    layout: {
      autosize: true,
      font: {
            family: "Roboto",
            size: 12,
            color: "#A3A3A3",
          },
      showlegend: false,
      barmode: "stack",
      legend: {x: 0.4, y: 1.2},
      shapes: []
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#00EBD3" },
        type: "bar",
      }
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
  var house_seppate = {
    layout: {
      autosize: true,
      font: {
            family: "Roboto",
            size: 12,
            color: "#A3A3A3",
          },
      showlegend: false,
      barmode: "stack",
      shapes: []
    },
    data: [
      {
        x: [],
        y: [],
        marker: { color: "#A9FF94" },
        type: "bar",
      }
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

  let type = house_seppate;
  let empty_data = true;
  let quarte1Start = '2020-01-01';
  let quarte1End = '2020-03-31';
  let quarte2Start = '2020-04-01';
  let quarte2End = '2020-06-30';
  let quarte3Start = '2020-07-01';
  let quarte3End = '2020-09-30';
  let quarte4Start = '2020-10-01';
  let quarte4End = '2020-12-31';
  let averageTrace = {
    x:[],
    y:[],
    mode: 'lines',
    line: {
        color: '#252F4A',
        width: 2
      }
  };
  let meanTrace =  {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0,
        line: {
            color: '#EC4141',
            width: 2,
        }
    };
  let quaterInterval = {

            type: 'rect',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            fillcolor: 'rgba(74, 156, 255, 0.2)',
            line: {
            width: 1,
            color: '#4A9CFF',
        }

  };

  if (obj_name === "entity") {
    type = urik_seppate;
  }

  if (obj_name === "population") {
    type = fiz_seppate;
  }


let meanData = 0;
const meanValue = '50%';

  if(checkBoxSelected.mediana){
    if(meanAndLimit.length > 0){
          for(let i = 0; i< meanAndLimit.length; i++){
            if(meanAndLimit[i].cons_type === obj_name){
              meanData =  meanAndLimit[i].[meanValue];
            }
          }
          meanTrace.y0 = meanData;
          meanTrace.x1 = 1;
          meanTrace.y1 = meanData;

          type.layout.shapes.push(meanTrace)
    }

  }else{
      type.layout.shapes.push({
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            line: {
                color: '#EC4141',
                width: 2,
            }
        });
  }

  if(checkBoxSelected.average){
    if(average.length > 0){
      for(let i=0; i<average.length; i++){
        if(average[i].psk_type === obj_name){
          if(average[i].quarter === 1){
            averageTrace.x.push(quarte1Start);
            averageTrace.x.push(quarte1End);
            averageTrace.y.push(average[i].mean);
            averageTrace.y.push(average[i].mean);
          }
          if(average[i].quarter === 2){
            averageTrace.x.push(quarte2Start);
            averageTrace.x.push(quarte2End);

            averageTrace.y.push(average[i].mean);
            averageTrace.y.push(average[i].mean);
          }
          if(average[i].quarter === 3){
            averageTrace.x.push(quarte3Start);
            averageTrace.x.push(quarte3End);
            averageTrace.y.push(average[i].mean);
            averageTrace.y.push(average[i].mean);
          }
          if(average[i].quarter === 4){
            averageTrace.x.push(quarte4Start);
            averageTrace.x.push(quarte4End);
            averageTrace.y.push(average[i].mean);
            averageTrace.y.push(average[i].mean);
          }
        }
      }
      type.data.push(averageTrace);
    }
  }else{
    type.data.push({
      x:[],
      y:[],
      mode: 'lines',
      line: {
          color: '#252F4A',
          width: 2
        }
    })
  }

  if(checkBoxSelected.interval){
    let upper_limit = 0;
    let lower_limit =  0;
    if(meanAndLimit.length > 0){
          for(let i = 0; i< meanAndLimit.length; i++){
            if(meanAndLimit[i].cons_type === obj_name){
              upper_limit =  meanAndLimit[i].upper_limit;
              lower_limit =  meanAndLimit[i].lower_limit;
            }
          }
          quaterInterval.y0 = upper_limit;
          quaterInterval.x1 = 1;
        quaterInterval.y1 = lower_limit;
    }

    type.layout.shapes.push(quaterInterval);
  }else{
      type.layout.shapes.push({

                type: 'rect',
                xref: 'paper',
                yref: 'y',
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                fillcolor: 'rgba(74, 156, 255, 0.2)',
                line: {
                width: 1,
                color: '#4A9CFF',
            }

      });
  }


  //Main chart
  if (resultData.length > 0) {
    empty_data = false;
    for (let i = 0; i < resultData.length; i++) {
      type.data[0].x.push(resultData[i].datetime);
      type.data[0].y.push(resultData[i].value);
    }
  } else {
    empty_data = true;
    type.data[0].x = [];
    type.data[0].y = [];
  }

  // console.log(type.layout);

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
          data={type.data}
          layout={type.layout}
          config={type.config}
        />,
      ];
};

export { BottomSectionGS };
