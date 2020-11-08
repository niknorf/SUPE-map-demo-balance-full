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
  FormControlLabel
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
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
  boxChartLegend:{
    width: '222px',
    height: '186px',
    background: 'rgba(140, 148, 158, 0.1)',
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  }
}));

const column_title_font = {
  size: 12,
  color: "#252F4A",
};

var out_psk_month = {
  layout: {
    autosize: true,
    title: {
      text:
        "График показаний по дому согласно статистике гарантирующих поставщиков, кВтч",
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
    // modeBarButtonsToRemove: [
    //   "pan2d",
    //   "select2d",
    //   "lasso2d",
    //   "resetScale2d",
    //   "toggleSpikelines",
    //   "hoverClosestCartesian",
    //   "hoverCompareCartesian",
    // ],
    displayModeBar: false,

    displaylogo: false,
    responsive: true,
  },
};


const BottomSectionGS = () => {
  const [month, setMonth] = useState(7);
  const [outMonth, setOutMonth] = useState([]);
  const [inputMonth, setInputMonth] = useState([]);
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
  // const handleYearChange = (event, value) => {
  //   console.log(value);
  //     setFilterYear(value);
  // };
/*TODO add year filter*/
  useEffect(() => {
  //   if (globalState.balance_index !== "") {
  //     fetch(
  //       "/api/Results/GetResImbalanceFrontOutMonth/" + globalState.balance_index
  //     )
  //       .then((res) => res.json())
  //       .then(
  //         (result) => {
  //           setOutMonth(result);
  //         },
  //         (error) => {
  //           // setLoading(true);
  //           // setError(error);
  //         }
  //       );
  //
  //       fetch(
  //         "/api/Results/GetResImbalanceFrontInputMonth/" + globalState.balance_index
  //       )
  //         .then((res) => res.json())
  //         .then(
  //           (result) => {
  //             setInputMonth(result);
  //           },
  //           (error) => {
  //             // setLoading(true);
  //             // setError(error);
  //           }
  //         );
  //   }
  }, [globalState.balance_index]);

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
      // modeBarButtonsToRemove: [
      //   "pan2d",
      //   "select2d",
      //   "lasso2d",
      //   "resetScale2d",
      //   "toggleSpikelines",
      //   "hoverClosestCartesian",
      //   "hoverCompareCartesian",
      // ],
      displayModeBar: false,
      displaylogo: false,
      responsive: true,
    },
  };


  return globalState.fiasId === ""
    ? [
        <Grid container>
          <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
            <Box className={classes.boxPaddingLabel}>
              <Typography className={classes.balanceGroupLabel}>
                Анализ
              </Typography>
              <FormControl fullWidth>
                <Autocomplete
                  id="analys_dropdown"
                  options={["Юридические лица", "Физические лица", "Общедомовые нужды"]}
                  // getOptionLabel={(option) => option.ts_name}
                  // onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Тип абонента"
                      margin="normal"
                      placeholder="Выберете из списка"
                    />
                  )}
                />
              </FormControl>
            </Box>
            <FormGroup className={classes.boxPaddingLabel}>
              <FormControlLabel
                control={<Checkbox checked={mediana} onChange={handleChange} name="mediana" />}
                label="Медиана"
              />
              <FormControlLabel
                control={<Checkbox checked={average} onChange={handleChange} name="average" />}
                label="Среднее"
              />
              <FormControlLabel
                control={<Checkbox checked={interval} onChange={handleChange} name="interval" />}
                label="Межквартильный интервал"
              />
            </FormGroup>
            <Box className={classes.boxPaddingLabel}>
              <Box className={classes.boxChartLegend}>
                <Typography className={classes.balanceGroupLabel}>
                  Обоснование
                </Typography>
              </Box>
            </Box>



          </Grid>
          <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
            <Box>
              <DisplayBarChart
                balance_index={globalState.balance_index}
                type={out_psk_month}
                obj_name="out_month"
                resultData={[]}
              />
            </Box>

          </Grid>
        </Grid>

      ]
    : null;
};



const DisplayBarChart = ({ balance_index, type, obj_name, resultData }) => {

    if (resultData.length > 0) {
      for (let i = 0; i < resultData.length; i++) {
        if(resultData[i].year === 2019){
          type.data[0].x.push(resultData[i].month_rus);
          type.data[0].y.push(resultData[i].[obj_name]);
        }
      }
    }

  return (
    <Plot
      style={{ width: "100%", height: "100%" }}
      // useResizeHandler
      data={type.data}
      layout={type.layout}
      config={type.config}
    />
  );
};

export { BottomSectionGS };
