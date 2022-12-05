import axios from '../../helpers/axios'
import { productConstants } from '../constants/constants'

export function getProductBySlug (slug) {
  return async dispatch => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST })
    const res = await axios.get(`/products/${slug}`)

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
  }
}

export function getProductPageType (payload) {
  try {
    return async dispatch => {
      const { cid, pagetype } = payload.params
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_TYPE_REQUEST })
      const res = await axios.get(`/pagetype/${cid}/${pagetype}`)
    
      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_TYPE_SUCCESS,
          payload: res.data
        });
      } else {
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_TYPE_FAILURE,
          error: res.data.error
        });
      }
    }
  } catch (error) {
    console.log({ error })
  }
}

export function getProductDetailsById (payload) {
  return async dispatch => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST })
    let res
    try {
      const { productId } = payload.params

      res = await axios.get(`/product/${productId}`)

      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}
