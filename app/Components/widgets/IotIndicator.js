import Card from "../Card/Card";
import Icon from "@mui/material/Icon";
import { useEffect, useState } from "react";

export default function IotIndicator({ config }) {
  const [value, setValue] = useState(false);

  if (config.demo) {
  }

  const topic =
    config.userId +
    "/" +
    config.selectedDevice.dId +
    "/" +
    config.variable +
    "/sdata";

  const processReceivedData = (data) => {
    data.value ? setValue(data.value) : setValue(false);
  };

  useEffect(() => {
    if (config.demo) return;
    window.addEventListener(topic, (event) => {
      processReceivedData(event.detail);
    });
    return () => {
      window.removeEventListener(topic, () => {});
    };
  }, []);

  return (
    <Card
      title={config?.selectedDevice?.name + " - " + config?.variableFullName}
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
          color={value ? config.color : "action"}
        >
          {config.icon}
        </Icon>
      </div>
    </Card>
  );
}
