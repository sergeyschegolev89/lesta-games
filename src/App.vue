<template id="app">
 <v-app>
      <v-row align-content="start" dense justify="start">
        <v-col cols="12" sm="2" align-self="center">
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
  import { useLazyQuery } from '@vue/apollo-composable'
  import { ref, computed, Ref, ComputedRef } from 'vue';

  interface Country {
    name: string
    code: string
    capital: string
    currency: string
  }

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

//export default defineComponent({

  // name: 'App',
  // components: {
  //   CountryCard
  // },
  // data() {
  //   return {
  //     countries: [],
  //     types: [
  //       'Name', 
  //       'Currency'
  //     ],
  //     filterType: 'Name',
  //     filter: ''
  //   }
  // },
  // computed: {
  //   filteredCountries(): Object[] {
  //     return this.countries.filter((country:any) => 
  //       country[this.filterType.toLowerCase()]?.toLowerCase().includes(this.filter));
  //   }
  // },
  // methods: {
  //   async getCountries () {
  //     try {
  //       const res = await this.$apollo.query({ query: GET_ALL_COUNTRIES });       
  //       this.countries = [...res.data.countries].sort((a:any, b:any) => a.name > b.name ? 1 : -1) as any;
  //     } catch (e) {
  //       console.log('err', e)
  //     }
  //   }
  // }
//});
</script>
<style>
  #app {
    margin: 20px;
  }
</style>

