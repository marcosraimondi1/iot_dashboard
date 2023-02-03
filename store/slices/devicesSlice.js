import { createSlice } from "@reduxjs/toolkit"; // automaticamente crea el reducer y las actions

export const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [],
    selectedDevice: {},
    notifications: [],
  },
  reducers: {
    // async logic handled in middlewares
    getNotifications(state, action) {
      state.notifications = action.payload;
    },

    setSelectedDevice(state, action) {
      state.selectedDevice = action.payload;
    },

    deleteDevice(state) {
      return state;
    },

    getDevices(state, action) {
      state.devices = action.payload;
    },

    logout(state) {
      state.devices = [];
      state.selectedDevice = {};
      state.notifications = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotifications, setDevices, setSelectedDevice } =
  devicesSlice.actions;

export default devicesSlice.reducer;
