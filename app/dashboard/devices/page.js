"use client";
import { useRef, useState } from "react";
import Card from "../../Components/Card/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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

export default function Devices() {
  const [templates, setTemplates] = useState(demoTemplates);
  const [devices, setDevices] = useState([]);
  const [deviceTemplateIndex, setDeviceTemplateIndex] = useState("");

  const deviceNameRef = useRef("");
  const deviceIdRef = useRef("");
  const deviceTemplateIndexRef = useRef("");

  const addDevice = () => {
    // add device to db
    const template = templates[deviceTemplateIndex];

    let newDevice = {
      name: deviceNameRef.current,
      dId: deviceIdRef.current,
      templateName: template.name,
      templateId: template._id,
    };

    let newDevices = devices.concat(newDevice);
    setDevices(newDevices);
  };

  const deleteDevice = (delIndex) => {
    // delete device from db
    let newDevices = devices.filter((_val, index) => delIndex !== index);
    setDevices(newDevices);
  };

  return (
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
            sx={{ width: "100%", margin: "10px" }}
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
  );
}

//     <!-- Table  -->
//     <div class="row">
//       <card>
//         <div slot="header">
//           <h4 class="card-title">Devices</h4>
//         </div>

//         <el-table :data="$store.state.devices">
//           <el-table-column label="#" min-width="50" align="center">
//             <div slot-scope="{ $index }">
//               {{ $index + 1 }}
//             </div>
//           </el-table-column>

//           <el-table-column prop="name" label="Name"></el-table-column>

//           <el-table-column prop="dId" label="Device Id"></el-table-column>

//           <el-table-column label="Password" style="margin-horizontal: 50px">
//             <div slot-scope="{ row }">
//               {{ row.password }}
//               <el-tooltip
//                 content="Update Password"
//                 effect="light"
//                 :open-delay="300"
//                 placement="top"
//               >
//                 <base-button
//                   type="success"
//                   size="sm"
//                   class="btn-link"
//                   @click="refreshDevicePassword(row.dId)"
//                 >
//                   <i
//                     style="margin-left: 5px; color: green"
//                     class="tim-icons icon-refresh-01"
//                   />
//                 </base-button>
//               </el-tooltip>
//             </div>
//           </el-table-column>

//           <el-table-column
//             prop="templateName"
//             label="Template"
//           ></el-table-column>

//           <el-table-column label="Actions">
//             <div slot-scope="{ row }">
//               <el-tooltip
//                 content="Saver Status Indicator"
//                 style="margin-right: 10px"
//               >
//                 <i
//                   class="fas fa-database"
//                   :class="{
//                     'text-success': row.saverRule.status,
//                     'text-dark': !row.saverRule.status,
//                   }"
//                 ></i>
//               </el-tooltip>

//               <el-tooltip content="Database Saver">
//                 <base-switch
//                   @click="updateSaverRuleStatus(row.saverRule)"
//                   :value="row.saverRule.status"
//                   type="primary"
//                   on-text="On"
//                   off-text="Off"
//                 />
//               </el-tooltip>

//               <el-tooltip
//                 content="Delete"
//                 effect="light"
//                 :open-delay="300"
//                 placement="top"
//               >
//                 <base-button
//                   type="danger"
//                   size="sm"
//                   class="btn-link"
//                   @click="deleteDevice(row)"
//                 >
//                   <i class="tim-icons icon-simple-remove" />
//                 </base-button>
//               </el-tooltip>
//             </div>
//           </el-table-column>
//         </el-table>
//       </card>
//     </div>
//   </div>
// </template>
