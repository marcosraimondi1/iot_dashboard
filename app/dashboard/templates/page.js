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

export default function Templates() {
  const [selectedWidget, setSelectedWidget] = useState("IotIndicator");
  const [widgets, setWidgets] = useState([]);
  const [templates, setTemplates] = useState([]);
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

// <template>

//     <!-- Save Template -->
//     <div class="row">
//       <card>
//         <div slot="header">
//           <h4 class="card-title">Save Template</h4>
//         </div>
//         <div class="row">
//           <base-input
//             class="col-4"
//             v-model="templateName"
//             label="Template Name"
//             type="text"
//           />
//           <base-input
//             class="col-8"
//             v-model="templateDescription"
//             label="Template Description"
//             type="text"
//           />
//         </div>
//         <br />
//         <br />
//         <div class="row">
//           <div class="col-12">
//             <base-button
//               native-type="submit"
//               type="primary"
//               class="mb-3 pull-right"
//               size="lg"
//               @click="saveTemplate()"
//               :disabled="widgets.length == 0"
//             >
//               Save Template
//             </base-button>
//           </div>
//         </div>
//       </card>
//     </div>

//     <!-- Templates Table -->
//     <div class="row">
//       <card>
//         <div slot="header">
//           <h4 class="card-title">Templates</h4>
//         </div>

//         <div class="row">
//           <el-table :data="templates">
//             <el-table-column min-width="50" label="#" align="center">
//               <div class="photo" slot-scope="{ $index }">
//                 {{ $index + 1 }}
//               </div>
//             </el-table-column>

//             <el-table-column prop="name" label="Name"></el-table-column>

//             <el-table-column
//               prop="description"
//               label="Description"
//             ></el-table-column>

//             <el-table-column
//               prop="widgets.length"
//               label="Widgets"
//             ></el-table-column>

//             <el-table-column header-align="right" align="right" label="Actions">
//               <div slot-scope="{ row }" class="text-right table-actions">
//                 <el-tooltip
//                   content="Delete"
//                   effect="light"
//                   :open-delay="300"
//                   placement="top"
//                 >
//                   <base-button
//                     @click="deleteTemplate(row)"
//                     type="danger"
//                     icon
//                     size="sm"
//                     class="btn-link"
//                   >
//                     <i class="tim-icons icon-simple-remove"></i>
//                   </base-button>
//                 </el-tooltip>
//               </div>
//             </el-table-column>
//           </el-table>
//         </div>
//       </card>
//     </div>
//   </div>
// </template>
