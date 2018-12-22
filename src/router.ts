import Vue from 'vue'
import Router from 'vue-router'
import ContainerView from './views/ContainerView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: ContainerView,
      children: [
        {
          path: 'home',
          alias: '',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/test',
          component: () => import('./views/Test.vue')
        }
      ]
    }
  ]
})
