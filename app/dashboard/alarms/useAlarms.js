import { useRef, useState } from "react";
import randomString from "../../utils/randomString";

const demoDevice = {
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
          variable: "streqert",
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
        type: "Rtnumberchart",
        config: {
          variableFullName: "Humedad",
          variable: "afdsuye",
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
};

const demoRules = [
  {
    _id: "ayf3cF08t2",
    dId: "1",
    status: false,
    variableFullName: "Humedad",
    deviceName: "Home",
    variable: "afdsuye",
    value: "26",
    condition: "<=",
    triggerTime: "10",
    counter: 0,
  },
  {
    _id: "Rd4xFMv6MT",
    dId: "1",
    status: true,
    variableFullName: "Humedad",
    deviceName: "Home",
    variable: "afdsuye",
    value: "55",
    condition: ">=",
    triggerTime: "5",
    counter: 0,
  },
  {
    _id: "uu1O8HE26G",
    dId: "1",
    status: false,
    variableFullName: "Temperature",
    deviceName: "Home",
    variable: "streqert",
    value: "24",
    condition: ">",
    triggerTime: "5",
    counter: 0,
  },
  {
    _id: "4z8TsQCy4e",
    dId: "1",
    status: true,
    variableFullName: "Temperature",
    deviceName: "Home",
    variable: "streqert",
    value: "15",
    condition: "<",
    triggerTime: "4",
    counter: 0,
  },
];
export default function useAlarms() {
  const [device, setDevice] = useState(demoDevice);
  const [alarms, setAlarms] = useState(demoRules);
  const [selectedWidgetIndex, setSelectedWidgetIndex] = useState("");
  const [condition, setCondition] = useState("");

  const valueRef = useRef("");
  const triggerTimeRef = useRef("");

  const updateStatusRule = (rule) => {
    // update rule status on db
    let newRule = JSON.parse(JSON.stringify(rule));
    newRule.status = !newRule.status;
    let newRules = alarms.map((alarm) => {
      if (alarm._id !== rule._id) return alarm;
      return newRule;
    });
    setAlarms(newRules);
    console.log(alarms);
  };

  const deleteRule = (rule) => {
    // delete rule from db
    let newRules = alarms.filter((alarm) => alarm._id !== rule._id);
    setAlarms(newRules);
  };

  const addRule = () => {
    // add rule to db
    const { variable, variableFullName } =
      device.template.widgets[selectedWidgetIndex].config;
    let newRule = {
      _id: randomString(10),
      dId: device.dId,
      status: true,
      variableFullName,
      deviceName: device.name,
      variable,
      value: valueRef.current,
      condition,
      triggerTime: triggerTimeRef.current,
      counter: 0,
    };
    let newRules = alarms.concat(newRule);
    setAlarms(newRules);
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
    valueRef,
    triggerTimeRef,
  };
}
