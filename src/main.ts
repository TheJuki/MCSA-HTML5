import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './registerServiceWorker'
import i18n from './i18n'
import axios, { AxiosInstance } from 'axios'

Vue.config.productionTip = false

const api = axios.create()

api.defaults.baseURL = process.env.VUE_APP_API_URL

// Authenticate routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!router.app.$store.state.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      if (
        !to.matched.some(record =>
          router.app.$store.state.roles.includes(record.meta.role)
        )) {
        next({
          path: '/unauthorized'
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance,
    $tinymce_api_key: String
  }
}

sync(store, router)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$api = api
Vue.prototype.$tinyMCEApiKey = process.env.VUE_APP_TINYMCE_API_KEY
