import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevices } from "@/Slices/devicesSlice";
import randomString from "../../utils/randomString";
import axios from "axios";

export default function useAlarms() {
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState("");
  const [triggerTime, setTriggerTime] = useState("");

  const device = useSelector((state) => state.devices.selectedDevice);
  const alarms = device?.alarmRules ? device.alarmRules : [];
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const updateStatusRule = (rule) => {
    // update rule status on db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;

    const axiosHeaders = {
      headers: {
        token: token
      }
    };
    const toSend = { rule: newRule };

    axios
      .put("/alarm-rule", toSend, axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          dispatch(getDevices());
          console.log("success");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const deleteRule = (rule) => {
    // delete rule from db
    const axiosHeaders = {
      headers: {
        token: token
      },
      params: {
        emqxRuleId: rule.emqxRuleId
      }
    };

    axios
      .delete("/alarm-rule", axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          dispatch(getDevices());
          console.log("success");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const addRule = () => {
    // add rule to db
    if (selectedWidgetIndex === "") {
      alert("Missing Variable Field");
      return;
    }
    if (condition === "") {
      alert("Missing Condition Field");
      return;
    }
    if (value === "") {
      alert("Missing Value Field");
      return;
    }
    if (triggerTime === "") {
      alert("Missing TriggerTime Field");
      return;
    }
    const { variable, variableFullName } = device.template.widgets[selectedWidgetIndex].config;
    let newRule = {
      _id: randomString(10),
      dId: device.dId,
      status: true,
      variableFullName,
      deviceName: device.name,
      variable,
      value: value,
      condition,
      triggerTime: triggerTime,
      counter: 0
    };

    const axiosHeaders = {
      headers: {
        token: token
      }
    };

    let toSend = { newRule };

    axios
      .post("/alarm-rule", toSend, axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          setCondition("");
          setValue("");
          setTriggerTime("");
          setSelectedWidgetIndex("");

          dispatch(getDevices());
          console.log("success");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  return {
    device,
    alarms,
    selectedWidgetIndex,
    setSelectedWidgetIndex,
    condition,
    setCondition,
    updateStatusRule,
    deleteRule,
    addRule,
    value,
    setValue,
    triggerTime,
    setTriggerTime
  };
}
