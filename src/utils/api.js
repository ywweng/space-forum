import axios from 'axios'
import { Toast } from '@/utils/mixin'

const base = 'https://space-forum-001.herokuapp.com'
const axiosInstance = axios.create({
  baseURL: base
})

// 攔截器
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data
    const totalCount = response.headers['x-total-count']
    const pages = Math.ceil(totalCount / 10)
    return { data, pages, response }
  },
  (error) => {
    Toast.fire({ title: '錯誤', icon: 'error' })
    return Promise.reject(error)
  }
)

const apiHelper = axiosInstance

export default {
  getPosts(page = 1) {
    return apiHelper.get(`${base}/posts?_page=${page}&_sort=date&_order=desc`)
  },
  getSpace(id) {
    return apiHelper.get(`${base}/posts?id=${id}`)
  },
  getComments(id) {
    return apiHelper.get(`${base}/comments?postId=${id}&_sort=date&_order=desc`)
  },
  getSearchPosts(value) {
    return apiHelper.get(
      `${base}/posts?title_like=${value}&content_like=${value}&_sort=date&_order=desc`
    )
  },
  getUser(id) {
    return apiHelper.get(`${base}/users?id=${id}`)
  },
  postUser(user) {
    return apiHelper.post(`${base}/users`, user)
  },
  putUser(user) {
    return apiHelper.put(`${base}/users/${user.id}`, user)
  }
}
