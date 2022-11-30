import axios from 'axios'
import { API } from './urlConfig'
import store from '../store'
import { authConstants } from '../actions/constants/constants'

const token = localStorage.getItem('token')
const axioInstance = axios.create({
  baseURL: API,
  headers: { Authorization: token ? `Bearer ${token}` : '' }
})

axioInstance.interceptors.request.use(req => {
  const { auth } = store.getState()
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req
})
axioInstance.interceptors.response.use(
  res => {
    return res
  },
  error => {
    console.log(error)
    const { status } = error.response
    if (status === 500 || status === 400) {
      // localStorage.clear()
      // store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
    }
    return Promise.reject(error)
  }
)

export default axioInstance
