import { useRef, useState } from "react";
import randomString from "../../utils/randomString";

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
  const [devices, setDevices] = useState(demoDevices);
  const [deviceTemplateIndex, setDeviceTemplateIndex] = useState("");

  const deviceNameRef = useRef("");
  const deviceIdRef = useRef("");

  const addDevice = () => {
    // add device to db
    const template = templates[deviceTemplateIndex];

    let newDevice = {
      name: deviceNameRef.current,
      dId: deviceIdRef.current,
      template: template,
      password: "default",
      saverRule: {
        dId: deviceIdRef.current,
        status: true,
      },
    };

    let newDevices = devices.concat(newDevice);
    setDevices(newDevices);
    console.log(devices);
  };

  const deleteDevice = (dId) => {
    // delete device from db
    let newDevices = devices.filter((device) => device.dId !== dId);
    setDevices(newDevices);
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
    setDevices(newDevices);
    console.table(devices);
  };

  const updateSaverRuleStatus = (rule) => {
    // update rule in db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;
    let newDevices = devices.map((device) => {
      if (device.dId !== rule.dId) return device;
      device.saverRule = newRule;
      return device;
    });
    setDevices(newDevices);
  };

  return {
    templates,
    devices,
    deviceTemplateIndex,
    setDeviceTemplateIndex,
    deviceNameRef,
    deviceIdRef,
    addDevice,
    deleteDevice,
    refreshPassword,
    updateSaverRuleStatus,
  };
}
