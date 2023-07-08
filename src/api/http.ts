import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IndexSign } from '@/types/index'

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000
})

server.interceptors.request.use(
  (config) => {
    return config
  },
  async err => {
    return await Promise.reject(err)
  }
)

server.interceptors.response.use(
  (resp) => {
    return resp
  },
  async (err) => {
    return await Promise.reject(err)
  }
)

interface Http {
  get: (url: string, data?: IndexSign, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: IndexSign, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  async get (url, data, config = {}) {
    const params = (data != null) ? { data } : {}
    return await server.get(url, {
      params,
      ...config
    })
  },
  async post (url, data = {}, config = {}) {
    return await server.post(url, data, config)
  }
}

export default http
