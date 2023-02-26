import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Notifications from "@/Components/Notifications/Notifications";
import { logout } from "@/Slices/authSlice";
import { setSelectedDevice } from "@/Slices/devicesSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [openNotis, setOpenNotis] = useState(false);
  const devices = useSelector((state) => state.devices.devices);
  const selectedDID = useSelector((state) =>
    state.devices.selectedDevice.dId ? state.devices.selectedDevice.dId : ""
  );
  const notifications = useSelector((state) => state.devices.notifications);

  const handleChange = (event) => {
    dispatch(setSelectedDevice(event.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const devicesOptions = devices?.map((device) => (
    <MenuItem key={device.dId} value={device.dId}>
      {device.name}
    </MenuItem>
  ));
  return (
    <>
      {/* APP TITLE */}
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        IOT CENTER
      </Typography>

      {/* DEVICE SELECTOR */}
      <FormControl size="small" sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="select-label">{devices.length > 0 ? "Device" : "No Devices"}</InputLabel>
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
            <MenuItem value="">
              <a href="/dashboard/">Create New</a>
            </MenuItem>
          )}
        </Select>
      </FormControl>

      {/* NOTIFICATIONS */}
      <IconButton color="inherit" onClick={() => setOpenNotis(true)}>
        <Badge badgeContent={notifications?.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Notifications
        notifications={notifications}
        openNotis={openNotis}
        setOpenNotis={setOpenNotis}
      />

      {/* USER - LOGOUT */}
      <Button sx={{ color: "white" }} onClick={handleLogout}>
        Cerrar Sesion
      </Button>
    </>
  );
}
