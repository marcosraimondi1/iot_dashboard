"use client";
import IotButton from "../Components/widgets/IotButton";
import IotIndicator from "../Components/widgets/IotIndicator";
import IotSwitch from "../Components/widgets/IotSwitch";
import Rtnumberchart from "../Components/widgets/Rtnumberchart";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const selectedDevice = useSelector((state) => state.devices.selectedDevice);

  const widgets = selectedDevice?.template?.widgets;

  const selectWidget = (widget) => {
    switch (widget.type) {
      case "Rtnumberchart":
        return <Rtnumberchart config={widget.config} />;
      case "IotButton":
        return <IotButton config={widget.config} />;
      case "IotSwitch":
        return <IotSwitch config={widget.config} />;
      case "IotIndicator":
        return <IotIndicator config={widget.config} />;
      default:
        return <></>;
    }
  };

  const dashItems = widgets.map((widget, index) => (
    <Grid item key={index} xs={widget.config.colSize}>
      {selectWidget(widget)}
    </Grid>
  ));

  let config = {
    variableFullName: "Temperature",
    icon: "shower",
    color: "primary",
    colSize: 12,
    unit: "°C",
    chartTimeAgo: 10,
    variableSendFreq: 10,
    decimalPlaces: 2,
    selectedDevice: {
      name: "Home",
    },
  };
  return (
    <Grid container spacing={2}>
      {dashItems}
    </Grid>
  );
}
