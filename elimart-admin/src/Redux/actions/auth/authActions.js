import axios from '../../helpers/axios'
import { authConstants, userSignUpConstants } from '../constants/constants'

export function SigninUser (user) {
  console.log(user)
  return async dispatch => {
    dispatch({ type: authConstants.LOGIN_REQUEST })
    const res = await axios.post('/auth/admin/signin', {
      ...user
    })
    if (res.status === 200) {
      console.log(res)
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user
        }
      })
    } else if (res.status === 400 || 500) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.response.data.error }
      })
    }
  }
}
export function SignUpUser (user) {
  console.log(user)
  return async dispatch => {
    dispatch({ type: userSignUpConstants.USER_SIGNUP_REQUEST })
    const res = await axios.post('/auth/admin/signup', {
      ...user
    })
    if (res.status === 200) {
      console.log(res)
      const { message } = res.data

      dispatch({
        type: userSignUpConstants.USER_SIGNUP_SUCCESS,
        payload: {
          message
        }
      })
    } else if (res.status === 400 || 500) {
      dispatch({
        type: userSignUpConstants.USER_SIGNUP_FAILURE,
        payload: { error: res.response.data.error }
      })
    }
  }
}

export function isUserSignedin () {
  return async dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user
        }
      })
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' }
      })
    }
  }
}

export function signOutUser () {
  return async dispatch => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    const res = await axios.post('/auth/admin/signout')
    if (res.status === 200) {
      localStorage.clear()
      dispatch({
        type: authConstants.LOGOUT_SUCCESS
      })
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE
      })
    }
  }
}