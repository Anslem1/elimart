import axios from '../../helpers/axios'
import { productConstants } from '../constants/constants'

export function addProduct (form) {
  return async dispatch => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST })
    const res = await axios.post('/product/create', form)
    console.log('create')
    if (res.status === 200) {
      dispatch({
        type: productConstants.ADD_PRODUCT_SUCCESS,
        payload: { product: res.data.product }
      })
    }
  }
}
