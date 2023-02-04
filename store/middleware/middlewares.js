import { login, register } from "@/Helper/authFunctions.js";
import axios from "axios";
const logger = (store) => (next) => (action) => {
  if (
    action.type === "persist/REHYDRATE" ||
    action.type === "persist/PERSIST"
  ) {
    // no logs
    return next(action);
  }
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

// se ejecuta en rutas protegidas donde el usurario tiene que estar loguedado
// si el usuario no tiene token, lo enviamos al login
const authentication = (store) => (next) => async (action) => {
  // LOGOUT
  if (action.type === "auth/logout") {
    store.dispatch({ type: "devices/logout" }); // borra info guardada
    return next(action);
  }

  // LOGIN
  if (action.type === "auth/login") {
    // login to api
    const user = action.payload;
    const auth = await login(user);

    if (auth) {
      action.payload = auth;
    } else {
      action.payload = null;
      console.log("FAILED TO LOG IN");
    }

    return next(action);
  }

  // REGISTER
  if (action.type === "auth/register") {
    const user = action.payload;
    const registered = await register(user);
    if (registered) {
      // success - redirect to login
    } else {
      console.log("failed to register");
    }
    return next(action);
  }

  if (
    action.type === "devices/logout" ||
    action.type === "persist/REHYDRATE" ||
    action.type === "persist/PERSIST"
  ) {
    // let user logout or rehydrate store
    return next(action);
  }

  // check authentication token for all other actions
  if (!store.getState().auth.token) {
    // no token logout
    store.dispatch({ type: "auth/logout" });
  }
  return next(action);
};

const devices = (store) => (next) => async (action) => {
  if (action.type === "devices/getDevices") {
    // Make an API call to fetch turnos from the server
    const axiosHeader = {
      headers: {
        token: store.getState().auth.token,
      },
    };
    try {
      const res = await axios.get("/device", axiosHeader);

      const devices = res.data.data;

      action.payload = devices;
      return next(action);
    } catch (error) {
      console.log(error);
    }
    action.payload = null;
    return next(action);
  }

  if (action.type === "devices/setSelectedDevice") {
    // Make an API call to update selected device
    const dId = action.payload;

    const axiosHeaders = {
      headers: {
        token: store.getState().auth.token,
      },
    };

    const toSend = { dId: dId };

    try {
      await axios.put("/device", toSend, axiosHeaders);
      store.dispatch({ type: "devices/getDevices" });
    } catch (e) {
      console.log(e);
    }
    return next(action);
  }

  if (action.type === "devices/getNotifications") {
    // Make an API call to set notifications
    const axiosHeader = {
      headers: {
        token: store.getState().auth.token,
      },
    };

    try {
      const res = await axios.get("/notifications", axiosHeader);
      const notifications = res.data.data;
      console.log(notifications);
      action.payload = notifications;
    } catch (error) {
      console.log(error);
    }
  }

  if (action.type === "devices/deleteDevice") {
    // Make an API call to delete device from the server
    const axiosHeader = {
      headers: {
        token: store.getState().auth.token,
      },
      params: {
        dId: action.payload,
      },
    };
    try {
      await axios.delete("/device", axiosHeader);
      store.dispatch({ type: "devices/getDevices" });
    } catch (error) {
      console.log(error);
    }
    return next(action);
  }

  if (action.type === "devices/createDevice") {
    const axiosHeaders = {
      headers: {
        token: store.getState().auth.token,
      },
    };

    const toSend = { newDevice: action.payload };

    try {
      const res = await axios.post("/device", toSend, axiosHeaders);
      if (res.data.status == "success") {
        store.dispatch({ type: "devices/getDevices" });

        return next(action);
      }
    } catch (e) {
      if (
        e.response.data.status == "error" &&
        e.response.data.error.errors.dId.kind == "unique"
      ) {
        console.log("error unique");
        return;
      } else {
        console.log("Error");
        return;
      }
    }
  }

  return next(action);
};

export const middlewares = [authentication, devices, logger];
