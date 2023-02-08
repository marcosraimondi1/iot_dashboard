import { login, register } from "@/Helper/authFunctions.js";
import mqtt from "mqtt";
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
    store.dispatch({ type: "emqx/logout" }); // borra info guardada
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
    action.type === "emqx/logout" ||
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

const emqx = (store) => (next) => async (action) => {
  if (action.type === "emqx/startMqttClient") {
    try {
      await startMqttClient(store);
    } catch (error) {
      console.log("Error Starting Mqtt Client");
      console.log(error);
    }
    return next(action);
  }
  if (action.type === "emqx/mqttSender") {
    // send mqtt messages
    try {
      const toSend = action.payload;
      global.CLIENT.publish(toSend.topic, JSON.stringify(toSend.msg));
    } catch (error) {
      console.log("Error Sending Message");
      console.log(error);
    }
    return next(action);
  }
  return next(action);
};

export const middlewares = [authentication, devices, emqx]; //, logger];

const getMqttCredentials = async (store) => {
  try {
    const axiosHeaders = {
      headers: {
        token: store.getState().auth.token,
      },
    };

    const credentials = await axios.post(
      "/getmqttcredentials",
      null,
      axiosHeaders
    );

    // update options state

    if (credentials.data.status == "success") {
      global.OPTIONS.username = credentials.data.username;
      global.OPTIONS.password = credentials.data.password;

      const clientId =
        "web_" +
        store.getState().auth.userData.name +
        "_" +
        Math.floor(Math.random() * 1000000 + 1);

      global.OPTIONS.clientId = clientId;
    }
  } catch (error) {
    console.log(error);

    if (error.response.status == 401) {
      console.log("NO VALID TOKEN");
      localStorage.clear();
      store.dispatch({ type: "auth/logout" });
    }
  }
};

const getMqttCredentialsForReconnection = async (store) => {
  try {
    const axiosHeaders = {
      headers: {
        token: store.getState().auth.token,
      },
    };

    const credentials = await axios.post(
      "/getmqttcredentialsforreconnection",
      null,
      axiosHeaders
    );

    if (credentials.data.status == "success") {
      global.CLIENT.options.username = credentials.data.username;
      global.CLIENT.options.password = credentials.data.password;
      const newCredentials = {
        username: credentials.data.username,
        password: credentials.data.password,
      };
      store.dispatch({ type: "emqx/setClient", payload: newCredentials });
    }
  } catch (error) {
    console.log(error);

    if (error.response.status == 401) {
      console.log("NO VALID TOKEN");
      localStorage.clear();
      store.dispatch({ type: "auth/logout" });
    }
  }
};

const startMqttClient = async (store) => {
  if (global.CLIENT !== null) return;
  global.CLIENT = 1;
  await getMqttCredentials(store);

  //ex topic: "userid/did/variableId/sdata"
  const deviceSubscribeTopic =
    store.getState().auth.userData._id + "/+/+/sdata";

  const notifSubscribeTopic = store.getState().auth.userData._id + "/+/+/notif";

  const connectUrl =
    process.env.NEXT_PUBLIC_MQTT_PREFIX +
    global.OPTIONS.host +
    ":" +
    global.OPTIONS.port +
    global.OPTIONS.endpoint;

  try {
    global.CLIENT = mqtt.connect(connectUrl, global.OPTIONS);
  } catch (error) {
    console.log("ERROR CONNECTING TO MQTT");
    console.log(error);
  }

  //MQTT CONNECTION SUCCESS
  global.CLIENT.on("connect", () => {
    console.log("✅✅ Mqtt connected ✅✅");

    //SDATA SUBSCRIBE
    global.CLIENT.subscribe(deviceSubscribeTopic, { qos: 0 }, (err) => {
      if (err) {
        console.log("Error in DeviceSubscription");
        return;
      }
      console.log("Device subscription Success");
      // console.log(deviceSubscribeTopic);
    });

    //NOTIF SUBSCRIBE
    global.CLIENT.subscribe(notifSubscribeTopic, { qos: 0 }, (err) => {
      if (err) {
        console.log("Error in NotifSubscription");
        return;
      }
      console.log("Notif subscription Success");
      // console.log(notifSubscribeTopic);
    });
  });

  global.CLIENT.on("error", (error) => {
    console.log("Connection failed", error);
  });

  global.CLIENT.on("reconnect", (error) => {
    console.log("reconnecting 🔜");
    getMqttCredentialsForReconnection(store);
  });

  global.CLIENT.on("disconnect", (error) => {
    console.log("MQTT disconnect EVENT FIRED:", error);
    global.CLIENT = null;
  });

  global.CLIENT.on("message", (topic, message) => {
    try {
      const splittedTopic = topic.split("/");
      const msgType = splittedTopic[3];

      if (msgType == "notif") {
        alert(message.toString());
        store.dispatch({ type: "devices/getNotifications" });
        return;
      } else if (msgType == "sdata") {
        const customEvent = new CustomEvent(topic, {
          detail: JSON.parse(message.toString()),
        });
        window.dispatchEvent(customEvent);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
