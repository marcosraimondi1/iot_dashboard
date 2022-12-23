"use client";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import Card from "../Card/Card";

export default function IotSwitch({ config }) {
  const [value, setValue] = useState(false);

  const sendValue = () => {
    setValue(!value);
    const toSend = {
      topic:
        config.userId +
        "/" +
        config.selectedDevice.dId +
        "/" +
        config.variable +
        "/actdata",
      msg: {
        value: value,
      },
    };
    // $nuxt.$emit("mqtt-sender", toSend);
  };

  return (
    <Card
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
        <Icon
          style={{ fontSize: "48px" }}
          color={value ? config.color : ""}
          sx={{ color: value ? config.color : "#999999" }}
        >
          {config.icon}
        </Icon>
        <Switch color={config.color} checked={value} onChange={sendValue} />
      </div>
    </Card>
  );
}
