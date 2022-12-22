import WidgetCard from "../Components/WidgetCard/WidgetCard";
import Icon from "@mui/material/Icon";

export default function IotIndicator({ config }) {
  return (
    <WidgetCard
      title={config?.selectedDevice.name + " - " + config?.variableFullName}
    >
      <Icon style={{ fontSize: "48px" }} color="secondary">
        shower
      </Icon>
    </WidgetCard>
  );
}

{
  /*
<script>
export default {
  props: ["config"],
  data() {
    return {
      value: false,
      topic: "",
    };
  },

  watch: {
    config: {
      immediate: true,
      deep: true,
      handler() {
        setTimeout(() => {
          // para cuando se cambia de dispositivo no se muestren los mismos datos
          this.value = false;
          
          // Desuscribe from topic
          this.$nuxt.$off(this.topic);

          // Subscribe again
          this.topic =
            this.config.userId +
            "/" +
            this.config.selectedDevice.dId +
            "/" +
            this.config.variable + "/sdata";

          this.$nuxt.$on(this.topic, this.processReceivedData);

        }, 300);
      },
    },
  },

  mounted() {
    // Nuxt Messages to handle incoming mqtt messages
    this.topic =
            this.config.userId +
            "/" +
            this.config.selectedDevice.dId +
            "/" +
            this.config.variable + "/sdata";

    this.$nuxt.$on(this.topic, this.processReceivedData);
  },

  beforeDestroy() {
    // Desuscribe from topic
    this.$nuxt.$off(this.topic);
  },

  methods: {
    processReceivedData(data) {
      try {
        this.value = data.value;
      } catch (err) {
        console.log(err)
      }
    },
    getIconColorClass() {
      if (!this.value) {
        return "text-dark";
      }
      return "text-" + this.config.class;
    },
  },
};
</script> */
}
