import axios from '../../helpers/axios'
import { useSelector } from 'react-redux'

import { cartConstants, userConstants } from '../constants/constants'

const token = localStorage.getItem('token')

export function getAddress () {
  return async dispatch => {
    try {
      const res = await axios.get('/user/address/get')
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST })
      if (res.status === 200) {
        const {
          userAddress: { address }
        } = res.data
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address }
        })
      } else {
        const { error } = res.data
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}
export function addAddress (payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/user/address/create', { payload })
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST })

      if (res.status === 200) {
        const {
          address: { address }
        } = res.data

        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address }
        })
      } else {
        const { error } = res.data
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}
export function getOrders () {
  return async dispatch => {
    try {
      const res = await axios.get('/user/orders/get')
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST })
      if (res.status === 200) {
        const { orders } = res.data

        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders }
        })
      } else {
        const { error } = res.data
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}

export function addOrder (payload) {
  return async dispatch => {

    try {
      const res = await axios.post('/user/orders/add', payload)
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST })
      if (res.status === 200) {
        dispatch({ type: cartConstants.RESET_CART })
        token && dispatch(getOrders())
      } else {
        const { error } = res.data
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}
export function getOrder (payload) {
  return async dispatch => {
    try {
      const res = await axios.post('/user/orders/getorder', payload)

      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST })

      if (res.status === 200) {
        const { order } = res.data
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order }
        })
      } else {
        const { error } = res.data
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}
