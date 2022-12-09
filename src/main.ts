import { createApp } from 'vue'
import App from './App.vue'
//import { createProvider } from './vue-apollo'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import { createApolloProvider } from '@vue/apollo-option'

const vuetify = createVuetify({
  components,
  directives,
})

//import en from 'vuetify/src/locale/en'

//Vue.config.productionTip = false
//Vue.use(Vuetify);

// new Vue({
//   vuetify: new Vuetify({
//     lang: {
//       locales: { en },
//       current: 'en',
//     },
//     iconfont: 'md',
//   }),
//   apolloProvider: createProvider(),
//   render: h => h(App),
// }).$mount('#app')

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// })
const app = createApp(App as any); 
//app.use(apolloProvider)
app.use(vuetify).mount('#app')
