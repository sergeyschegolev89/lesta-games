<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      Capital: {{ capital }}
      <br />
      Currency: {{ currency }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    capital: {
      type: String,
    },
    currency: {
      type: String,
    },
  },
};
</script>
