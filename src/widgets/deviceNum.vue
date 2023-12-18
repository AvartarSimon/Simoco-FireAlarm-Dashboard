<template>
  <v-card :loading="loading" class="mx-auto my-12" height="100%" width="100%">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img cover height="300" :src="deviceImage"></v-img>

    <v-card-item>
      <v-card-title
        >{{ this.deviceName }} ({{ this.deviceNumber }})</v-card-title
      >
      <div class="text-subtitle-1">
        <span class="me-1">{{ this.deviceDescription }}</span>
      </div>
    </v-card-item>
    <v-list disabled>
      <v-list-item
        v-for="(item, i) in computedItems"
        :key="i"
        :value="item"
        color="primary"
        rounded="shaped"
      >
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-icon :icon="item.icon" size="small"></v-icon>
            <v-list-item-title
              v-text="item.text"
              class="pl-4"
            ></v-list-item-title>
          </div>
          <div class="text-subtitle-1">{{ item.value }}</div>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    payload: { type: Object, default: null },
    deviceImage: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    },
    deviceName: { type: String, default: "Device" },
    deviceNumber: { type: String, default: 0, tip: "device serial number" },
    deviceDescription: { type: String, default: "Device" },
    deviceLocation: { type: String, default: "" },
    deviceCreationTime: { type: String, default: 0 },
    deviceHealthStatus: { type: String, default: "Healthy" },
    deviceAlarmStatus: { type: String, default: "false" },
  },

  data: () => ({
    loading: false,
    selection: 1,
  }),

  computed: {
    computedItems() {
      const items = [
        {
          text: "Device Number",
          icon: "mdi-devices",
          value: this.deviceNumber,
        },
        {
          text: "Location",
          icon: "mdi-map-marker",
          value: this.deviceLocation,
        },
        {
          text: "Installation date",
          icon: "mdi-calendar-range",
          value: this.deviceCreationTime,
        },
        {
          text: "Health Status",
          icon: "mdi-heart-pulse",
          value: this.deviceHealthStatus,
        },
        {
          text: "Alarm Status",
          icon: "mdi-alarm-light",
          value: this.deviceAlarmStatus,
        },
      ];
      return items;
    },
  },

  methods: {},
};
</script>
