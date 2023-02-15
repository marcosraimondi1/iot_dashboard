"use client";
import Dash from "../Components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Slices/authSlice";
import { getDevices, setSelectedDevice, getNotifications } from "@/Slices/devicesSlice";
import { startMqttClient } from "@/Slices/emqxSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import authenticated from "../../middleware/authenticated";
import axios from "axios";

export default authenticated(function Dashboard({ children }) {
  const [openNotis, setOpenNotis] = useState(false);
  const devices = useSelector((state) => state.devices.devices);
  const selectedDID = useSelector((state) =>
    state.devices.selectedDevice.dId ? state.devices.selectedDevice.dId : ""
  );
  const notifications = useSelector((state) => state.devices.notifications);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setSelectedDevice(event.target.value));
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const readNotification = (notifId) => {
    const axiosHeaders = {
      headers: { token }
    };
    const toSend = { notifId };
    axios
      .put("/notifications", toSend, axiosHeaders)
      .then((res) => {
        if (res.data.status === "success") dispatch(getNotifications());
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(getDevices());
    dispatch(getNotifications());
    dispatch(startMqttClient());
  }, [dispatch]);

  const devicesOptions = devices?.map((device) => (
    <MenuItem key={device.dId} value={device.dId}>
      {device.name}
    </MenuItem>
  ));

  const header = (
    <>
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
          {devices.length > 0 ? devicesOptions : <MenuItem value="">Create New</MenuItem>}
        </Select>
      </FormControl>

      {/* NOTIS */}
      <IconButton color="inherit" onClick={() => setOpenNotis(true)}>
        <Badge badgeContent={notifications?.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={openNotis}
        onClose={() => setOpenNotis(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Notifications</DialogTitle>
        <DialogContent>
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {notifications?.map((notification, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={
                    <>
                      <b>{notification.variableFullName + " = " + notification.payload.value}</b>
                      <IconButton
                        onClick={() => {
                          readNotification(notification._id);
                        }}
                      >
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </IconButton>
                    </>
                  }
                  secondary={
                    <div style={{ marginLeft: "20px" }}>
                      <b style={{ color: "salmon" }}>{unixToDate(notification.time)}</b>
                      <br />
                      <span>
                        {notification.variableFullName +
                          " " +
                          notification.condition +
                          " " +
                          notification.value}
                      </span>
                      <b> - Device: </b> {notification.deviceName}
                    </div>
                  }
                />
              </ListItem>
            ))}

            <hr />
          </List>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <Dash logout={onLogout} title="IOT CENTER" header={header}>
      {children}
    </Dash>
  );
});

//UNIX A FECHA
function unixToDate(ms) {
  var d = new Date(parseInt(ms)),
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time;

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh == 0) {
    h = 12;
  }

  // ie: 2013-02-18, 8:35 AM
  time = dd + "/" + mm + "/" + yyyy + ", " + h + ":" + min + " " + ampm;

  return time;
}
