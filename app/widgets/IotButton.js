"use client";
import { useState } from "react";
import WidgetCard from "../Components/WidgetCard/WidgetCard";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

export default function IotButton({ config }) {
  const [sending, setSending] = useState(false);

  const getIconColorClass = () => {
    if (!sending) {
      return "text-dark";
    }

    return "text-" + config.class;
  };

  const sendValue = () => {
    setSending(true);

    setTimeout(() => {
      setSending(false);
    }, 500);

    const toSend = {
      topic:
        config?.userId +
        "/" +
        config?.selectedDevice?.dId +
        "/" +
        config?.variable +
        "/actdata",
      msg: {
        value: config?.message,
      },
    };

    // this.$nuxt.$emit("mqtt-sender", toSend);
  };

  return (
    <WidgetCard
      title={config?.selectedDevice.name + " - " + config?.variableFullName}
    >
      <div
        style={{
          display: "flex",
          margin: "5px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Icon style={{ color: "red", fontSize: "48px" }}>light_mode</Icon>
        <Button onClick={sendValue} disabled={sending} variant="contained">
          Send
        </Button>
      </div>
    </WidgetCard>
  );
}
