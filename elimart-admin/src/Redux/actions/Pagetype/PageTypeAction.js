import axios from '../../helpers/axios'
import { pageTypeConstants } from '../constants/constants'

export function createPage (form) {
  return async dispatch => {
    dispatch({ type: pageTypeConstants.CREATE_PAGE_TYPE_REQUEST })
    try {
      const res = await axios.post('/pagetype/create', form)
      if (res.status === 200) {

        dispatch({
          type: pageTypeConstants.CREATE_PAGE_TYPE_SUCCESS,
          payload: { pagetype: res.data.pagetype }
        })
      } else {
        dispatch({
          type: pageTypeConstants.CREATE_PAGE_TYPE_FAILURE,
          payload: { error: res.data.error }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
