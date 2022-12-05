import axios from 'axios'
import { API } from './urlConfig'
import store from '../store'
import { authConstants } from '../actions/constants/constants'
import { signOutUser } from '../actions'

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
    switch (error.response.data.message || error.response.data.error.message) {
      case 'Wrong username or password':
        store.dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: error.response.data.message
          }
        })
        alert('Wrong username or password')
        break
      case "Couldn't find user":
        store.dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: error.response.data.message
          }
        })
        alert("Couldn't find user")
        break
      case 'jwt expired':
        store.dispatch(signOutUser())
        window.location.reload()
        alert('Session expired, please login again to renew session')
        return
        break
      default:
        // window.location.reload()

        alert('Something went wrong try again')

        break
    }
    return Promise.reject(error)
  }
)

export default axioInstance
