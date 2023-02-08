import axios from "axios";
import Icon from "@mui/material/Icon";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const demoData = [
  [1675856329611, 10],
  [1675856371272, 12],
  [1675856390977, 12.58],
  [1675856401438, 14.5898],
  [1675856412839, 15],
  [1675856501380, 13],
  [1675856601095, 15],
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
      data: demoData,
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
  const [value, setValue] = useState(17.5846);
  const [nowTime, setNowTime] = useState(0);
  const [time, setTime] = useState(0);
  const [chartOptions, setChartOptions] = useState(chartOptionsInitial);

  const token = useSelector((state) => state.auth.token);
  const topic =
    config.userId +
    "/" +
    config.selectedDevice.dId +
    "/" +
    config.variable +
    "/sdata";

  const getChartData = () => {
    // request data from api
    const axiosHeaders = {
      headers: { token },
      params: {
        dId: config.selectedDevice.dId,
        variable: config.variable,
        chartTimeAgo: config.chartTimeAgo,
      },
    };

    axios
      .get("/get-small-charts-data", axiosHeaders)
      .then((res) => {
        const data = res.data.data;
        let newDataSeries = [];

        // format data for chart options series
        data.forEach((element) => {
          var aux = [];

          aux.push(element.time); // + new Date().getTimezoneOffset() * 60 * 1000 * -1
          aux.push(element.value);

          newDataSeries.push(aux);
        });
        let newOptions = chartOptions;
        newOptions.series[0].data = newDataSeries;
        setChartOptions(newOptions);
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const processReceivedData = (data) => {
    try {
      setTime(Date.now());
      setValue(data.value);

      setTimeout(() => {
        if (data.save == 1) {
          getChartData();
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateColor = () => {
    if (config.color === "success") chartColor = "#357a38";
    else if (config.color === "warning") chartColor = "#b26a00";
    else if (config.color === "error") chartColor = "#aa2e25";
    else if (config.color === "info") chartColor = "#1c54b2";
    else if (config.color === "primary") chartColor = "#6d1b7b";
    else if (config.color === "secondary") chartColor = "#ff9100";
    let newChartOptions = chartOptions;
    newChartOptions.series[0].color = chartColor;
    setChartOptions(newChartOptions);
  };

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

  const getLastData = () => {
    const axiosHeaders = {
      headers: { token },
      params: {
        dId: config.selectedDevice.dId,
        variable: config.variable,
        chartTimeAgo: config.chartTimeAgo,
      },
    };
    axios
      .get("/get-last-data", axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.data.length == 0) return;
          const data = res.data.data[0];
          // data.time + new Date().getTimezoneOffset() * 60 * 1000 * -1;
          setTime(data.time);
          setValue(data.value);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateColor();
    getNow();
    setTime(Date.now());

    if (config.demo) return;
    console.log("Chart Topic: " + topic);

    setValue(0);
    getLastData();
    // mqtt message listener
    window.addEventListener(topic, (event) => {
      processReceivedData(event.detail);
    });

    // erase data
    let newOptions = chartOptions;
    newOptions.series[0].data = [];
    newOptions.series[0].name = config.variableFullName + " " + config.unit;
    setChartOptions(newOptions);

    // get saved data from api
    getChartData();

    return () => {
      window.removeEventListener(topic, () => {});
    };
  }, []);

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
        allowChartUpdate={true}
        immutable={false}
        updateArgs={[true, true, true]}
        options={chartOptions}
      />
    </Card>
  );
}

// HIGHCHARTS DOCS
// https://api.highcharts.com/highcharts/
// https://www.npmjs.com/package/highcharts-react-official#options-details
