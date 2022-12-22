"use client";
import IotButton from "../widgets/IotButton";
import IotIndicator from "../widgets/IotIndicator";
import IotSwitch from "../widgets/IotSwitch";
import Rtnumberchart from "../widgets/Rtnumberchart";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  const config = {
    selectedDevice: { name: "Horno" },
    variableFullName: "Temp",
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
