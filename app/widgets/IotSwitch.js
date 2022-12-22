"use client";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import WidgetCard from "../Components/WidgetCard/WidgetCard";

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

  const getIconColorClass = () => {
    //para apagar el icono
    if (!value) {
      return "text-dark";
    }
    if (config.class == "success") {
      return "text-success";
    }
    if (config.class == "primary") {
      return "text-primary";
    }
    if (config.class == "warning") {
      return "text-warning";
    }
    if (config.class == "danger") {
      return "text-danger";
    }
  };

  return (
    <WidgetCard
      title={config?.selectedDevice.name + " - " + config?.variableFullName}
    >
      <Icon style={{ fontSize: "48px" }} color={value ? "secondary" : "info"}>
        lightbulb
      </Icon>
      <Switch color="secondary" checked={value} onChange={sendValue} />
    </WidgetCard>
  );
}
