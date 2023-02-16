"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";
import notAuthenticated from "middleware/notAuthenticated";

export default notAuthenticated(function AuthLayout({ children }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
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
  }, [closeSnackbar, enqueueSnackbar]);
  return <>{children}</>;
});
