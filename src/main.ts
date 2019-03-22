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
  let roles : string[] = []
  roles = store.state.roles

  if (localStorage.getItem('token') && !store.state.isLoggedIn) {
    api.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    )

    store
      .dispatch('LOGIN', {
        id: localStorage.getItem('id'),
        username: localStorage.getItem('username'),
        fullName: localStorage.getItem('fullName'),
        roles: JSON.parse(localStorage.getItem('roles') || '')
      })
      .then(res => {
        roles = store.state.roles
        if (to.matched.some(record => record.meta.requiresAuth) &&
              !to.matched.some(record => roles.includes(record.meta.role))) {
          next({
            path: '/unauthorized'
          })
        } else {
          next()
        }
      })
  } else if (to.matched.some(record => record.meta.requiresAuth) &&
            !store.state.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

declare module 'vue/types/vue' {
  interface Vue {
    $api: AxiosInstance,
    $tinyMCEApiKey: String
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
