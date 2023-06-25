import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import type { IndexSign } from '@/types/index'

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000
})

server.interceptors.request.use(
  (config) => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

server.interceptors.response.use(
  (resp) => {
    return resp
  },
  (err) => {
    return Promise.reject(err)
  }
)

type Http = {
  get: (url: string, data?: IndexSign, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: IndexSign, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
  get (url, data, config = {}) {
    const params = data ? { data } : {}
    return server.get(url, {
      params,
      ...config
    })
  },
  post (url, data = {}, config = {}) {
    return server.post(url, data, config)
  }
}

export default http
