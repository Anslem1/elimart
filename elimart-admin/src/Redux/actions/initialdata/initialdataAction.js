import axios from '../../helpers/axios'
import {
  getCategoryConstants,
  orderConstant,
  productConstants
} from '../constants/constants'

export function getInitialData () {
  return async dispatch => {
    const res = await axios.get('/initialdata')

    if (res.status === 200) {
      const { categories, products, orders } = res.data
   

      dispatch({
        type: getCategoryConstants.GET_CATEGORIES_SUCCESS,
        payload: { categories }
      })
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products }
      })
      dispatch({
        type: orderConstant.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders }
      })
    }
  }
}
