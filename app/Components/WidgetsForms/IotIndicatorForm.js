import { useState } from "react";
import Card from "../Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const colors = [
  { value: "success", label: "success" },
  { value: "error", label: "error" },
  { value: "warning", label: "warning" },
  { value: "info", label: "info" },
  { value: "primary", label: "primary" },
  { value: "secondary", label: "secondary" },
];

const colSizes = [2, 3, 4, 6, 8, 12];

export default function IotIndicatorForm({ config, setConfig }) {
  // <!-- Form Indicator Type -->
  const [variableFullName, setVariableFullName] = useState("");
  const [icon, setIcon] = useState("");
  const [variableSendFreq, setVariableSendFreq] = useState(30);
  const [color, setColor] = useState("success");
  const [colSize, setColSize] = useState(6);

  return (
    <Card title={"IoT Indicator"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          color="primary"
          value={variableFullName}
          onChange={(e) => {
            setVariableFullName(e.target.value);
          }}
          label="Var Name"
          type="text"
        />
        <br />
        <TextField
          value={icon}
          onChange={(e) => {
            setIcon(e.target.value);
          }}
          label="Icon"
          type="text"
        />
        <br />
        <TextField
          value={variableSendFreq}
          onChange={(e) => {
            setVariableSendFreq(e.target.value);
          }}
          label="Variable Send Frequency (secs)"
          type="number"
        />
        <br />
        <TextField
          select
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          label="Color"
        >
          {colors.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              color={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <TextField
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
      </div>
    </Card>
  );
}
