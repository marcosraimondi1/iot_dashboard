import { useState } from "react";
import Card from "../Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Rtnumberchart from "../widgets/Rtnumberchart";
import Button from "@mui/material/Button";

const colors = [
  { value: "success", label: "success" },
  { value: "error", label: "error" },
  { value: "warning", label: "warning" },
  { value: "info", label: "info" },
  { value: "primary", label: "primary" },
  { value: "secondary", label: "secondary" },
];

const colSizes = [2, 3, 4, 6, 8, 12];

export default function RtnumberchartForm({ addWidget }) {
  const [variableFullName, setVariableFullName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("success");
  const [colSize, setColSize] = useState(6);
  const [unit, setUnit] = useState("");
  const [chartTimeAgo, setChartTimeAgo] = useState();
  const [variableSendFreq, setVariableSendFreq] = useState(30);
  const [decimalPlaces, setDecimalPlaces] = useState(2);

  let rtnumberchartConfig = {
    variableFullName,
    icon,
    color,
    colSize,
    unit,
    chartTimeAgo,
    variableSendFreq,
    decimalPlaces,
    selectedDevice: {
      name: "Home",
    },
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                justifyContent: "space-evenly",
              }}
            >
              {/* VAR NAME */}
              <TextField
                required
                color="primary"
                value={variableFullName}
                onChange={(e) => {
                  setVariableFullName(e.target.value);
                }}
                label="Var Name"
                type="text"
              />
              <br />

              {/* ICON */}
              <TextField
                required
                value={icon}
                onChange={(e) => {
                  setIcon(e.target.value);
                }}
                label="Icon"
                type="text"
              />
              <br />

              {/* UNIT */}
              <TextField
                required
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                label="Unit"
                type="text"
              />
              <br />

              {/* DECIMAL PLACES */}
              <TextField
                required
                value={decimalPlaces}
                onChange={(e) => {
                  setDecimalPlaces(e.target.value);
                }}
                label="Decimal Places"
                type="number"
              />
              <br />

              {/* SEND FREQ */}
              <TextField
                required
                value={variableSendFreq}
                onChange={(e) => {
                  setVariableSendFreq(e.target.value);
                }}
                label="Variable Send Frequency (secs)"
                type="number"
              />
              <br />

              {/* CHART TIME AGO */}
              <TextField
                required
                value={chartTimeAgo}
                onChange={(e) => {
                  setChartTimeAgo(e.target.value);
                }}
                label="Chart Back Time (mins)"
                type="number"
              />
              <br />

              {/* COLOR */}
              <TextField
                required
                select
                value={color}
                color={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                label="Color"
              >
                {colors.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ color: option.value + ".main" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />

              {/* SIZE */}
              <TextField
                required
                select
                label="Size"
                value={colSize}
                onChange={(e) => {
                  setColSize(e.target.value);
                }}
              >
                {colSizes.map((xs) => (
                  <MenuItem key={xs} value={xs}>
                    {xs}
                  </MenuItem>
                ))}
              </TextField>
              {/* ADD BUTTON */}
              <br />
              <Button
                onClick={() => addWidget(rtnumberchartConfig)}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Rtnumberchart config={rtnumberchartConfig} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
