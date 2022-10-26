import axios from '../../helpers/axios'
import {
  getCategoryConstants,
  productConstants
} from '../constants/constants'

export function getInitialData () {
  return async dispatch => {
    const res = await axios.post('/initialdata')
    console.log(res.data)
    if (res.status === 200) {
      const { categories, products } = res.data
      console.log(products)
      dispatch({
        type: getCategoryConstants.GET_CATEGORIES_SUCCESS,
        payload: { categories }
      })
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products }
      })
    }
    console.log(res)
  }
}
