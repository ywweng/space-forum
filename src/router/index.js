import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Card from '@/views/Card.vue'
import Post from '@/views/Post.vue'
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
    path: '/post',
    component: Post
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
