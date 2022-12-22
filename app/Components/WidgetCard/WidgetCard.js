"use client";

import Paper from "@mui/material/Paper";

export default function WidgetCard({ children, title }) {
  return (
    <Paper style={{ margin: "3px" }} elevation={8}>
      <div style={{ margin: "7px" }}>
        <h4>{title}</h4>
      </div>
      <div>{children}</div>
    </Paper>
  );
}
