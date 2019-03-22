import Vue from 'vue'
import Router from 'vue-router'
import ContainerView from './views/ContainerView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/',
      component: ContainerView,
      children: [
        {
          path: '/',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/browser_compatibility',
          component: () => import('./views/HTML5BrowserCompatibility.vue')
        },
        {
          path: '/test',
          meta: { role: 'test_view', requiresAuth: true },
          component: () => import('./views/Test.vue')
        },
        {
          path: '/unauthorized',
          component: () => import('./views/UnauthorizedView.vue')
        },
        {
          path: '*',
          component: () => import('./views/HTTP404View.vue')
        }
      ]
    }
  ]
})
