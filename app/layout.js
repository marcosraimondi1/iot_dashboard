"use client";
import React from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;

// THEME
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
