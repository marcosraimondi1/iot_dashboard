import { login, register } from "@/Helper/authFunctions.js";

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

  return next(action);

  if (
    action.type === "devices /logout" ||
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
};

const devices = (store) => (next) => async (action) => {
  if (action.type === "devices/setDevices") {
    // Make an API call to fetch turnos from the server
    const devices = await getDevices(store.getState().auth.token);

    // Send turnos into the payload
    action.payload = devices;
  }

  if (action.type === "devices/setSelectedDevice") {
    // Make an API call to update selected device
    return next(action);
  }

  if (action.type === "devices/setNotifications") {
    // Make an API call to set notifications
  }

  if (action.type === "devices/deleteDevice") {
    // Make an API call to delete device from the server
    const token = store.getState().auth.token;
    return next(action);
  }

  return next(action);
};

export const middlewares = [authentication, devices, logger];
