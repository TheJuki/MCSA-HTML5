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
      meta: { title: 'Login' },
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/',
      component: ContainerView,
      children: [
        {
          path: '/',
          meta: { title: 'Home' },
          component: () => import('./views/Home.vue')
        },
        {
          path: '/browser_compatibility',
          meta: { title: 'Browser Compatibility' },
          component: () => import('./views/HTML5BrowserCompatibility.vue')
        },
        {
          path: '/test',
          meta: { title: 'Test', role: 'test_view', requiresAuth: true },
          component: () => import('./views/Test.vue')
        },
        {
          path: '/unauthorized',
          meta: { title: 'Unauthorized' },
          component: () => import('./views/UnauthorizedView.vue')
        },
        {
          path: '*',
          meta: { title: '404' },
          component: () => import('./views/HTTP404View.vue')
        }
      ]
    }
  ]
})
