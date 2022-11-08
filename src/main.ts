import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import App from './App.vue'
import { createProvider } from './vue-apollo'
import en from 'vuetify/src/locale/en'

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    lang: {
      locales: { en },
      current: 'en',
    },
    iconfont: 'md',
  }),
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')
