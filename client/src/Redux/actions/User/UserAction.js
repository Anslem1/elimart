import axios from '../../helpers/axios'
import { userConstants } from '../constants/constants';


export function getAddress () {
  return async dispatch => {
    try {
      const res = await axios.post('/user/address/get')
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
      const res = await axios.post('/user/address/create', payload)
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST })
      if (res.status === 200) {
        // const {
        //   userAddress: { address }
        // } = res.data
        // dispatch({
        //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address }
        // })
        console.log(res)
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
