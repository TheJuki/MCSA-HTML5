import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './registerServiceWorker'
import i18n from './i18n'

Vue.config.productionTip = false

const websiteTitle = process.env.VUE_APP_TITLE

// Set title for each route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - ' + websiteTitle
  next()
})

declare module 'vue/types/vue' {
  interface Vue {
    $openWeatherApiKey: string,
    $webSocketUrl: string
  }
}

sync(store, router)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$openWeatherApiKey = process.env.VUE_APP_OPEN_WEATHER_API_KEY
Vue.prototype.$webSocketUrl = process.env.VUE_APP_WS
