import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Card from '@/views/Card.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/space',
    component: Card
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
