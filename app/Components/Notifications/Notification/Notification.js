import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "@/Slices/devicesSlice";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import unixToDate from "@/Helper/unixToDate";

export default function Notification({ notification }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

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

  return (
    <ListItem alignItems="flex-start">
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
  );
}
