"use client";
import IotButton from "../Components/widgets/IotButton";
import IotIndicator from "../Components/widgets/IotIndicator";
import IotSwitch from "../Components/widgets/IotSwitch";
import Rtnumberchart from "../Components/widgets/Rtnumberchart";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
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
      <Grid item xs={3}>
        <IotButton config={config} />
      </Grid>
      <Grid item xs={3}>
        <IotIndicator config={config} />
      </Grid>
      <Grid item xs={3}>
        <IotSwitch config={config} />
      </Grid>
      <Grid item xs={12}>
        <Rtnumberchart config={config} />
      </Grid>
    </Grid>
  );
}
