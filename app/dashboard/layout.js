"use client";
import Dash from "../Components/Dashboard/Dashboard";
import { useRouter } from "next/navigation";

import authenticated from "../../middleware/authenticated";
export default authenticated(function Dashboard({ children }) {
  const router = useRouter();
  const onLogout = () => {
    // router.push("/api/auth/logout");
    router.push("/auth/login");
  };

  return (
    <Dash logout={onLogout} title="IOT CENTER">
      {children}
    </Dash>
  );
});

/*
async getMqttCredentials() {
      try {
        const axiosHeaders = {
          headers: {
            token: this.$store.state.auth.token
          }
        };

        const credentials = await this.$axios.post(
          "/getmqttcredentials",
          null,
          axiosHeaders
        );
        console.log(credentials.data);

        if (credentials.data.status == "success") {
          this.options.username = credentials.data.username;
          this.options.password = credentials.data.password;
        }
      } catch (error) {
        console.log(error);

        if (error.response.status == 401) {
          console.log("NO VALID TOKEN");
          localStorage.clear();

          const auth = {};
          this.$store.commit("setAuth", auth);

          window.location.href = "/login";
        }
      }
    },

    async getMqttCredentialsForReconnection() {
      try {
        const axiosHeaders = {
          headers: {
            token: this.$store.state.auth.token
          }
        };

        const credentials = await this.$axios.post(
          "/getmqttcredentialsforreconnection",
          null,
          axiosHeaders
        );
        console.log(credentials.data);

        if (credentials.data.status == "success") {
          this.client.options.username = credentials.data.username;
          this.client.options.password = credentials.data.password;
        }
      } catch (error) {

        console.log(error);


        if (error.response.status == 401) {
          console.log("NO VALID TOKEN");
          localStorage.clear();

          const auth = {};
          this.$store.commit("setAuth", auth);

          window.location.href = "/login";
        }
        
      }
    },

    async startMqttClient() {
      await this.getMqttCredentials();

      //ex topic: "userid/did/variableId/sdata"
      const deviceSubscribeTopic =
        this.$store.state.auth.userData._id + "/+/+/sdata";
      const notifSubscribeTopic =
        this.$store.state.auth.userData._id + "/+/+/notif";

      const connectUrl =
        process.env.mqtt_prefix + 
        this.options.host +
        ":" +
        this.options.port +
        this.options.endpoint;

        

      try {
        this.client = mqtt.connect(connectUrl, this.options);
      } catch (error) {
        console.log(error);
      }

      //MQTT CONNECTION SUCCESS
      this.client.on("connect", () => {
        console.log(this.client);

        console.log("Connection succeeded!");

        //SDATA SUBSCRIBE
        this.client.subscribe(deviceSubscribeTopic, { qos: 0 }, err => {
          if (err) {
            console.log("Error in DeviceSubscription");
            return;
          }
          console.log("Device subscription Success");
          console.log(deviceSubscribeTopic);
        });

        //NOTIF SUBSCRIBE
        this.client.subscribe(notifSubscribeTopic, { qos: 0 }, err => {
          if (err) {
            console.log("Error in NotifSubscription");
            return;
          }
          console.log("Notif subscription Success");
          console.log(notifSubscribeTopic);
        });
      });

      this.client.on("error", error => {
        console.log("Connection failed", error);
      });

      this.client.on("reconnect", error => {
        console.log("reconnecting:", error);
        this.getMqttCredentialsForReconnection();
      });

      this.client.on("disconnect", error => {
        console.log("MQTT disconnect EVENT FIRED:", error);
      });

      this.client.on("message", (topic, message) => {
        console.log("Message from topic " + topic + " -> ");
        console.log(message.toString());

        try {
          const splittedTopic = topic.split("/");
          const msgType = splittedTopic[3];

          if (msgType == "notif") {
            this.$notify({
              type: "danger",
              icon: "tim-icons icon-alert-circle-exc",
              message: message.toString()
            });
            this.$store.dispatch("getNotifications");
            return;
          } else if (msgType == "sdata") {
            $nuxt.$emit(topic, JSON.parse(message.toString()));
            return;
          }
        } catch (error) {
          console.log(error);
        }
      });

      $nuxt.$on("mqtt-sender", toSend => {
        this.client.publish(toSend.topic, JSON.stringify(toSend.msg));
      });
    },

    mounted() {
    this.$store.dispatch("getNotifications");
    this.initScrollbar();

    setTimeout(() => {
      this.startMqttClient();
    }, 2000);
  },

  client: null,
      options: {
        host: process.env.mqtt_host,
        port: process.env.mqtt_port,
        endpoint: "/mqtt",
        clean: true,
        connectTimeout: 5000,
        reconnectPeriod: 5000,

        // Certification Information
        clientId:
          "web_" +
          this.$store.state.auth.userData.name +
          "_" +
          Math.floor(Math.random() * 1000000 + 1),
        username: "",
        password: ""
      }

*/
