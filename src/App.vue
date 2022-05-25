<script setup>
  import { ref, onMounted } from 'vue'
  import { mainStore } from '@/store/index'

  const isDarkMode = ref(false)
  const toggleDarkLight = () => {
    document.body.classList.toggle('dark-mode')
    isDarkMode.value = !isDarkMode.value
    isDarkMode.value
      ? localStorage.setItem('dark-theme', JSON.stringify(true))
      : localStorage.setItem('dark-theme', JSON.stringify(false))

    return {
      isDarkMode
    }
  }

  const store = mainStore()
  store.getUser()

  const setMode = () => {
    isDarkMode.value = JSON.parse(localStorage.getItem('dark-theme'))
    isDarkMode.value
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode')
  }

  onMounted(() => {
    setMode()
  })
</script>

<template>
  <div class="d-flex flex-md-row-reverse" id="container">
    <div class="container">
      <router-view></router-view>
    </div>
    <ul class="nav nav-pills nav-fill justify-content-around">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.path === '/' }"
          aria-current="page"
          to="/"
          ><ion-icon name="planet"></ion-icon>
          <span class="nav-text">首頁</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/post"
          :class="{ active: $route.path === '/post' }"
          ><ion-icon name="create-outline"></ion-icon
          ><span class="nav-text">發佈文章</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.path === '/profile' }"
          to="/profile"
          ><ion-icon name="person-outline"></ion-icon
          ><span class="nav-text">個人資料</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: $route.path === '/chatroom' }"
          to="/chatroom"
          ><ion-icon name="earth"></ion-icon
          ><span class="nav-text">公開聊天室</span></router-link
        >
      </li>
      <li class="nav-item" @click="toggleDarkLight">
        <a class="nav-link" v-if="isDarkMode"
          ><ion-icon name="sunny-outline"></ion-icon
          ><span class="nav-text">Light Mode</span></a
        >
        <a class="nav-link" v-else
          ><ion-icon name="moon-outline"></ion-icon
          ><span class="nav-text">Dark Mode</span></a
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz@6..96&family=Fira+Code:wght@300;400;500;600&family=Noto+Sans+TC:wght@300;400;500;700&family=Nova+Mono&display=swap');
  @import 'bootstrap/scss/bootstrap';

  #app {
    font-family: 'Noto Sans TC', 'Fira Code', 'Nova Mono', monospace, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: calc(100vh - 3rem);
    width: 100%;
    background: var(--bg-img);
    background-size: cover;
    background-position: center;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    background: var(--nav-bg-color);
    .nav-item {
      .nav-link {
        color: var(--text-color);
        background: inherit;
        ion-icon,
        .nav-text {
          padding-right: 6px;
          padding-bottom: 6px;
        }
        .nav-text {
          display: none;
        }
      }
      .nav-link.active {
        background: inherit;
        ion-icon,
        .nav-text {
          color: var(--btn-active-color);
          padding-right: 6px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--btn-active-color);
        }
      }
    }
    ion-icon {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 768px) {
    #app {
      height: 100vh;
    }

    #container {
      max-width: 768px;
      margin: 0 auto;
    }

    .nav {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 25%;
      height: max-content;
      margin-top: 5rem;
      margin-left: auto;
      background: var(--nav-bg-color);
      .nav-item {
        .nav-link {
          display: flex;
          .nav-text {
            display: inline;
          }
        }
      }
    }
  }
</style>
