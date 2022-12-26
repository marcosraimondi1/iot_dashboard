"use client";
import { useState, useRef } from "react";
import IotIndicatorForm from "../../Components/WidgetsForms/IotIndicatorForm";
import IotSwitchForm from "../../Components/WidgetsForms/IotSwitchForm";
import IotButtonForm from "../../Components/WidgetsForms/IotButtonForm";
import RtnumberchartForm from "../../Components/WidgetsForms/RtnumberchartForm";
import Template from "../../Components/Template/Template";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "../../Components/Card/Card";
import Button from "@mui/material/Button";
import TemplatesList from "../../Components/Lists/TemplatesList";

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

export default function Templates() {
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

  return (
    <>
      <h1>Templates</h1>
      <TextField
        select
        value={selectedWidget}
        onChange={(e) => {
          setSelectedWidget(e.target.value);
        }}
      >
        {widgetsOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {widgetForm}
      <Template widgets={widgets} deleteWidget={deleteWidget} />
      <Card title="">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: "10px",
            marginTop: "50px",
          }}
        >
          <TextField
            required
            label="Template Name"
            onChange={(e) => {
              templateNameRef.current = e.target.value;
            }}
            sx={{ width: "100%", margin: "5px" }}
          ></TextField>
          <Button variant="contained" onClick={saveTemplate}>
            Save
          </Button>
        </div>
      </Card>
      <div style={{ margin: "15px" }}>
        <TemplatesList templates={templates} del={deleteTemplate} />
      </div>
    </>
  );
}
