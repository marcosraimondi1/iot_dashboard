export default function RtnumberchartForm() {
  return <div>RtnumberchartForm</div>;
}

//             <!-- Form Number Chart Type -->
//             <div v-if="widgetType == 'numberchart'">
//               <base-input
//                 v-model="configNumberChart.variableFullName"
//                 label="Var Name"
//                 type="text"
//               />
//               <base-input
//                 v-model="configNumberChart.unit"
//                 label="Unit"
//                 type="text"
//               />
//               <base-input
//                 v-model="configNumberChart.decimalPlaces"
//                 label="Decimal Places"
//                 type="number"
//               />
//               <base-input
//                 v-model="configNumberChart.icon"
//                 label="Icon"
//                 type="text"
//               />
//               <base-input
//                 v-model="configNumberChart.variableSendFreq"
//                 label="Variable Send Frequency (secs)"
//                 type="number"
//               />
//               <base-input
//                 v-model="configNumberChart.chartTimeAgo"
//                 label="Chart Back Time (mins)"
//                 type="number"
//               />
//               <el-select
//                 v-model="configNumberChart.class"
//                 class="select-success"
//                 placeholder="Select Color"
//                 style="width: 100%"
//               >
//                 <el-option
//                   class="text-success"
//                   value="success"
//                   label="Success"
//                 />

//                 <el-option class="text-danger" value="danger" label="Danger" />

//                 <el-option class="text-light" value="light" label="Light" />

//                 <el-option
//                   class="text-primary"
//                   value="primary"
//                   label="Primary"
//                 />

//                 <el-option
//                   class="text-warning"
//                   value="warning"
//                   label="Warning"
//                 />
//               </el-select>

//               <br />
//               <br />

//               <el-select
//                 v-model="configNumberChart.column"
//                 class="select-success"
//                 default-first-option="col-6"
//                 style="width: 100%"
//               >
//                 <el-option class="text-dark" value="col-2" label="col-2" />
//                 <el-option class="text-dark" value="col-4" label="col-4" />
//                 <el-option class="text-dark" value="col-6" label="col-6" />
//                 <el-option class="text-dark" value="col-8" label="col-8" />
//                 <el-option class="text-dark" value="col-10" label="col-10" />
//                 <el-option class="text-dark" value="col-12" label="col-12" />
//               </el-select>
//             </div>