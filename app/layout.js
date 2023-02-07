"use client";
import React from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;

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
  password: "",
};

// THEME
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";

// Redux
import { store, persistor } from "../store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
