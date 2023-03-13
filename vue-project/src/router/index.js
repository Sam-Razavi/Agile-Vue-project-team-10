import { createRouter, createWebHistory } from 'vue-router'
import MonthView from '../views/MonthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'month',
      component: MonthView
    },
    {
      path: '/week',
      name: 'week',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WeekView.vue')
    }
  ],
  linkActiveClass: 'active'
})

export default router
