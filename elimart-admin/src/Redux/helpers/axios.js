import axios from 'axios'
import { API } from './urlConfig'

const token = localStorage.getItem('token')
const axioInstance = axios.create({
  baseURL: API,
  headers: { Authorization: token ? `Bearer ${token}` : ''}
})

export default axioInstance
