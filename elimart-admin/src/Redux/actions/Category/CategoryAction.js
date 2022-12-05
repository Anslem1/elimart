import axios from '../../helpers/axios'
import { getCategoryConstants } from '../constants/constants'

// export
function getAllCategory () {
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

export function addCategory (form) {
  return async dispatch => {
    dispatch({ type: getCategoryConstants.ADD_CATEGORY_REQUEST })
    try {
      const res = await axios.post('/categories/create', form)

      if (res.status === 200) {
        dispatch({
          type: getCategoryConstants.ADD_CATEGORY_SUCCESS,
          payload: { category: res.data.category }
        })
      }
    } catch (error) {
      console.log(error.response)
    }
  }
}
export function updateCategories (form) {
  return async dispatch => {
    dispatch({ type: getCategoryConstants.UPDATE_CATEGORY_REQUEST })

    const res = await axios.post('/categories/update', form)
 

    if (res.status === 200) {
      dispatch({ type: getCategoryConstants.UPDATE_CATEGORY_SUCCESS })
      dispatch(getAllCategory())
    } else {
      dispatch({
        type: getCategoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: res.data.error
      })
    }
  }
}
export function deleteCategories (ids) {
  return async dispatch => {
    dispatch({ type: getCategoryConstants.DELETE_CATEGORY_REQUEST })
    const res = await axios.post('/categories/delete', {
      payload: {
        ids
      }
    })

    if (res.status === 200) {
      dispatch(getAllCategory())
      dispatch({ type: getCategoryConstants.DELETE_CATEGORY_SUCCESS })
    } else {
      dispatch({
        type: getCategoryConstants.DELETE_CATEGORY_FAILURE,
        payload: res.data.error
      })
    }
  }
}

export { getAllCategory }
