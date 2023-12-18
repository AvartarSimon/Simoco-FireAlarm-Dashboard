<template>
  <v-card class="mx-auto" max-width="420" width="100%" height="100%">
    <v-card-item :title="city">
      <template v-if="isExtremeWether" v-slot:subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon>
        Extreme Weather Alert
      </template>
      <template v-else v-slot:subtitle>
        {{ weather }}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h3" cols="6"> {{ tempc }} &deg;C </v-col>

        <v-col cols="6" class="text-right">
          <v-icon color="error" :icon="customWeatherIcon" size="88"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>{{ windspeed }} m/s</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-water-percent">
        <v-list-item-subtitle>{{ humidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <div class="py-4">
      <v-slider
        v-model="selectedDay"
        :max="5"
        :step="1"
        :ticks="weatherFullReportLabels"
        class="mx-4"
        color="primary"
        density="compact"
        hide-details
        show-ticks="always"
        thumb-size="8"
        @click="sliderClickHander"
      ></v-slider>
    </div>

    <v-list class="weather-forecast-5-days bg-transparent">
      <v-list-item
        v-for="item in weatherFullReportInDays"
        :key="item.day"
        :value="item"
        class="py-2"
      >
        <div class="d-flex align-center justify-space-between">
          <span class="text-subtitle-1">{{ item.day }}</span>

          <div
            class="weather-condition d-flex align-center justify-space-between"
          >
            <v-list-item-title>
              <v-icon :icon="item.icon" color="error" size="small"></v-icon>
              <span class="pl-4">{{ item.temp }}</span>
            </v-list-item-title>
            <div class="text-body-2">{{ item.weatherDescription }}</div>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.weather-forecast-5-days .weather-condition {
  flex-basis: 78%;
}
</style>

<script>
export default {
  props: {
    payload: { type: Object, default: null },
    weatherFullReportLabels: {
      type: Object,
      default: {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wes",
        4: "Thu",
        5: "Fri",
      },
    },
    weatherFullReportInDays: {
      type: Array,
      default: [
        {
          day: "Sun",
          icon: "mdi-weather-sunny",
          temp: "18.01 / 16.92°C",
          temp_min: 16.92,
          temp_max: 18.01,
          weatherDescription: "clear sky",
          weather: "Clear",
        },
      ],
    },
    city: { type: String, default: "Melbourne" },
    weather: { type: String, default: "" },
    weatherDetail: { type: String, default: "" },
    windspeed: { type: Number, default: 0, tip: "wind speed" },
    humidity: { type: Number, default: 0 },
    tempc: { type: Number, default: 0 },
    temp_maxc: { type: Number, default: 0 },
    temp_min: { type: Number, default: 0 },
  },

  data: () => ({}),

  methods: {
    sliderClickHander() {
      console.log(this.selectedDay);
    },
  },

  computed: {
    selectedDay() {
      return new Date().getDay() - 1;
    },
    isExtremeWether() {
      return this.tempc > 35 || this.tempc < 10;
    },
    customWeatherIcon() {
      let weatherIcon = "";
      switch (this.weather) {
        case "Clouds":
          weatherIcon = "mdi-weather-cloudy";
          break;
        case "Snow":
          weatherIcon = "mdi-weather-snowy";
          break;
        case "Rain":
          weatherIcon = "mdi-weather-rainy";
          break;
        case "Clear":
          weatherIcon = "mdi-weather-sunny";
          break;
        case "Wind":
          weatherIcon = "mdi-weather-windy";
          break;
        default:
          weatherIcon = "mdi-weather-sunny";
      }
      return weatherIcon;
    },
  },
};
</script>
