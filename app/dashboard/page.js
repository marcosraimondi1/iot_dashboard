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

  const fixWidget = (widget) => {
    let widgetCopy = JSON.parse(JSON.stringify(widget));
    widgetCopy.selectedDevice.dId = selectedDevice.dId;
    widgetCopy.selectedDevice.name = selectedDevice.name;
    widgetCopy.userId = selectedDevice.userId;
    return widgetCopy;
  };
  const selectWidget = (widget) => {
    switch (widget.type) {
      case "Rtnumberchart":
        return <Rtnumberchart config={fixWidget(widget.config)} />;
      case "IotButton":
        return <IotButton config={fixWidget(widget.config)} />;
      case "IotSwitch":
        return <IotSwitch config={fixWidget(widget.config)} />;
      case "IotIndicator":
        return <IotIndicator config={fixWidget(widget.config)} />;
      default:
        return <></>;
    }
  };

  const dashItems = widgets?.map((widget, index) => (
    <Grid item key={index} xs={widget.config.colSize}>
      {selectWidget(widget)}
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {widgets ? (
        dashItems
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "70vh",
          }}
        >
          <h4>Select a Device</h4>
        </div>
      )}
    </Grid>
  );
}
