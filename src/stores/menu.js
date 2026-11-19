import { defineStore } from 'pinia'
import { api } from '../api'

const toItem = (r) => ({
  id: r.id,
  name: r.name,
  cuisine: r.cuisine || '',
  image: r.image || '',
  price: r.price ?? 40 + ((r.id * 7) % 12) * 10
})

export const useMenuStore = defineStore('menu', {
  state: () => ({ items: [], loading: false }),
  actions: {
    async fetchMenu() {
      this.loading = true
      try {
        const { data } = await api.get('/recipes', { params: { limit: 18 } })
        this.items = data.recipes.map(toItem)
      } finally {
        this.loading = false
      }
    },
    async addItem(form) {
      const { data } = await api.post('/recipes/add', form)

      const id = this.items.some((i) => i.id === data.id) ? Date.now() : data.id
      this.items.unshift({ ...form, id })
    },
    async updateItem(id, form) {
      await api.put(`/recipes/${id}`, form)
      const i = this.items.findIndex((x) => x.id === id)
      if (i !== -1) this.items[i] = { ...this.items[i], ...form }
    },
    async removeItem(id) {
      await api.delete(`/recipes/${id}`)
      this.items = this.items.filter((x) => x.id !== id)
    }
  }
})
