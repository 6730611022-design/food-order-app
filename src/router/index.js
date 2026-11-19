import { createRouter, createWebHashHistory } from 'vue-router'
import { pinia } from '../stores/pinia'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/menu' },
      { path: 'menu', component: () => import('../pages/MenuPage.vue') },
      { path: 'cart', component: () => import('../pages/CartPage.vue') },
      { path: 'admin', component: () => import('../pages/AdminPage.vue') }
    ]
  },
  { path: '/:catchAll(.*)*', redirect: '/' }
]

export default function () {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
  })

  router.beforeEach((to) => {
    const auth = useAuthStore(pinia)
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
    if (to.meta.guest && auth.isLoggedIn) return '/menu'
  })

  return router
}
