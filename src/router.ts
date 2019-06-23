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
          component: () => import('./views/HomeView.vue')
        },
        {
          path: '/browser-compatibility',
          meta: { title: 'Browser Compatibility' },
          component: () => import('./views/HTML5BrowserCompatibilityView.vue')
        },
        {
          path: '/audio',
          meta: { title: 'Audio' },
          component: () => import('./views/AudioView.vue')
        },
        {
          path: '/video',
          meta: { title: 'Video' },
          component: () => import('./views/VideoView.vue')
        },
        {
          path: '/ajax',
          meta: { title: 'AJAX' },
          component: () => import('./views/AJAXView.vue')
        },
        {
          path: '/canvas',
          meta: { title: 'Canvas' },
          component: () => import('./views/CanvasView.vue')
        },
        {
          path: '/drag-drop',
          meta: { title: 'Drop & Drop' },
          component: () => import('./views/DragDropView.vue')
        },
        {
          path: '/geo-location',
          meta: { title: 'Geo Location' },
          component: () => import('./views/GeoLocationView.vue')
        },
        {
          path: '/jquery',
          meta: { title: 'JQuery' },
          component: () => import('./views/JQueryView.vue')
        },
        {
          path: '/svg',
          meta: { title: 'SVG' },
          component: () => import('./views/SVGView.vue')
        },
        {
          path: '/web-socket',
          meta: { title: 'Web Socket' },
          component: () => import('./views/WebSocketView.vue')
        },
        {
          path: '/web-worker',
          meta: { title: 'Web Worker' },
          component: () => import('./views/WebWorkerView.vue')
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
