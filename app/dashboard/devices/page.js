"use client";
import { useRef, useState } from "react";
import Card from "../../Components/Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DevicesList from "../../Components/Lists/DevicesList";
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

export default function Devices() {
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

  return (
    <>
      <Card title="">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ marginLeft: "20px" }}>
              <h2>Add New Device</h2>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              onChange={(e) => (deviceNameRef.current = e.target.value)}
              label="Device Name"
              sx={{ width: "100%", margin: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              onChange={(e) => (deviceIdRef.current = e.target.value)}
              label="Device Id"
              sx={{ width: "80%", margin: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              select
              label="Template"
              value={deviceTemplateIndex}
              onChange={(e) => {
                setDeviceTemplateIndex(e.target.value);
              }}
              sx={{ width: "100%", margin: "10px" }}
            >
              {templates.map((temp, index) => (
                <MenuItem key={index} value={index}>
                  {temp.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                margin: "10px",
                alignItems: "center",
              }}
            >
              <Button variant="contained" onClick={addDevice}>
                Add
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <br />
      <DevicesList
        devices={devices}
        refreshPassword={refreshPassword}
        updateSaverRuleStatus={updateSaverRuleStatus}
        del={deleteDevice}
      />
    </>
  );
}
