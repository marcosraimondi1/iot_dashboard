import { createSlice } from "@reduxjs/toolkit"; // automaticamente crea el reducer y las actions

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: {},
  },
  reducers: {
    // async logic handled in middlewares
    login: (state, action) => {
      state.token = action.payload.token;
      state.userData = action.payload.userData;
    },
    register: () => {
      return;
    },
    logout: (state) => {
      state.token = null;
      state.userData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
