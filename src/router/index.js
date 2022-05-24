import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Profile from '@/views/Profile.vue'
import Chatroom from '@/views/Chatroom.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/space/:id',
    component: () => import('@/views/Space.vue')
  },
  {
    path: '/post',
    component: Post
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/chatroom',
    component: Chatroom
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
