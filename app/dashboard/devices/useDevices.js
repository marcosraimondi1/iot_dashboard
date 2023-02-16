import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createDevice, deleteDevice, getDevices } from "@/Slices/devicesSlice";

export default function useDevices() {
  const [templates, setTemplates] = useState([]);
  const [deviceTemplateIndex, setDeviceTemplateIndex] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [dId, setDId] = useState("");

  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchTemplates(token).then((res) => setTemplates(res));
  }, [token]);

  const addDevice = () => {
    // add device to db
    if (deviceTemplateIndex === "") {
      global.notify("Missing Template Field", { variant: "error" });
      return;
    }
    if (deviceName === "") {
      global.notify("Missing Name Field", { variant: "error" });
      return;
    }
    if (dId === "") {
      global.notify("Missing Id Field", { variant: "error" });
      return;
    }

    const template = templates[deviceTemplateIndex];

    let newDevice = {
      name: deviceName,
      dId: dId,
      templateId: template._id,
      templateName: template.name,
      password: "default",
      saverRule: {
        dId: dId,
        status: true
      }
    };

    dispatch(createDevice(newDevice));
    setDeviceName("");
    setDId("");
    setDeviceTemplateIndex("");
  };

  const delDevice = (dId) => {
    // delete device from db
    dispatch(deleteDevice(dId));
  };

  const refreshPassword = (dId) => {
    // refresh password in db
    const toSend = {
      dId
    };

    const axiosHeaders = {
      headers: {
        token: token
      }
    };

    axios
      .put("/device-password", toSend, axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          console.log("success");
          dispatch(getDevices());
        }
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const updateSaverRuleStatus = (rule) => {
    // update rule in db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;

    const toSend = {
      rule: newRule
    };

    const axiosHeaders = {
      headers: {
        token: token
      }
    };

    axios
      .put("/saver-rule", toSend, axiosHeaders)
      .then((res) => {
        if (res.data.status == "success") {
          console.log("success");
          dispatch(getDevices());
        }

        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  return {
    templates,
    devices,
    deviceTemplateIndex,
    setDeviceTemplateIndex,
    deviceName,
    setDeviceName,
    dId,
    setDId,
    addDevice,
    deleteDevice: delDevice,
    refreshPassword,
    updateSaverRuleStatus
  };
}

const fetchTemplates = async (token) => {
  const axiosHeaders = {
    headers: { token }
  };

  try {
    const res = await axios.get("/template", axiosHeaders);

    if (res.data.status == "success") {
      return res.data.data;
    }
  } catch (error) {
    global.notify("Error getting templates...", { variant: "error" });
  }
  return [];
};
