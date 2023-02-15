"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { mqttSender } from "@/Slices/emqxSlice";
import Card from "../Card/Card";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

export default function IotButton({ config }) {
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const sendValue = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 500);

    const toSend = {
      topic:
        config?.userId + "/" + config?.selectedDevice?.dId + "/" + config?.variable + "/actdata",
      msg: {
        value: config?.message
      }
    };
    if (config.demo) return;
    dispatch(mqttSender(toSend));
  };

  return (
    <Card title={config?.selectedDevice?.name + " - " + config?.variableFullName}>
      <div
        style={{
          display: "flex",
          margin: "5px",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Icon style={{ fontSize: "48px" }} color={config.color}>
          {config.icon}
        </Icon>
        <Button onClick={sendValue} disabled={sending} variant="contained">
          Send
        </Button>
      </div>
    </Card>
  );
}
