import axios from '../../helpers/axios'
import { getCategoryConstants } from '../constants/constants'

export function getAllCategories () {
  return async dispatch => {
    const res = await axios.get('/categories/get')
    console.log(res)
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

export function addCategory (form) {
  return async dispatch => {
    dispatch({ type: getCategoryConstants.ADD_CATEGORIES_REQUEST })

      const res = await axios.post('/categories/create', form)
      console.log(res)
    if (res.status === 200) {
      dispatch({
        type: getCategoryConstants.ADD_CATEGORIES_SUCCESS,
        payload:{category: res.data.category}
      })
    }
  }
}
