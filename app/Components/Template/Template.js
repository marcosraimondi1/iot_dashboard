import IotButton from "../widgets/IotButton";
import IotSwitch from "../widgets/IotSwitch";
import IotIndicator from "../widgets/IotIndicator";
import Rtnumberchart from "../widgets/Rtnumberchart";
import Grid from "@mui/material/Grid";

export default function Template({ widgets }) {
  return (
    <Grid container spacing={2}>
      {widgets.map((widget, index) => {
        const { type, config } = widget;
        let element;
        if (type === "IotIndicator") element = <IotIndicator config={config} />;
        else if (type === "IotSwitch") element = <IotSwitch config={config} />;
        else if (type === "IotButton") element = <IotButton config={config} />;
        else if (type === "Rtnumberchart")
          element = <Rtnumberchart config={config} />;
        return <Grid item xs={config.colSize} key={index}></Grid>;
      })}
    </Grid>
  );
}
