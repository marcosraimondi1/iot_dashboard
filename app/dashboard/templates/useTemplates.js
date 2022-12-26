"use client";
import { useState, useRef } from "react";
import IotIndicatorForm from "../../Components/WidgetsForms/IotIndicatorForm";
import IotSwitchForm from "../../Components/WidgetsForms/IotSwitchForm";
import IotButtonForm from "../../Components/WidgetsForms/IotButtonForm";
import RtnumberchartForm from "../../Components/WidgetsForms/RtnumberchartForm";

const widgetsOptions = [
  { value: "IotIndicator", label: "IoT Indicator" },
  { value: "IotSwitch", label: "IoT Switch" },
  { value: "IotButton", label: "IoT Button" },
  { value: "Rtnumberchart", label: "IoT Real Time Number Chart" },
];

const demoTemplates = [
  {
    name: "Template 1",
    _id: 1,
    widgets: [
      {
        type: "Rtnumberchart",
        config: {
          variableFullName: "Temperature",
          variable: "variableId1",
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
          variable: "variableId2",
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
          variable: "variableId3",
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
          variable: "variableId4",
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
export default function useTemplates() {
  const [selectedWidget, setSelectedWidget] = useState("IotIndicator");
  const [widgets, setWidgets] = useState([]);
  const [templates, setTemplates] = useState(demoTemplates);
  const templateNameRef = useRef("");

  const addWidget = (newWidget) => {
    let newWidgets = widgets.concat(newWidget);
    setWidgets(newWidgets);
  };

  const deleteWidget = (delIndex) => {
    let newWidgets = widgets.filter((_val, index) => index !== delIndex);
    setWidgets(newWidgets);
  };

  const deleteTemplate = (delIndex) => {
    // delete template from db
    let newTemplates = templates.filter((_val, index) => index !== delIndex);
    setTemplates(newTemplates);
  };

  const saveTemplate = () => {
    // save template to db
    const templateConfig = {
      name: templateNameRef.current,
      widgets: widgets,
    };
    let newTemplates = templates.concat(templateConfig);
    setTemplates(newTemplates);
    setWidgets([]);
  };

  let widgetForm;
  if (selectedWidget == "IotIndicator")
    widgetForm = <IotIndicatorForm addWidget={addWidget} />;
  else if (selectedWidget == "IotSwitch")
    widgetForm = <IotSwitchForm addWidget={addWidget} />;
  else if (selectedWidget == "IotButton")
    widgetForm = <IotButtonForm addWidget={addWidget} />;
  else widgetForm = <RtnumberchartForm addWidget={addWidget} />;

  return {
    selectedWidget,
    setSelectedWidget,
    templates,
    widgets,
    templateNameRef,
    deleteWidget,
    deleteTemplate,
    saveTemplate,
    widgetForm,
    widgetsOptions,
  };
}
