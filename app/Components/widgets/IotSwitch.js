"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { mqttSender } from "@/Slices/emqxSlice";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import Card from "../Card/Card";

export default function IotSwitch({ config }) {
  const [value, setValue] = useState(false);
  const dispatch = useDispatch();
  const topic =
    config.userId +
    "/" +
    config.selectedDevice.dId +
    "/" +
    config.variable +
    "/actdata";
  const sendValue = () => {
    const toSend = {
      topic: topic,
      msg: {
        value: !value,
      },
    };
    setValue(!value);
    dispatch(mqttSender(toSend));
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
