"use client";
import { useState } from "react";
import IotIndicatorForm from "../../Components/WidgetsForms/IotIndicatorForm";
import IotSwitchForm from "../../Components/WidgetsForms/IotSwitchForm";
import IotButtonForm from "../../Components/WidgetsForms/IotButtonForm";
import RtnumberchartForm from "../../Components/WidgetsForms/RtnumberchartForm";
import Template from "../../Components/Template/Template";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const widgetsOptions = [
  { value: "IotIndicator", label: "IoT Indicator" },
  { value: "IotSwitch", label: "IoT Switch" },
  { value: "IotButton", label: "IoT Button" },
  { value: "Rtnumberchart", label: "IoT Real Time Number Chart" },
];

export default function Templates() {
  const [templateConfig, setTemplateConfig] = useState({});
  const [selectedWidget, setSelectedWidget] = useState("IotIndicator");
  const [widgets, setWidgets] = useState([]);

  const addWidget = (newWidget) => {
    let newWidgets = widgets.concat(newWidget);
    setWidgets(newWidgets);
    console.table(widgets);
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
    </>
  );
}

// <template>
//         <!-- Add Widget Button -->
//         <div class="row pull-right">
//           <div class="col-12">
//             <base-button
//               native-type="submit"
//               type="primary"
//               class="mb-3"
//               size="lg"
//               @click="addNewWidget()"
//             >
//               Add Widget
//             </base-button>
//           </div>
//         </div>
//       </card>
//     </div>

//     <!-- Dashboard Preview -->
//     <div class="row">
//       <div
//         v-for="(widget, index) of widgets"
//         :class="[widget.column]"
//         :key="index"
//       >
//         <i
//           aria-hidden="true"
//           class="fa fa-trash text-warning pull-right"
//           @click="deleteWidget(index)"
//           style="margin-bottom: 10px"
//         />

//         <IotIndicator v-if="widget.widget == 'indicator'" :config="widget" />
//         <IotButton v-if="widget.widget == 'button'" :config="widget" />
//         <IotSwitch v-if="widget.widget == 'switch'" :config="widget" />
//         <Rtnumberchart v-if="widget.widget == 'numberchart'" :config="widget" />
//       </div>
//     </div>

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
