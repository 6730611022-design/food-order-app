import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
