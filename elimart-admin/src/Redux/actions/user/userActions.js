import axios from '../../helpers/axios'
import { userSignUpConstants } from '../constants/constants'

export function UserSignUpUser (user) {
  console.log(user)
  return async dispatch => {
    dispatch({ type: userSignUpConstants.USER_SIGNUP_REQUEST })
    const res = await axios.post('/auth/admin/signup', {
      ...user
    })


    if (res.status === 200) {
 
      const { message } = res.data
      dispatch({
        type: userSignUpConstants.USER_SIGNUP_SUCCESS,
        payload: {
          message
        }
      })
    } else if (res.status === 400 || 500) {
      dispatch({
        type: userSignUpConstants.USER_SIGNUP_FAILURE,
        payload: { error: res.data.error }
      })
    }
  }
}
