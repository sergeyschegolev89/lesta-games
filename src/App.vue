<template id="app">
 <v-app>
      <v-row>
        <v-col cols="2">
          <v-btn @click='getCountries()'>Get Countries</v-btn>
        </v-col>
        <v-col cols="2">
          <v-select 
            v-model="filterType" 
            :items="types" 
            label="Filter Type" 
            outlined 
            dense 
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field 
            v-model="filter" 
            label="Filter" 
            outlined 
            dense 
            hide-details
          />
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          v-for="country in filteredCountries" 
          :key="country.code"
          cols="3"
        >
          <country-card 
            :name="country.name"
            :capital="country.capital"
            :currency="country.currency"
          />
        </v-col>
      </v-row>
 </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { GET_ALL_COUNTRIES } from '@/graphql/countriesQuery'
import CountryCard from '@/components/CountryCard.vue' 

export default Vue.extend({
  name: 'App',
  components: {
    CountryCard
  },
  data() {
    return {
      countries: [],
      types: [
        'Name', 
        'Currency'
      ],
      filterType: 'Name',
      filter: ''
    }
  },
  computed: {
    filteredCountries(): Array<Object> {
      return this.countries.filter((country:any) => 
        country[this.filterType.toLowerCase()]?.toLowerCase().includes(this.filter));
    }
  },
  methods: {
    async getCountries () {
      try {
        const res = await this.$apollo.query({ query: GET_ALL_COUNTRIES });
        this.countries = res.data.countries.sort((a:any, b:any) => a.name > b.name ? 1 : -1);
      } catch (e) {
        console.log('err', e)
      }
    }
  }
});
</script>
<style>
  #app {
    margin: 20px;
  }
</style>

