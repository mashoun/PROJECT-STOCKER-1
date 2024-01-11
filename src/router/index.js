import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home-page.vue')
    },
    {
      path: '/items',
      name: 'items',
      component: () => import('../views/items-list.vue')
    },
    {
      path: '/new-collection',
      name: 'newCollection',
      component: () => import('../views/new-collection.vue')
    },
    {
      path: '/new-item',
      name: 'newItem',
      component: () => import('../views/new-item.vue')
    },
    {
      path: '/update-collection',
      name: 'updateCollection',
      component: () => import('../views/update-collection.vue')
    },
    {
      path: '/update-item',
      name: 'updateItem',
      component: () => import('../views/update-item.vue')
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('../views/invoice.vue')
    },
  ]
})

export default router
