import Icon from "@mui/material/Icon";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const data = [
  [1650059071668, 22],
  [1650059072668, 27],
  [1650059073668, 32],
  [1650059074668, 7],
  [1650059075668, 10],
  [1650059076668, 12],
  [1650059077668, 15],
  [1650059078668, 14],
  [1650059079668, 24],
  [1650059081668, 22],
  [1650059082668, 27],
  [1650059083668, 32],
  [1650059084668, 7],
  [1650059085668, 10],
  [1650059086668, 12],
  [1650059087668, 15],
  [1650059088668, 14],
  [1650059089668, 24],
];
let chartOptionsInitial = {
  credits: {
    enabled: false,
  },
  chart: {
    renderTo: "container",
    defaultSeriesType: "line",
    backgroundColor: "rgba(0,0,0,0)",
  },
  title: {
    text: "",
  },
  xAxis: {
    type: "datetime",
    labels: {
      style: {
        color: "#d4d2d2",
      },
    },
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      style: {
        color: "#d4d2d2",
        font: "11px Trebuchet MS, Verdana, sans-serif",
      },
    },
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },
  series: [
    {
      name: "",
      data: data,
      color: "#e14eca",
    },
  ],
  legend: {
    itemStyle: {
      color: "#d4d2d2",
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};
let chartColor = "#6d1b7b";

export default function Rtnumberchart({ config }) {
  const [nowTime, setNowTime] = useState(0);
  const [time, setTime] = useState(0);
  const [chartOptions, setChartOptions] = useState(chartOptionsInitial);

  useEffect(() => {
    setTime(Date.now());
    getNow();
    if (config.color === "success") chartColor = "#357a38";
    else if (config.color === "warning") chartColor = "#b26a00";
    else if (config.color === "error") chartColor = "#aa2e25";
    else if (config.color === "info") chartColor = "#1c54b2";
    else if (config.color === "primary") chartColor = "#6d1b7b";
    else if (config.color === "secondary") chartColor = "#ff9100";
    let newChartOptions = chartOptions;
    newChartOptions.series[0].color = chartColor;
    setChartOptions(newChartOptions);
  }, [setNowTime, config.color, chartOptions, setChartOptions]);

  const getNow = () => {
    setNowTime(Date.now());
    setTimeout(() => {
      getNow();
    }, 1000);
  };

  const getTimeAgo = (seconds) => {
    if (seconds < 0) {
      seconds = 0;
    }
    if (seconds < 59) {
      return seconds.toFixed() + " secs";
    }
    if (seconds > 59 && seconds <= 3600) {
      seconds = seconds / 60;
      return seconds.toFixed() + " min";
    }
    if (seconds > 3600 && seconds <= 86400) {
      seconds = seconds / 3600;
      return seconds.toFixed() + " hour";
    }
    if (seconds > 86400) {
      seconds = seconds / 86400;
      return seconds.toFixed() + " day";
    }
  };
  const value = 17.5354864; // CAMBIAR LINEA DESPUES

  const title = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon sx={{ marginRight: "10px" }} color={config.color}>
          {config.icon}
        </Icon>
        <h4>
          {config?.selectedDevice.name + " - " + config?.variableFullName}
        </h4>
      </div>
      <p
        style={{
          color: "#999999",
          marginLeft: "24px",
          marginTop: "-20px",
          marginBottom: "-15px",
        }}
      >
        {value.toFixed(config.decimalPlaces)} {config.unit} -{" "}
        {getTimeAgo((nowTime - time) / 1000)} ago
      </p>
    </>
  );

  return (
    <Card title={title}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </Card>
  );
}

// HIGHCHARTS DOCS
// https://api.highcharts.com/highcharts/
// https://www.npmjs.com/package/highcharts-react-official#options-details
