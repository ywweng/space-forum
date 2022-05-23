<script>
  import { ref, onMounted } from 'vue'
  import api from '@/utils/api'
  import { Toast } from '@/utils/mixin'
  import { storeToRefs } from 'pinia'
  import { mainStore } from '@/store/index'

  export default {
    setup() {
      const store = mainStore()
      const { user, isRegister } = storeToRefs(mainStore())

      const getUser = async () => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        if (userId) {
          const { data } = await api.getUser(userId)
          store.setUser(...data)
        }
      }
      onMounted(() => {
        getUser()
      })

      const register = async () => {
        if (user.value.name === '') {
          Toast.fire({ title: '不可空白', icon: 'warning' })
          return
        }
        const { data } = await api.postUser(user.value)
        localStorage.setItem('userId', JSON.stringify(data.id))
        Toast.fire({ title: '註冊成功', icon: 'success' })
        getUser()
      }

      const editInfo = async () => {
        if (user.value.id === store.user.id) {
          const { response, data } = await api.putUser(user.value)
          if (response.status !== '400') {
            store.setUser(data)
            Toast.fire({ title: '更改成功', icon: 'success' })
          } else {
            Toast.fire({ title: '更改失敗', icon: 'error' })
          }
        }
      }

      return {
        isRegister,
        user,
        register,
        editInfo
      }
    }
  }
</script>

<template>
  <div id="profile">
    <div class="d-flex align-items-center justify-content-between pt-4">
      <h1 class="logo px-2">Profile</h1>
    </div>
    <form class="d-flex flex-column m-3">
      <div class="form-floating mb-3" v-if="isRegister">
        <input
          type="text"
          class="form-control"
          id="floatingId"
          placeholder="ID"
          :value="user.id"
          readonly
        />
        <label for="floatingId">ID</label>
      </div>
      <div class="alert alert-warning" role="alert" v-else>
        請先填入 Nickname 及 Gender
      </div>
      <div class="form-floating mb-3">
        <input
          v-model="user.name"
          type="text"
          class="form-control"
          id="floatingNickname"
          placeholder="Nickname"
          required
        />
        <label for="floatingNickname">Nickname</label>
      </div>
      <div class="form-floating mb-3">
        <span class="me-3">Gender</span>
        <div class="form-check form-check-inline">
          <input
            v-model="user.gender"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="male"
            checked
          />
          <label class="form-check-label" for="inlineRadio1">Male</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            v-model="user.gender"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="female"
          />
          <label class="form-check-label" for="inlineRadio2">Female</label>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-save mb-3"
        @click.prevent="editInfo"
        v-if="isRegister"
      >
        Save
      </button>
      <button type="button" class="btn btn-save mb-3" @click.prevent="register" v-else>
        Register
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  #profile {
    padding-bottom: 3rem;
  }

  .form-check-input {
    color: var(--text-color);
  }

  .btn-save {
    background: var(--btn-color);
    border-radius: 30px;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
