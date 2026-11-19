import { defineStore } from 'pinia'

const USERS = [
  { id: 1, username: 'admin', password: '123456', firstName: 'Admin' }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async login(username, password) {
      const found = USERS.find((u) => u.username === username && u.password === password)
      if (!found) throw new Error('Invalid credentials')

      this.token = `token-${found.id}-${Date.now()}`
      this.user = { id: found.id, username: found.username, firstName: found.firstName }
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})