import { useState, useEffect } from "react";
import randomString from "../../utils/randomString";
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
    getTemplates();
  }, []);

  const addDevice = () => {
    // add device to db
    if (deviceTemplateIndex === "") {
      alert("Missing Template Field");
      return;
    }
    if (deviceName === "") {
      alert("Missing Name Field");
      return;
    }
    if (dId === "") {
      alert("Missing Id Field");
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
        status: true,
      },
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
      dId,
    };
    let newDevices = devices.map((device) => {
      if (device.dId !== dId) return device;
      device.password = randomString(4);
      return device;
    });
    // setDevices(newDevices);
  };

  const updateSaverRuleStatus = (rule) => {
    // update rule in db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;

    const toSend = {
      rule: newRule,
    };

    const axiosHeaders = {
      headers: {
        token: token,
      },
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

  const getTemplates = async () => {
    const axiosHeaders = {
      headers: {
        token: token,
      },
    };

    try {
      const res = await axios.get("/template", axiosHeaders);

      if (res.data.status == "success") {
        setTemplates(res.data.data);
      }
    } catch (error) {
      // this.$notify({
      //   type: "danger",
      //   icon: "tim-icons icon-alert-circle-exc",
      //   message: "Error getting templates...",
      // });
      console.log(error);
      return;
    }
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
    updateSaverRuleStatus,
  };
}
