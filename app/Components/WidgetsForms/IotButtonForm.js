import { useState } from "react";
import Card from "../Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import IotButton from "../widgets/IotButton";
import Button from "@mui/material/Button";
const colors = [
  { value: "success", label: "success" },
  { value: "error", label: "error" },
  { value: "warning", label: "warning" },
  { value: "info", label: "info" },
  { value: "primary", label: "primary" },
  { value: "secondary", label: "secondary" }
];

const colSizes = [2, 3, 4, 6, 8, 12];

export default function IotButtonForm({ addWidget }) {
  const [variableFullName, setVariableFullName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("success");
  const [colSize, setColSize] = useState(6);
  const [message, setMessage] = useState("");

  let iotButtonConfig = {
    variableFullName,
    icon,
    color,
    colSize,
    message,
    selectedDevice: {
      name: "Home"
    },
    variableType: "output",
    demo: true
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
                justifyContent: "space-evenly"
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

              {/* MESSAGE */}
              <TextField
                required
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                label="Message"
                type="text"
              />
              <br />

              {/* COlOR */}
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
                    global.notify("Missing Icon Field", { variant: "warning" });
                    return;
                  }
                  if (variableFullName === "") {
                    global.notify("Missing Variable Name Field", { variant: "warning" });
                    return;
                  }
                  if (message === "") {
                    global.notify("Missing Message Field", { variant: "warning" });
                    return;
                  }
                  addWidget({ type: "IotButton", config: iotButtonConfig });
                  setIcon("");
                  setVariableFullName("");
                  setMessage("");
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
            <IotButton config={iotButtonConfig} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
