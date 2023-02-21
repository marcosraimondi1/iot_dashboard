const express = require("express");
const router = express.Router();
const axios = require("axios");
require("colors");

const EmqxAuthRule = require("../models/emqx_auth.js");

const auth = {
  auth: {
    username: "admin",
    password: process.env.EMQX_DEFAULT_APPLICATION_SECRET
  }
};

global.saverResource = null;
global.alarmResource = null;

// ****************************************
// ******** EMQX RESOURCES MANAGER ********
// ****************************************

/* This manager corroborates that there are 2 resources,
If there are none, then create them.
If there are one or more than two, issue a warning.
To manually delete the resources and restart node */

/* Este administrador corrobora que existan 2 recursos,
Si no hay ninguno, entonces los crea.
Si hay uno o más de dos, lanza advertencia. 
Para borrar manualmente los recursos y reiniciemos node */

//https://docs.emqx.io/en/broker/v4.1/advanced/http-api.html#response-code

//list resources
async function listResources() {
  try {
    const url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/resources/";

    const res = await axios.get(url, auth);

    const size = res.data.data.length;

    if (res.status === 200) {
      if (size == 0) {
        console.log("***** Creating emqx webhook resources *****".green);

        createResources();
      } else if (size == 2) {
        res.data.data.forEach((resource) => {
          if (resource.description == "alarm-webhook") {
            global.alarmResource = resource;

            console.log("▼ ▼ ▼ ALARM RESOURCE FOUND ▼ ▼ ▼ ".bgMagenta);
            console.log(global.alarmResource);
            console.log("▲ ▲ ▲ ALARM RESOURCE FOUND ▲ ▲ ▲ ".bgMagenta);
            console.log("\n");
            console.log("\n");
          }

          if (resource.description == "saver-webhook") {
            global.saverResource = resource;

            console.log("▼ ▼ ▼ SAVER RESOURCE FOUND ▼ ▼ ▼ ".bgMagenta);
            console.log(global.saverResource);
            console.log("▲ ▲ ▲ SAVER RESOURCE FOUND ▲ ▲ ▲ ".bgMagenta);
            console.log("\n");
            console.log("\n");
          }
        });

        let connected1 = await checkResourceStatus(global.saverResource.id);

        let connected2 = await checkResourceStatus(global.alarmResource.id);
        if (!connected1 || !connected2) {
          // reconnect resources
          console.log("RESOURCES DISCONNECTED !!!".bgRed);
          recreateResources();
          return;
        }
      } else {
        printWarning();
      }
    } else {
      console.log("Error in emqx api");
    }
  } catch (error) {
    console.log("Error listing emqx resources");
    console.log(error);
  }
}

//create resources
async function createResources() {
  try {
    const url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/resources";

    const data1 = {
      type: "web_hook",
      config: {
        url: "http://" + process.env.WEBHOOKS_HOST + ":3001/api/saver-webhook",
        headers: {
          token: process.env.EMQX_API_TOKEN
        },
        method: "POST"
      },
      description: "saver-webhook"
    };

    const data2 = {
      type: "web_hook",
      config: {
        url: "http://" + process.env.WEBHOOKS_HOST + ":3001/api/alarm-webhook",
        headers: {
          token: process.env.EMQX_API_TOKEN
        },
        method: "POST"
      },
      description: "alarm-webhook"
    };

    const res1 = await axios.post(url, data1, auth);

    if (res1.status === 200) {
      console.log("Saver resource created!".green);
    }

    const res2 = await axios.post(url, data2, auth);

    if (res2.status === 200) {
      console.log("Alarm resource created!".green);
    }

    setTimeout(() => {
      console.log("***** Emqx WH resources created! :) *****".green);
      listResources();
    }, 1000);
  } catch (error) {
    console.log("Error creating resources");
    console.log(error);
  }
}

//check if superuser exist if not we create one
global.check_mqtt_superuser = async function checkMqttSuperUser() {
  try {
    const superusers = await EmqxAuthRule.find({ type: "superuser" });

    if (superusers.length > 0) {
      return;
    } else if (superusers.length == 0) {
      await EmqxAuthRule.create({
        publish: ["#"],
        subscribe: ["#"],
        userId: "emqxmqttsuperuser",
        username: process.env.EMQX_NODE_SUPERUSER_USER,
        password: process.env.EMQX_NODE_SUPERUSER_PASSWORD,
        type: "superuser",
        time: Date.now(),
        updatedTime: Date.now()
      });

      console.log("Mqtt super user created");
    }
  } catch (error) {
    console.log("error creating mqtt superuser ");
    console.log(error);
  }
};

setTimeout(() => {
  console.log("LISTING RESORUCES!!!!!!!!!");
  listResources();
}, process.env.EMQX_RESOURCES_DELAY);

async function checkResourceStatus(resourceId) {
  // checks resources are alive
  const url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/resources/" + resourceId;
  try {
    const res = await axios.get(url, auth);
    if (res.status == 200) {
      const resource = res.data.data;

      if (resource.status[0].is_alive) return true;

      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function recreateResources() {
  // deletes resources and creates them again
  console.log("RECREATING RESOURCES !!!!".bgRed);

  // first delete binded rules
  const rules = await deleteRules();

  // delete resources
  await deleteResources();

  // create resources
  listResources();

  // reacreate rules
  recreateRulesWithNewResource(rules);
}

async function deleteResources() {
  // deletes saverResource and alarmResource
  const url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/resources/";
  try {
    await axios.delete(url + global.alarmResource.id, auth);
    await axios.delete(url + global.saverResource.id, auth);
    global.alarmResource = null;
    global.saverResource = null;
  } catch (error) {
    console.log(error);
  }
}

function printWarning() {
  console.log(
    "DELETE ALL WEBHOOK EMQX RESOURCES AND RESTART NODE - youremqxdomain:8085/#/resources".red
  );
  setTimeout(() => {
    printWarning();
  }, 1000);
}

module.exports = router;

async function recreateRulesWithNewResource(rules) {
  // if no resources delay creating them
  if (!global.saverResource || !global.alarmResource) {
    console.log("reacreating rules".yellow);
    setTimeout(() => recreateRulesWithNewResource(rules), 3000);
    return;
  }

  try {
    await rules.map(async (rule) => {
      if (rule.description === "SAVER-RULE")
        rule.actions[0].params.$resource = global?.saverResource?.id;
      else if (rule.description === "ALARM-RULE")
        rule.actions[0].params.$resource = global?.alarmResource?.id;
      else return;

      const url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/rules";
      a = await axios.post(url, rule, auth);
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteRules() {
  try {
    let url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/rules";
    let res = await axios.get(url, auth);
    const rules = res.data.data;
    await rules.map(async (rule) => {
      url = "http://" + process.env.EMQX_API_HOST + ":8085/api/v4/rules/" + rule.id;
      res = await axios.delete(url, auth);
    });
    return rules;
  } catch (error) {
    console.log(error);
  }
  return [];
}
