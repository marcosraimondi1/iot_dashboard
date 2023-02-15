"use client";
import axios from "axios";
import Button from "@mui/material/Button";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;

// MQTT GLOBAL VARIABLES
global.CLIENT = null;
global.OPTIONS = {
  host: process.env.NEXT_PUBLIC_MQTT_HOST,
  port: process.env.NEXT_PUBLIC_MQTT_PORT,
  endpoint: "/mqtt",
  clean: true,
  connectTimeout: 5000,
  reconnectPeriod: 5000,

  // Certification Information
  clientId: "",
  username: "",
  password: ""
};

// THEME
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";

// Redux
import { store, persistor } from "../store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Notifications
import { SnackbarProvider } from "notistack";

global.notify = (message, options = {}) => {
  // function to trigger event for creating notifications
  const customEvent = new CustomEvent("snackbar", {
    detail: { message, options }
  });
  window.dispatchEvent(customEvent);
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <SnackbarProvider
          maxSnack={5}
          preventDuplicate={true}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          action={(snackbarKey) => (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                // function to trigger event for closing notifications
                const customEvent = new CustomEvent("close-snackbar", {
                  detail: snackbarKey
                });
                window.dispatchEvent(customEvent);
              }}
            >
              Close
            </Button>
          )}
        >
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
