import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import axios from 'axios'
import VueAxios from 'vue-axios'

import dayjs from 'dayjs'

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(dayjs)
  .use(createPinia())
  .mount('#app')
