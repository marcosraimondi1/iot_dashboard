"use client";
import React from "react";

// THEME
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";

// PUSH NOTIFICATIONS
import { SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import Grow from "@mui/material/Grow";
import CloseIcon from "@mui/icons-material/Close";
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            )}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Grow}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
