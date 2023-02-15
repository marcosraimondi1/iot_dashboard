import IotButton from "../widgets/IotButton";
import IotSwitch from "../widgets/IotSwitch";
import IotIndicator from "../widgets/IotIndicator";
import Rtnumberchart from "../widgets/Rtnumberchart";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Template({ widgets, deleteWidget }) {
  return (
    <Grid container spacing={2}>
      {widgets.map((widget, index) => {
        const { type, config } = widget;
        let element;
        if (type === "IotIndicator") element = <IotIndicator config={config} />;
        else if (type === "IotSwitch") element = <IotSwitch config={config} />;
        else if (type === "IotButton") element = <IotButton config={config} />;
        else if (type === "Rtnumberchart") element = <Rtnumberchart config={config} />;
        return (
          <Grid item xs={config.colSize} key={index} sx={{ flexDirection: "row" }}>
            <Grid item xs={12}>
              {element}
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="delete" onClick={() => deleteWidget(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
