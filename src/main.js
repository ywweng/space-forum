import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(createPinia())
  .mount('#app')
