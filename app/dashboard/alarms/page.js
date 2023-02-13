"use client";
import Card from "../../Components/Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AlarmsList from "../../Components/Lists/AlarmsList";
import useAlarms from "./useAlarms";

export default function Alarms() {
  const {
    device,
    alarms,
    selectedWidgetIndex,
    setSelectedWidgetIndex,
    condition,
    setCondition,
    updateStatusRule,
    deleteRule,
    addRule,
    value,
    setValue,
    triggerTime,
    setTriggerTime,
  } = useAlarms();

  return (
    <>
      <Card title="">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ marginLeft: "20px" }}>
              <h2>Add New Alarm</h2>
            </div>
          </Grid>

          {/* VARIABLE */}
          <Grid item xs={6}>
            <TextField
              required
              select
              label="Variable"
              value={selectedWidgetIndex}
              onChange={(e) => {
                setSelectedWidgetIndex(e.target.value);
              }}
              sx={{ width: "100%", margin: "10px" }}
            >
              {device?.template?.widgets?.map((w, index) => (
                <MenuItem key={index} value={index}>
                  {w.config.variableFullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* CONDITION */}
          <Grid item xs={6}>
            <TextField
              required
              select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              label="Condition"
              sx={{ width: "80%", margin: "10px" }}
            >
              <MenuItem value="=">{"="}</MenuItem>
              <MenuItem value=">">{">"}</MenuItem>
              <MenuItem value=">=">{">="}</MenuItem>
              <MenuItem value="<">{"<"}</MenuItem>
              <MenuItem value="<=">{"<="}</MenuItem>
              <MenuItem value="!=">{"!="}</MenuItem>
            </TextField>
          </Grid>

          {/* VALUE */}
          <Grid item xs={6}>
            <TextField
              required
              type="number"
              label="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ width: "100%", margin: "10px" }}
            />
          </Grid>

          {/* TRIGGER TIME */}
          <Grid item xs={6}>
            <TextField
              required
              label="Trigger Time (mins)"
              type="number"
              value={triggerTime}
              onChange={(e) => setTriggerTime(e.target.value)}
              sx={{ width: "80%", margin: "10px" }}
            />
          </Grid>

          {/* SAVE BUTTON */}
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                margin: "10px",
                alignItems: "center",
              }}
            >
              <Button variant="contained" onClick={addRule}>
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <br />
      <AlarmsList
        alarms={alarms}
        updateStatusRule={updateStatusRule}
        del={deleteRule}
      />
    </>
  );
}
