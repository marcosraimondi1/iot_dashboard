"use client";
import { useRef, useState } from "react";
import Card from "../../Components/Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const demoDevice = {
  name: "Home",
  dId: "1",
  template: {
    name: "Template 1",
    _id: 1,
    widgets: [
      {
        type: "Rtnumberchart",
        config: {
          variableFullName: "Temperature",
          variable: "streqert",
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
        },
      },
    ],
  },
  password: "HLr3",
  saverRule: {
    dId: "1",
    status: false,
  },
};

const newRule = {
  dId: null,
  status: true,
  variableFullName: null,
  deviceName: null,
  variable: null,
  value: null,
  condition: null,
  triggerTime: null,
};

const demoRules = [];

export default function Alarms() {
  const [device, setDevice] = useState(demoDevice);
  const [rules, setRules] = useState(demoRules);
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState("");
  const [condition, setCondition] = useState("");

  const valueRef = useRef("");
  const triggerTimeRef = useRef("");

  const updateStatusRule = (rule) => {
    // update rule status on db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;
  };

  const deleteRule = (rule) => {
    // delete rule from db
  };

  const addRule = () => {
    const { variable, variableFullName } =
      device.template.widgets[selectedWidgetIndex];
    let newRule = {
      dId: device.dId,
      status: true,
      variableFullName,
      deviceName: device.name,
      variable,
      value: valueRef.current,
      condition,
      triggerTime: triggerTimeRef.current,
    };
    let newRules = rules.concat(newRule);
    setRules(newRules);
  };

  return (
    <>
      <Card title="">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ marginLeft: "20px" }}>
              <h2>Add New Rule</h2>
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
              {device.template.widgets.map((w, index) => (
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
              onChange={(e) => {
                valueRef.current = e.target.value;
              }}
              sx={{ width: "100%", margin: "10px" }}
            />
          </Grid>

          {/* TRIGGER TIME */}
          <Grid item xs={6}>
            <TextField
              required
              label="Trigger Time (mins)"
              type="number"
              onChange={(e) => {
                triggerTimeRef.current = e.target.value;
              }}
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
    </>
  );
}
