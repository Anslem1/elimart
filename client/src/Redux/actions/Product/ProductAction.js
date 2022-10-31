import axios from '../../helpers/axios'
import { productConstants } from '../constants/constants'

export function getProductBySlug (slug) {
  return async dispatch => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST })
    const res = await axios.get(`/product/${slug}`)

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        payload: res.data 
      })
    } else {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE
      })
    }
    // console.log(res)
  }
}
