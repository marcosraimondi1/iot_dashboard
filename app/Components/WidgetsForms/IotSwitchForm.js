import { useState } from "react";
import Card from "../Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import IotSwitch from "../widgets/IotSwitch";
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

export default function IotSwitchForm({ addWidget }) {
  const [variableFullName, setVariableFullName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("success");
  const [colSize, setColSize] = useState(6);

  let iotSwitchConfig = {
    variableFullName,
    icon,
    color,
    colSize,
    selectedDevice: {
      name: "Home",
    },
    variableType: "output",
    demo: true,
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
                onClick={() => {
                  if (icon === "") {
                    alert("Missing Icon Field");
                    return;
                  }
                  if (variableFullName == "") {
                    alert("Missing Variable Name");
                    return;
                  }
                  addWidget({ type: "IotSwitch", config: iotSwitchConfig });
                  setIcon("");
                  setVariableFullName("");
                }}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={colSize}>
            <IotSwitch config={iotSwitchConfig} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
