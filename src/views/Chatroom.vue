<script>
  import { io } from 'socket.io-client'
  import { ref, onUnmounted } from 'vue'
  import { timeFormat } from '@/utils/mixin'
  import { storeToRefs } from 'pinia'
  import { mainStore } from '@/store/index'
  import { Toast } from '../utils/mixin'

  export default {
    setup() {
      const socket = io('https://space-socket-test.herokuapp.com', {transports: ['websocket']})
      const store = mainStore()
      const { user, isRegister } = storeToRefs(store)
      const allUsers = ref([])
      const holder = ref('')
      const isConnected = ref(false)
      holder.value = isRegister.value ? '請輸入...' : '請至個人資料填寫名稱'

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

      socket.on('connect', () => {
        console.log('connect')
        isConnected.value = true
        if (isRegister.value) {
          socket.emit('online', user.value)
        } else {
          Toast.fire({ title: '尚未填寫名稱，無法加入聊天', icon: 'warning' })
        }
        socket.on('newUser', (user) => {
          Toast.fire({ title: `${user.name}#${user.id} 加入聊天` })
        })
        socket.on('allUsers', (users) => {
          allUsers.value = users
        })
        socket.on('newMessage', (data) => {
          allMessage.value.push(data)
          scrollToEnd()
        })
        socket.on('offline', (user) => {
          Toast.fire({ title: `${user.name}#${user.id} 離開聊天` })
        })
      })

      socket.on('connect_error', () => {
        Toast.fire({ title: '抱歉，聊天室暫不開放', icon: 'error' })
        socket.disconnect()
        holder.value = '聊天室暫不開放'
      })

      onUnmounted(() => {
        if (isRegister.value) {
          socket.emit('offline', user.value)
        }
        socket.disconnect()
      })

      return {
        timeFormat,
        message,
        send,
        allMessage,
        holder,
        allUsers,
        isRegister,
        isConnected,
        user
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
          <li
            class="dropdown-item"
            v-for="user in allUsers"
            v-if="allUsers.length"
          >
            <span>{{ user.name }}#{{ user.id }}</span>
          </li>
          <li class="dropdown-item" v-else>無人在線</li>
        </ul>
      </div>
    </div>
    <div class="dialogue flex-grow-1 p-3 d-flex flex-column">
      <div
        :class="{
          remote: data.user.id !== user.id,
          local: data.user.id === user.id
        }"
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
        :disabled="!isRegister || !isConnected"
      />
      <button
        type="button"
        class="btn"
        @click.prevent="send"
        :disabled="!isRegister || !isConnected"
      >
        <ion-icon name="send-outline"></ion-icon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #chatroom {
    height: calc(100vh - 4rem);
    padding-bottom: 3rem;
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
  .message {
    @extend %glassBg;
    border: none;
  }
  .time {
    font-size: 0.8em;
  }

  @media screen and (min-width: 768px) {
    #chatroom {
      height: calc(100vh - 1rem);
      padding-bottom: 0;
    }
  }
</style>
