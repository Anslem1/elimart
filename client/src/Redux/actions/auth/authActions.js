import axios from '../../helpers/axios'
import {
  authConstants,
  cartConstants,
  userSignUpConstants
} from '../constants/constants'

export function SignUpUser (user) {
  return async dispatch => {
    dispatch({ type: userSignUpConstants.USER_SIGNUP_REQUEST })
    const res = await axios.post('/auth/signup', {
      ...user
    })
    if (res.status === 200) {
  
      const { token, user, message } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      dispatch({
        type: userSignUpConstants.USER_SIGNUP_SUCCESS,
        payload: {
          token,
          user,
          message
        }
      })
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user
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

export function SigninUser (user) {

  return async dispatch => {
    dispatch({ type: authConstants.LOGIN_REQUEST })
    const res = await axios.post('/auth/signin', {
      ...user
    })
    if (res.status === 200) {
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
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error }
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
    }
  }
}

export function signOutUser () {
  return async dispatch => {
    dispatch({ type: authConstants.LOGOUT_REQUEST })
    const res = await axios.post('/auth/signout')
    if (res.status === 200) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch({
        type: authConstants.LOGOUT_SUCCESS
      })
      dispatch({
        type: cartConstants.RESET_CART
      })
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE
      })
    }
  }
}
