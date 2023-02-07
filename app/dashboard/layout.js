"use client";
import Dash from "../Components/Dashboard/Dashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Slices/authSlice";
import {
  getDevices,
  setSelectedDevice,
  getNotifications,
} from "@/Slices/devicesSlice";
import { startMqttClient } from "@/Slices/emqxSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import authenticated from "../../middleware/authenticated";

export default authenticated(function Dashboard({ children }) {
  const devices = useSelector((state) => state.devices.devices);
  const selectedDID = useSelector((state) =>
    state.devices.selectedDevice.dId ? state.devices.selectedDevice.dId : ""
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setSelectedDevice(event.target.value));
  };

  const onLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  useEffect(() => {
    dispatch(getDevices());
    dispatch(getNotifications());
    dispatch(startMqttClient());
  }, []);

  const devicesOptions = devices.map((device) => (
    <MenuItem key={device.dId} value={device.dId}>
      {device.name}
    </MenuItem>
  ));

  const header = (
    <FormControl size="small" sx={{ m: 1, minWidth: 130 }}>
      <InputLabel id="select-label">
        {devices.length > 0 ? "Device" : "No Devices"}
      </InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={selectedDID}
        label="Device"
        onChange={handleChange}
      >
        {devices.length > 0 ? (
          devicesOptions
        ) : (
          <MenuItem value="">Create New</MenuItem>
        )}
      </Select>
    </FormControl>
  );

  return (
    <Dash logout={onLogout} title="IOT CENTER" header={header}>
      {children}
    </Dash>
  );
});
