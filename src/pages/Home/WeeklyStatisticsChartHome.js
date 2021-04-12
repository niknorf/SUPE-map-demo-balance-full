import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Plotly from "plotly.js";
import React, { useState, useEffect } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import InfoWindow from "components/InfoWindow.js";
import ServicesHome from "pages/Home/api/ServicesHome";
const Plot = createPlotlyComponent(Plotly);
const useStyles = makeStyles((theme) => ({}));

const CreateMainHomeChart = ({ dataObject, object }) => {
  let emptyData = true;
  let line_chart = {
    x: [],
    y: [],
    mode: "lines",
    line: { shape: "spline" },
    type: "scatter",
    line: {
      color: "#00EBD3",
      width: 3,
    },
  };

  console.log(dataObject);

  if (dataObject.length > 0) {
    emptyData = false;
    for (let i = 0; i < dataObject.length; i++) {
      // line_chart.x.push(dataObject[i].startWeek);
      line_chart.x.push(dataObject[i].endWeek);
      line_chart.y.push(dataObject[i].count);
    }
  } else {
    emptyData = true;
  }

  // line_chart.x.push();

  object.data.push(line_chart);

  return emptyData
    ? [
        <InfoWindow
          label="Извините, недостаточно данных для расчета"
          icon="info"
        />,
      ]
    : [
        <Plot
          key="weekly-statistics-chart-home"
          style={{ width: "100%", height: "500px" }}
          useResizeHandler
          data={object.data}
          layout={object.layout}
          config={object.config}
        />,
      ];
};

const MainChartHome = () => {
  const [chartData, setChartData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    ServicesHome.getWeekStatistic()
      .then((result) => {
        setChartData(result);
      })
      .catch((error) => {});
  }, []);

  var main_home_chart = {
    layout: {
      hoverinfo: "none",
      autosize: true,
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

  return (
    <>
      <Box>
        <CreateMainHomeChart dataObject={chartData} object={main_home_chart} />
      </Box>
    </>
  );
};

export { MainChartHome };
