import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/elform',
    name: 'elform',
    component: () => import('@/views/ElForm.vue')
  },
  {
    path: '/otherTest',
    name: 'otherTest',
    component: () => import('@/views/OtherTest.vue')
  },
  {
    path: '/csstest',
    name: 'CssTest',
    component: () => import('@/views/CssTest.vue')
  },
  {
    path: '/eschortest',
    name: 'eschortest',
    component: () => import('@/views/EschorTest.vue')
  },
  {
    path: '/fbatest',
    name: 'fbatest',
    component: () => import('@/views/FbaTest.vue')
  },
  {
    path: '/scopeviewer',
    name: 'scopeviewer',
    component: () => import('@/views/ScopeViewer.vue')
  },
  // {
  //   path: '/pinia',
  //   name: 'pinia',
  //   component: () => import('@/views/PiniaTest.vue')
  // },
  {
    path: '/:pathMatch(.*)',
    name: '/NotFound',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  // history: createWebHashHistory('#/app/'),
  history: createWebHashHistory(),
  routes
})
// router.beforeEach(async (to, from, next) => {
//
// })
// router.addRoute({})
export default router
