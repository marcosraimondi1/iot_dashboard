"use client";
import Dash from "../Components/Dashboard/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDevices, getNotifications } from "@/Slices/devicesSlice";
import { startMqttClient } from "@/Slices/emqxSlice";

import authenticated from "../../middleware/authenticated";
import { useSnackbar } from "notistack";

export default authenticated(function Dashboard({ children }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDevices());
    dispatch(getNotifications());
    dispatch(startMqttClient());
    // notifications listener
    window.addEventListener("snackbar", (event) => {
      const { message, options } = event.detail;
      enqueueSnackbar(message, options);
    });

    window.addEventListener("close-snackbar", (event) => {
      closeSnackbar(event.detail);
    });

    return () => {
      window.removeEventListener("snackbar", () => {});
      window.removeEventListener("close-snackbar", () => {});
    };
  }, [dispatch, closeSnackbar, enqueueSnackbar]);

  return (
    <Dash>
      <div style={{ minWidth: "300px" }}>{children}</div>
    </Dash>
  );
});
