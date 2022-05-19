import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Space from '@/views/Space.vue'
import Post from '@/views/Post.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/space/:id',
    component: Space
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
