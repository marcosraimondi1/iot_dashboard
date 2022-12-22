"use client";

import Paper from "@mui/material/Paper";

export default function WidgetCard({ children, title }) {
  return (
    <Paper elevation={8}>
      <div style={{ margin: "5px" }}>
        <h4>{title}</h4>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {children}
      </div>
    </Paper>
  );
}
