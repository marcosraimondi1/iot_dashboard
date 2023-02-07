import { useRef, useState, useEffect } from "react";
import randomString from "../../utils/randomString";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createDevice, deleteDevice } from "@/Slices/devicesSlice";
const demoTemplates = [
  {
    name: "Template 1",
    _id: 1,
    widgets: [
      {
        type: "Rtnumberchart",
        config: {
          variableFullName: "Temperature",
          icon: "shower",
          color: "primary",
          colSize: 12,
          unit: "°C",
          chartTimeAgo: 10,
          variableSendFreq: 10,
          decimalPlaces: 2,
          selectedDevice: {
            name: "Home",
          },
        },
      },
    ],
  },
  {
    name: "Template 2",
    _id: 2,
    widgets: [
      {
        type: "Rtnumberchart",
        config: {
          variableFullName: "Temperature",
          icon: "shower",
          color: "primary",
          colSize: 12,
          unit: "°C",
          chartTimeAgo: 10,
          variableSendFreq: 10,
          decimalPlaces: 2,
          selectedDevice: {
            name: "Home",
          },
        },
      },
      {
        type: "IotSwitch",
        config: {
          variableFullName: "Pump",
          icon: "shop",
          color: "error",
          colSize: 6,
          selectedDevice: {
            name: "Home",
          },
        },
      },
      {
        type: "IotIndicator",
        config: {
          variableFullName: "Pump",
          icon: "shop",
          color: "success",
          colSize: 6,
          variableSendFreq: 10,
          selectedDevice: {
            name: "Home",
          },
        },
      },
    ],
  },
];

const demoDevices = [
  {
    name: "Home",
    dId: "1",
    template: {
      name: "Template 1",
      _id: 1,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "HLr3",
    saverRule: {
      dId: "1",
      status: false,
    },
  },
  {
    name: "Kitchen",
    dId: "2",
    template: {
      name: "Template 2",
      _id: 2,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotSwitch",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "error",
            colSize: 6,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotIndicator",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "success",
            colSize: 6,
            variableSendFreq: 10,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "g7Pg",
    saverRule: {
      dId: "2",
      status: true,
    },
  },
  {
    name: "Fish Tank",
    dId: "3",
    template: {
      name: "Template 1",
      _id: 1,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "E7PG",
    saverRule: {
      dId: "3",
      status: true,
    },
  },
  {
    name: "Bedroom",
    dId: "4",
    template: {
      name: "Template 2",
      _id: 2,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotSwitch",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "error",
            colSize: 6,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotIndicator",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "success",
            colSize: 6,
            variableSendFreq: 10,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "zG4E",
    saverRule: {
      dId: "4",
      status: false,
    },
  },
  {
    name: "Test",
    dId: "5",
    template: {
      name: "Template 2",
      _id: 2,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotSwitch",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "error",
            colSize: 6,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotIndicator",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "success",
            colSize: 6,
            variableSendFreq: 10,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "0iMQ",
    saverRule: {
      dId: "5",
      status: true,
    },
  },
  {
    name: "Test2",
    dId: "6",
    template: {
      name: "Template 2",
      _id: 2,
      widgets: [
        {
          type: "Rtnumberchart",
          config: {
            variableFullName: "Temperature",
            icon: "shower",
            color: "primary",
            colSize: 12,
            unit: "°C",
            chartTimeAgo: 10,
            variableSendFreq: 10,
            decimalPlaces: 2,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotSwitch",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "error",
            colSize: 6,
            selectedDevice: {
              name: "Home",
            },
          },
        },
        {
          type: "IotIndicator",
          config: {
            variableFullName: "Pump",
            icon: "shop",
            color: "success",
            colSize: 6,
            variableSendFreq: 10,
            selectedDevice: {
              name: "Home",
            },
          },
        },
      ],
    },
    password: "qH3w",
    saverRule: {
      dId: "6",
      status: false,
    },
  },
];

export default function useDevices() {
  const [templates, setTemplates] = useState(demoTemplates);
  // const [devices, setDevices] = useState(demoDevices);

  const [deviceTemplateIndex, setDeviceTemplateIndex] = useState("");
  const deviceNameRef = useRef("");
  const deviceIdRef = useRef("");

  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getTemplates();
  }, []);

  const addDevice = () => {
    // add device to db
    const template = templates[deviceTemplateIndex];

    let newDevice = {
      name: deviceNameRef.current,
      dId: deviceIdRef.current,
      templateId: template._id,
      templateName: template.name,
      password: "default",
      saverRule: {
        dId: deviceIdRef.current,
        status: true,
      },
    };

    dispatch(createDevice(newDevice));
    deviceNameRef.current = "";
    deviceIdRef.current = "";
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
          // this.$store.dispatch("getDevices");

          // this.$notify({
          //   type: "success",
          //   icon: "tim-icons icon-check-2",
          //   message: " Device Saver Status Updated",
          // });
          console.log("success");
        }

        return;
      })
      .catch((e) => {
        console.log(e);
        // this.$notify({
        //   type: "danger",
        //   icon: "tim-icons icon-alert-circle-exc",
        //   message: " Error updating saver rule status",
        // });
        return;
      });

    let newDevices = devices.map((device) => {
      if (device.dId !== rule.dId) return device;
      device.saverRule = newRule;
      return device;
    });
    // setDevices(newDevices);
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
    deviceNameRef,
    deviceIdRef,
    addDevice,
    deleteDevice: delDevice,
    refreshPassword,
    updateSaverRuleStatus,
  };
}
