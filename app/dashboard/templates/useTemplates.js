"use client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
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
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getTemplates();
  }, []);

  const addWidget = (newWidget) => {
    newWidget.config.variable = makeid(10);
    console.log(newWidget);
    let newWidgets = widgets.concat(newWidget);
    setWidgets(newWidgets);
  };

  const deleteWidget = (delIndex) => {
    let newWidgets = widgets.filter((_val, index) => index !== delIndex);
    setWidgets(newWidgets);
  };

  const deleteTemplate = async (templateId) => {
    // delete template from db
    const axiosHeaders = {
      headers: {
        token: token, //this.$store.state.auth.token,
      },
      params: { templateId },
    };

    try {
      const res = await axios.delete("/template", axiosHeaders);

      if (res.data.status == "fail" && res.data.error == "template in use") {
        // this.$notify({
        //   type: "danger",
        //   icon: "tim-icons icon-alert-circle-exc",
        //   message:
        //     template.name +
        //     " is in use. First remove the devices linked to the template!",
        // });
        console.log("en uso");
        return;
      }

      if (res.data.status == "success") {
        // this.$notify({
        //   type: "success",
        //   icon: "tim-icons icon-check-2",
        //   message: template.name + " was deleted!",
        // });

        getTemplates();
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

  const saveTemplate = async () => {
    // save template to db
    const templateConfig = {
      name: templateNameRef.current,
      widgets: widgets,
      description: "",
    };

    const axiosHeaders = {
      headers: {
        token: token, //this.$store.state.auth.token,
      },
    };

    const toSend = {
      template: templateConfig,
    };

    try {
      const res = await axios.post("/template", toSend, axiosHeaders);

      if (res.data.status == "success") {
        // this.$notify({
        //   type: "success",
        //   icon: "tim-icons icon-alert-circle-exc",
        //   message: "Template created!",
        // });
        getTemplates();

        setWidgets([]);
      }
    } catch (error) {
      // this.$notify({
      //   type: "danger",
      //   icon: "tim-icons icon-alert-circle-exc",
      //   message: "Error creating template...",
      // });
      console.log(error);
      return;
    }
  };

  const getTemplates = async () => {
    const axiosHeaders = {
      headers: {
        token: token, //this.$store.state.auth.token,
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

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
