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

sync(store, router)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
