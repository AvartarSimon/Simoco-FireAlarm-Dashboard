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
    <v-img cover height="300" :src="AustraliaImage"></v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    payload: { type: Object, default: null },
    AustraliaImage: {
      type: String,
      default: "./data/image/Australia.webp",
    },
  },

  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
