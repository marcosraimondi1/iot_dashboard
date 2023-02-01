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
    setNotifications(state, action) {
      state.notifications = action.payload;
    },

    setDevices(state, action) {
      state.devices = action.payload;
    },

    setSelectedDevice(state, action) {
      state.selectedDevice = action.payload;
    },
    
    deleteDevice(state) {
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotifications, setDevices, setSelectedDevice } =
  devicesSlice.actions;

export default devicesSlice.reducer;
