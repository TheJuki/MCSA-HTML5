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
          path: '/',
          meta: { title: 'Home' },
          component: () => import('./views/Home.vue')
        },
        {
          path: '/browser_compatibility',
          meta: { title: 'HTML5 Browser Compatibility' },
          component: () => import('./views/HTML5BrowserCompatibility.vue')
        },
        {
          path: '/test',
          meta: { title: 'Test' },
          component: () => import('./views/Test.vue')
        }
      ]
    }
  ]
})
