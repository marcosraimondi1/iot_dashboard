"use client";
import Card from "../../Components/Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DevicesList from "../../Components/Lists/DevicesList";
import useDevices from "./useDevices";

export default function Devices() {
  const {
    templates,
    devices,
    deviceTemplateIndex,
    setDeviceTemplateIndex,
    deviceName,
    setDeviceName,
    dId,
    setDId,
    addDevice,
    deleteDevice,
    refreshPassword,
    updateSaverRuleStatus
  } = useDevices();

  return (
    <>
      <Card title="">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ marginLeft: "20px" }}>
              <h2>Add New Device</h2>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              label="Device Name"
              sx={{ width: "100%", margin: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={dId}
              onChange={(e) => setDId(e.target.value)}
              label="Device Id"
              sx={{ width: "80%", margin: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              select
              label="Template"
              value={deviceTemplateIndex}
              onChange={(e) => {
                setDeviceTemplateIndex(e.target.value);
              }}
              sx={{ width: "100%", margin: "10px" }}
            >
              {templates.map((temp, index) => (
                <MenuItem key={index} value={index}>
                  {temp.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                margin: "10px",
                alignItems: "center"
              }}
            >
              <Button variant="contained" onClick={addDevice}>
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <br />
      <DevicesList
        devices={devices}
        refreshPassword={refreshPassword}
        updateSaverRuleStatus={updateSaverRuleStatus}
        del={deleteDevice}
      />
    </>
  );
}
