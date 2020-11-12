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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Contex from "../store/context";
import clsx from "clsx";
// import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import InfoWindow from "./InfoWindow.js";
import icon_fiz from "../img/fiz_icon.svg";
import icon_urik from "../img/urik_icon.svg";
import icon_house from "../img/house_icon.svg";
import icon_mean from "../img/mean_icon.svg";
import icon_average from "../img/average_icon.svg";
import icon_interval from "../img/interval_icon.svg";
// const Plot = createPlotlyComponent(Plotly);.
import Plot from 'react-plotly.js'

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
    height: "186px",
    background: "rgba(140, 148, 158, 0.1)",
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  },
  chartLegendTextBox:{
    display: 'flex',
    alignItems: 'baseline'
  },
  chartLegendText:{
    color: '#818E9B',
    letterSpacing: '0.01em',
    lineHeight: '13px',
    fontSize: '11px',
  }
}));

var fiz_seppate = {
  layout: {
    autosize: true,
    title: {
      text: "",
    },
    barmode: "stack",
    shapes: [
      // Mean
      {
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
        },
        // Average
        {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                line: {
                    color: '#252F4A',
                    width: 2,
                }
            }]
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
    title: {
      text: "",
    },
    barmode: "stack",
    shapes: [
      // Mean
      {
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
        },
        // Average
        {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                line: {
                    color: '#252F4A',
                    width: 2,
                }
            }]
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
    title: {
      text: "",
    },
    barmode: "stack",
    shapes: [
      // Mean
      {
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
        },
        // Average
        {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                line: {
                    color: '#252F4A',
                    width: 2,
                }
            }]
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

const BottomSectionGS = () => {
  const [legalType, setLegalTyped] = useState("entity");
  const [outMonth, setOutMonth] = useState([]);
  const [averageAllData, setAverageAll] = useState([]);
  const [meanAndLimit, setMeanAndLimit] = useState([]);
  // const [inputMonth, setInputMonth] = useState([]);
  // const [year, setFilterYear] = useState('2020');
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
      api_url = "/api/PSK/GetLegalPSKData/1281/";
    } else if (legalType === "population") {
      api_url = "/api/DataCompare/GetFizTimeSeries/1281/";
    } else if (legalType === "utility") {
      api_url = "/api/PSK/GetCommonPSKData/1281/";
    }
    if (globalState.fiasId !== "" && api_url !== "") {
      fetch(api_url + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            setOutMonth(result);
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
    if(globalState.fiasId !== ''){
      fetch("/api/Results/GetFiasStatQuarter/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
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
                  <Checkbox
                    checked={mediana}
                    onChange={handleChange}
                    name="mediana"
                  />
                }
                label="Медиана"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={average}
                    onChange={handleChange}
                    name="average"
                    disabled
                  />
                }
                label="Среднее (в разработке)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={interval}
                    onChange={handleChange}
                    name="interval"
                    disabled
                  />
                }
                label="Межквартильный интервал (в разработке)"
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
        </Grid>,
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
/*type.data[0] is main data chart
  type.data[1] is mean
  type.data[2] is average*/

  let type = house_seppate;
  let empty_data = true;

  if (obj_name === "entity") {
    type = urik_seppate;
  }

  if (obj_name === "population") {
    type = fiz_seppate;
  }

let meanData = 3000;
const meanValue = '50%';

  if(checkBoxSelected.mediana){
    if(meanAndLimit.length > 0){
          for(let i = 0; i< meanAndLimit.length; i++){
            if(meanAndLimit[i].cons_type === obj_name){
              meanData =  meanAndLimit[i].[meanValue];
            }
          }
          type.layout.shapes[0].y0 = 3000;
          type.layout.shapes[0].x1 = 1;
          type.layout.shapes[0].y1 = 3000;
    }

  }else{
    type.layout.shapes[0].y0 = 0;
    type.layout.shapes[0].x1 = 0;
    type.layout.shapes[0].y1 = 0;
  }

  if(checkBoxSelected.average){
    if(average.length > 0){
      // console.log(average);
          // for(let i = 0; i< meanAndLimit.length; i++){
          //   if(meanAndLimit[i].cons_type === obj_name){
          //     meanData =  meanAndLimit[i].[meanValue];
          //   }
          // }
          // type.layout.shapes[0].y0 = 3000;
          // type.layout.shapes[0].x1 = 1;
          // type.layout.shapes[0].y1 = 3000;
    }

  }else{
    type.layout.shapes[1].y0 = 0;
    type.layout.shapes[1].x1 = 0;
    type.layout.shapes[1].y1 = 0;
  }
  if(checkBoxSelected.interval){

  }

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

  console.log(type.layout);

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

export { BottomSectionGS };
