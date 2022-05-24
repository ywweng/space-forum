import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      user: { id: 0, name: '', gender: 'male' },
      isRegister: false
    }
  },
  getters: {},
  actions: {
    setUser(user) {
      this.user = user
      this.isRegister = true
    },
    async getUser() {
      const userId = JSON.parse(localStorage.getItem('userId'))
      if (userId) {
        const { data } = await api.getUser(userId)
        setUser(...data)
      }
    }
  }
})
