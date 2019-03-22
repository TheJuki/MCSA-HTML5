import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'

Vue.config.productionTip = false

router.beforeEach((to, _, next) => { document.title = to.meta.title + ' - MCSA HTML5'; next() })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
