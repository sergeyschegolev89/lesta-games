import { createApp, h, provide } from 'vue'
import App from './App.vue'

import { apolloClient } from '../src/vue-apollo'
import { ApolloClients } from "@vue/apollo-composable";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App as any),
}) 

app.use(vuetify).mount('#app')