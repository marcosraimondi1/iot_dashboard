import { createSlice } from "@reduxjs/toolkit"; // automaticamente crea el reducer y las actions

export const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [],
    selectedDevice: {},
    notifications: []
  },
  reducers: {
    // async logic handled in middlewares
    getNotifications(state, action) {
      state.notifications = action.payload;
    },

    setSelectedDevice() {
      return;
    },
    createDevice() {
      return;
    },
    deleteDevice(state) {
      return state;
    },

    getDevices(state, action) {
      const devices = action.payload;
      // get selected device
      try {
        state.devices = devices;
        devices.forEach((device) => {
          if (device.selected) {
            state.selectedDevice = device;
          }
        });
      } catch (error) {
        console.log(error);
        state.devices = [];
      }

      //if all devices were removed
      if (!devices || devices.length === 0) state.selectedDevice = {};
      return state;
    },

    logout(state) {
      state.devices = [];
      state.selectedDevice = {};
      state.notifications = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  getNotifications,
  deleteDevice,
  setSelectedDevice,
  getDevices,
  createDevice,
  logout
} = devicesSlice.actions;

export default devicesSlice.reducer;
