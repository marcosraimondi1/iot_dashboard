import { createSlice } from "@reduxjs/toolkit"; // automaticamente crea el reducer y las actions

export const emqxSlice = createSlice({
  name: "emqx",
  initialState: {
    messages: [],
  },
  reducers: {
    mqttSender: () => {
      return;
    },
    startMqttClient: () => {
      return;
    },
    logout: (state) => {
      state.messages = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { startMqttClient, mqttSender, logout } = emqxSlice.actions;

export default emqxSlice.reducer;
