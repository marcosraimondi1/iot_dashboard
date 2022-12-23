"use client";
import { useState } from "react";
import IotIndicatorForm from "../../Components/WidgetsForms/IotIndicatorForm";
import IotSwitchForm from "../../Components/WidgetsForms/IotSwitchForm";
import IotButtonForm from "../../Components/WidgetsForms/IotButtonForm";
import RtnumberchartForm from "../../Components/WidgetsForms/RtnumberchartForm";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const widgets = [
  { value: "IotIndicator", label: "IoT Indicator" },
  { value: "IotSwitch", label: "IoT Switch" },
  { value: "IotButton", label: "IoT Button" },
  { value: "Rtnumberchart", label: "IoT Real Time Number Chart" },
];

export default function Templates() {
  const [config, setConfig] = useState({});
  const [selectedWidget, setSelectedWidget] = useState("IotIndicator");

  let widgetForm;
  if (selectedWidget == "IotIndicator")
    widgetForm = <IotIndicatorForm config={config} setConfig={setConfig} />;
  else if (selectedWidget == "IotSwitch")
    widgetForm = <IotSwitchForm config={config} setConfig={setConfig} />;
  else if (selectedWidget == "IotButton")
    widgetForm = <IotButtonForm config={config} setConfig={setConfig} />;
  else widgetForm = <RtnumberchartForm config={config} setConfig={setConfig} />;

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
        {widgets.map((option) => (
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
//   <div>
//     <!-- Widget Configurator -->
//     <div class="row">
//       <card>
//         <div slot="header">
//           <h4 class="card-title">Widgets</h4>
//         </div>

//         <div class="row">
//           <!-- Widget Selector and Forms -->
//           <div class="col-6">
//             <!-- Widget Selector -->
//             <el-select
//               v-model="widgetType"
//               class="select-success"
//               placeholder="Select Widget"
//               style="width: 100%"
//             >
//               <el-option
//                 class="text-dark"
//                 value="numberchart"
//                 label="Number Chart INPUT <-"
//               />

//               <el-option
//                 class="text-dark"
//                 value="indicator"
//                 label="Boolean Indicator INPUT <-"
//               />

//               <el-option class="text-dark" value="map" label="Map INPUT <-" />

//               <el-option
//                 class="text-dark"
//                 value="button"
//                 label="Button OUTPUT ->"
//               />

//               <el-option
//                 class="text-dark"
//                 value="switch"
//                 label="Switch OUTPUT ->"
//               />
//             </el-select>

//             <br />
//             <br />

//             <!-- Form Number Chart Type -->

//             <!-- Form Switch Type -->

//             <!-- Form Button Type -->

//             <!-- Form Indicator Type -->

//           <!-- Widget Preview -->
//           <div class="col-6">
//             <IotIndicator
//               v-if="widgetType == 'indicator'"
//               :config="configIndicator"
//             />
//             <IotButton v-if="widgetType == 'button'" :config="configButton" />

//             <IotSwitch v-if="widgetType == 'switch'" :config="configSwitch" />
//             <Rtnumberchart
//               v-if="widgetType == 'numberchart'"
//               :config="configNumberChart"
//             />
//           </div>
//         </div>

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
