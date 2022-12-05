import axios from '../../helpers/axios'
import { orderConstant, pageTypeConstants } from '../constants/constants'

export function getCustomerOrders () {
  return async dispatch => {
    dispatch({ type: orderConstant.GET_CUSTOMER_ORDER_REQUEST })
    try {
      const res = await axios.get('/admin/orders/getcustomerorders')
      if (res.status === 200) {

        const { orders } = res.data

        dispatch({
          type: orderConstant.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders }
        })
      } else {
        const { error } = res.data
        dispatch({
          type: orderConstant.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}

export function updateOrder (payload) {
  return async dispatch => {
    dispatch({ type: orderConstant.UPDATE_CUSTOMER_ORDER_REQUEST })
    try {
      const res = await axios.post('/admin/orders/update', payload)
      if (res.status === 200) {
  
        dispatch({
          type: orderConstant.UPDATE_CUSTOMER_ORDER_SUCCESS
        })
        dispatch(getCustomerOrders())
      } else {
        const { error } = res.data
        dispatch({
          type: orderConstant.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
