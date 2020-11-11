import React from "react";
import {
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);
import InfoWindow from "./InfoWindow.js"

const useStyles = makeStyles((theme) => ({
  chartTitle: {
    fontSize: "12px",
    lineHeight: "14px",
    paddingTop: "30px",
    paddingLeft: "24px",
    color: "#252F4A",
  },

}));

const column_title_font = {
  size: 12,
  color: "#252F4A",
};

const BarChartTemplate = (props) => {
  const classes = useStyles();
  const empty_chart_label = "Извините, недостаточно данных для расчета " + props.title;
  let chart_color = '#00ebd3';
  let empty_data = true;

  // console.log(props.chart_data);

  if(props.chart_color !== 'undefined'){
    chart_color = props.chart_color;
  }

  var bar_chart_data_template = {
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


  if(props.chart_data.x !== 'undefined' && props.chart_data.y !== 'undefined' && props.chart_data.x.length > 0 && props.chart_data.y.length > 0 ){
    empty_data = false
    bar_chart_data_template.data[0].x = props.chart_data.x;
    bar_chart_data_template.data[0].y = props.chart_data.y;
  }else{
    empty_data = true;
  }

  console.log(bar_chart_data_template);

  return(empty_data ? [
    <InfoWindow label={empty_chart_label} icon="info" />,
  ] : [
    <Box>
              <Typography className={classes.chartTitle}>
                {props.title}
              </Typography>

              <Plot
                style={{ width: "100%", height: "100%" }}
                data={bar_chart_data_template.data}
                layout={bar_chart_data_template.layout}
                config={bar_chart_data_template.config}
              />
            </Box>
          ]);
};

export { BarChartTemplate };
