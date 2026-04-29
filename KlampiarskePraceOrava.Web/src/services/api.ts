import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

export interface ProjectList {
  id: number
  title: string
  category: string
  isPublished: boolean
  createdAt: string
  imageCount: number
  videoCount: number
  coverImageId?: number
}

export interface ProjectDetail {
  id: number
  title: string
  description?: string
  category: string
  isPublished: boolean
  createdAt: string
  coverImageId?: number
  images: { id: number; caption?: string; order: number }[]
  videos: { id: number; caption?: string }[]
}

export const CATEGORIES = ['Pokrytie strechy', 'Strešné okná', 'Oplechovanie komína']
