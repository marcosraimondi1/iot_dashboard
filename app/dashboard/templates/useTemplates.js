"use client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import IotIndicatorForm from "../../Components/WidgetsForms/IotIndicatorForm";
import IotSwitchForm from "../../Components/WidgetsForms/IotSwitchForm";
import IotButtonForm from "../../Components/WidgetsForms/IotButtonForm";
import RtnumberchartForm from "../../Components/WidgetsForms/RtnumberchartForm";

const widgetsOptions = [
  { value: "IotIndicator", label: "IoT Indicator" },
  { value: "IotSwitch", label: "IoT Switch" },
  { value: "IotButton", label: "IoT Button" },
  { value: "Rtnumberchart", label: "IoT Real Time Number Chart" }
];

export default function useTemplates() {
  const [selectedWidget, setSelectedWidget] = useState("IotIndicator");
  const [widgets, setWidgets] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async () => setTemplates(await fetchTemplates(token))();
  }, [token]);

  const addWidget = (newWidget) => {
    newWidget.config.variable = makeid(10);
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
        token: token //this.$store.state.auth.token,
      },
      params: { templateId }
    };

    try {
      const res = await axios.delete("/template", axiosHeaders);

      if (res.data.status == "fail" && res.data.error == "template in use") {
        const message = "Template in use. First remove the devices linked to the template!";
        global.notify(message, { variant: "error" });
        return;
      }

      if (res.data.status == "success") {
        setTemplates(await fetchTemplates(token));
      }
    } catch (error) {
      global.notify("Error deleting template", { variant: "error" });
      return;
    }
  };

  const saveTemplate = async () => {
    // save template to db
    if (templateName === "") {
      global.notify("Missing Template Name Field", { variant: "error" });
      return;
    }
    if (widgets.length == 0) {
      global.notify("Templates must have at least 1 widget", { variant: "error" });
      return;
    }
    const templateConfig = {
      name: templateName,
      widgets: widgets.map((widget) => {
        widget.config.demo = false;
        return widget;
      }),
      description: ""
    };

    const axiosHeaders = {
      headers: {
        token: token
      }
    };

    const toSend = {
      template: templateConfig
    };

    try {
      const res = await axios.post("/template", toSend, axiosHeaders);

      if (res.data.status == "success") {
        setTemplateName("");
        setWidgets([]);
        setTemplates(await fetchTemplates(token));
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  let widgetForm;
  if (selectedWidget == "IotIndicator") widgetForm = <IotIndicatorForm addWidget={addWidget} />;
  else if (selectedWidget == "IotSwitch") widgetForm = <IotSwitchForm addWidget={addWidget} />;
  else if (selectedWidget == "IotButton") widgetForm = <IotButtonForm addWidget={addWidget} />;
  else widgetForm = <RtnumberchartForm addWidget={addWidget} />;

  return {
    selectedWidget,
    setSelectedWidget,
    templates,
    widgets,
    templateName,
    setTemplateName,
    deleteWidget,
    deleteTemplate,
    saveTemplate,
    widgetForm,
    widgetsOptions
  };
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
    global.notify("Error getting templates", { variant: "error" });
    console.log(error);
  }
  return [];
};
