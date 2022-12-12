<template id="app">
 <v-app>
      <v-row align-content="start" dense justify="start" class="mainrow">
        <v-col cols="12" sm="2" align-self="center" class="formbutton">
          <v-btn @click='load()' :loading="loading">Get Countries</v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-select 
            v-model="filterType" 
            :items="types" 
            label="Filter Type" 
            outlined 
            dense 
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field 
            v-model="filter" 
            label="Filter" 
            outlined 
            dense 
            hide-details
          />
        </v-col>
      </v-row>
      <v-row >
        <v-col
          v-for="country in filteredCountries" 
          :key="country.code"
          cols="12"
          sm="3"
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

<script lang="ts" setup>
  import query from './graphql/countriesQuery.gql'
  import CountryCard from '@/components/CountryCard.vue' 
  import { Country } from './interfaces/country'
  import { useLazyQuery } from '@vue/apollo-composable'
  import { ref, computed, Ref, ComputedRef } from 'vue';

  const countries: Ref<Country[]> = ref([]);
  const types: string[] = ['Name', 'Currency'];
  const filterType: Ref<string> = ref('Name');
  const filter: Ref<string> = ref('');

  const { onResult, load, loading } = useLazyQuery(query);  
  onResult((result) => {
    countries.value = [...result.data.countries].sort((a: Country, b: Country) => a.name > b.name ? 1 : -1) as Country[];
  })

  const filteredCountries: ComputedRef<Country[]> = computed(
    () => countries.value.filter((country:Country) => country[filterType.value.toLowerCase() as keyof Country]?.toLowerCase().includes(filter.value))
  ); 

</script>
<style>
  #app {
    margin: 20px;
  }
  .mainrow {
    flex:none !important;
  }
  .formbutton {
    display: flex;
    justify-content: center;
  }
</style>

