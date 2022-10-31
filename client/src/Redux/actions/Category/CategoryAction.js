import axios from '../../helpers/axios'
import { getCategoryConstants } from '../constants/constants'

export function getAllCategory () {
  return async dispatch => {
    const res = await axios.get('/categories/get')
    dispatch({ type: getCategoryConstants.GET_CATEGORIES_REQUEST })
    if (res.status === 200) {
      const { categoryList } = res.data
      dispatch({
        type: getCategoryConstants.GET_CATEGORIES_SUCCESS,
        payload: { categories: categoryList }
      })
    } else {
      dispatch({
        type: getCategoryConstants.GET_CATEGORIES_FAILURE,
        payload: {
          error: res.data.error
        }
      })
    }
  }
}
