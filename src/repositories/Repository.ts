import axios from 'axios'
import { fetchAuthParams, calcAuthEndPointUrl } from '@/workers/authorization'
import PathStorage from '@/workers/PathStorage'

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'

const api = axios.create({
  baseURL,
  withCredentials: true,
})

api.interceptors.response.use(undefined, async err => {
  if (/* Unauthorized */ err.response?.status === 401) {
    const { data: authParams } = await fetchAuthParams()
    PathStorage.saveCurrentPath()
    window.location.assign(calcAuthEndPointUrl(authParams))
  }
  return Promise.reject(err)
})

export default api
