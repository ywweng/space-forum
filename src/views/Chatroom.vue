<script>
  import { io } from 'socket.io-client'
  import { ref, onUnmounted, onMounted } from 'vue'
  import { timeFormat } from '@/utils/mixin'
  import { storeToRefs } from 'pinia'
  import { mainStore } from '@/store/index'
  import { Toast } from '../utils/mixin'

  export default {
    setup() {
      const socket = io('https://test-space-socket.herokuapp.com')
      const store = mainStore()
      const { user, isRegister } = storeToRefs(store)
      const allUsers = ref([])
      const holder = ref('')
      holder.value = isRegister.value ? '請輸入...' : '請至個人資料填寫名稱'
      socket.on('connect', () => {
        console.log('connect')
        if (isRegister.value) {
          socket.emit('online', user.value)
          Toast.fire({ title: `${user.value.name}#${user.value.id} 加入聊天` })
          socket.on('allUsers', (users) => {
            allUsers.value = users
          })
        } else {
          Toast.fire({ title: '尚未填寫名稱，無法加入聊天', icon: 'warning' })
        }
      })

      const message = ref('')
      const allMessage = ref([])
      const send = () => {
        const data = {
          message: message.value,
          date: new Date(),
          user: user.value
        }
        if (isRegister.value && message.value.length) {
          socket.emit('sendMessage', data)
          message.value = ''
        } else {
          Toast.fire({
            title: '未輸入訊息，無法傳送',
            icon: 'error'
          })
        }
      }
      const scrollToEnd = () => {
        let ele = document.querySelector('.dialogue')
        ele.scroll({ top: ele.scrollHeight + 200, behavior: 'smooth' })
      }
      const getMessage = () => {
        socket.on('newMessage', (data) => {
          allMessage.value.push(data)
          scrollToEnd()
        })
      }
      onMounted(() => {
        getMessage()
      })

      onUnmounted(() => {
        socket.on('disconnect', () => {
          console.log('disconnect')
          socket.emit('offline', user.value)
        })
      })

      return {
        timeFormat,
        message,
        send,
        allMessage,
        holder,
        allUsers,
        isRegister
      }
    }
  }
</script>

<template>
  <div id="chatroom" class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Chatroom</h1>
      <div class="dropdown">
        <a
          class="btn dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ion-icon name="people"></ion-icon>
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
          <li class="dropdown-item" v-for="user in allUsers">
            <span>{{ user.name }}#{{ user.id }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="dialogue flex-grow-1 mb-3 p-3 d-flex flex-column">
      <div
        :class="{ remote: data.user.id !== 1, local: data.user.id === 1 }"
        v-for="data in allMessage"
      >
        <div class="info">
          <span class="nickname">{{ data.user.name }}</span>
          <span class="id">#{{ data.user.id }}</span>
        </div>
        <div class="txt">{{ data.message }}</div>
        <div class="time">{{ timeFormat(data.date) }}</div>
      </div>
    </div>
    <div class="send d-flex w-100">
      <input
        type="text"
        class="message w-100 p-2 me-2"
        :placeholder="holder"
        v-model.trim="message"
        :disabled="!isRegister"
      />
      <button
        type="button"
        class="btn"
        @click.prevent="send"
        :disabled="!isRegister"
      >
        <ion-icon name="send-outline"></ion-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #chatroom {
    height: 100vh;
  }
  .dropdown {
    color: var(--text-color);
  }
  .dialogue {
    color: var(--text-color);
    overflow-y: auto;
  }
  .remote {
    margin-top: 0.5rem;
  }
  .local {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  .txt {
    padding: 0.5rem;
    border-radius: 3px;
    background: var(--bg-color);
    width: fit-content;
    max-width: 90%;
  }
  .send {
    margin-bottom: 4rem;
  }
  .message {
    @extend %glassBg;
    border: none;
  }
  .time {
    font-size: 0.8em;
  }

  @media screen and (min-width: 768px) {
    .send {
      margin-bottom: 1rem;
    }
  }
</style>
