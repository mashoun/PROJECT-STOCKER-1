import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/collections/collectionList.vue')
    },
    {
      path: '/collections/:collectionId',
      name: 'collectionItems',
      component: () => import('../views/collections/items/collectionItems.vue')
    },
    {
      path: '/collections/:collectionId/items/:itemId',
      name: 'itemDetails',
      component: () => import('../views/collections/items/itemDetails.vue')
    },


    {
      path: '/newCollection',
      name: 'newCollection',
      component: () => import('../views/newCollection.vue')
    },
    {
      path: '/collections/:collectionId/newItem',
      name: 'newItem',
      component: () => import('../views/newItem.vue')
    },


    {
      path: '/updateCollection/:collectionId',
      name: 'updateCollection',
      component: () => import('../views/updateCollection.vue')
    },
    {
      path: '/collections/:collectionId/updateItem/:itemId',
      name: 'updateItem',
      component: () => import('../views/updateItem.vue')
    },

    
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('../views/invoice.vue')
    },
  ]
})

export default router
