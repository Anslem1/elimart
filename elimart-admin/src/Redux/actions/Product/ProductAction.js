import axios from '../../helpers/axios'
import { productConstants } from '../constants/constants'

export function getProducts () {
  return async dispatch => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST })
      const res = await axios.post(`/product/get`)
  

      if (res.status === 200) {
        const { products } = res.data
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products }
        })
      } else {
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_FAILURE,
          payload: { error: res.data.error }
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE
      })
    }
  }
}

export function addProduct (form) {
  return async dispatch => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST })
    const res = await axios.post('/product/create', form)

      if (res.status === 200) {
        dispatch({
          type: productConstants.ADD_PRODUCT_SUCCESS,
          payload: { product: res.data.product }
        })
     dispatch(getProducts())

      }
  }
}

export const deleteProductById = payload => {
  return async dispatch => {
    try {
      const res = await axios.delete('/product/delete', {
        data: { payload }
      })
 
      dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST })
      if (res.status === 200) {
        dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS })
        dispatch(getProducts())
      } else {
        const { error } = res.data
        dispatch({
          type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: {
            error
          }
        })
      }
    } catch (error) {
      console.log(error) 
    }
  }
}
