import { defineStore } from 'pinia'
import { api } from '../api'

const save = (items) => localStorage.setItem('cart', JSON.stringify(items))

export const useCartStore = defineStore('cart', {
  state: () => ({ items: JSON.parse(localStorage.getItem('cart') || '[]') }),
  getters: {
    count: (s) => s.items.reduce((n, i) => n + i.qty, 0),
    total: (s) => s.items.reduce((sum, i) => sum + i.qty * i.price, 0)
  },
  actions: {
    add(food) {
      const found = this.items.find((i) => i.id === food.id)
      if (found) found.qty++
      else this.items.push({ id: food.id, name: food.name, price: food.price, image: food.image, qty: 1 })
      save(this.items)
    },
    increase(id) {
      const f = this.items.find((i) => i.id === id)
      if (f) f.qty++
      save(this.items)
    },
    decrease(id) {
      const f = this.items.find((i) => i.id === id)
      if (!f) return
      f.qty--
      if (f.qty <= 0) this.remove(id)
      else save(this.items)
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id)
      save(this.items)
    },
    async checkout(userId) {
      await api.post('/carts/add', {
        userId,
        products: this.items.map((i) => ({ id: i.id, quantity: i.qty }))
      })
      this.items = []
      save(this.items)
    }
  }
})
