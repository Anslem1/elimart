import { userSignUpConstants } from '../../actions/constants/constants'

const initialState = {
  token: null,
  user: {
    error: null,
    message: ''
  },
  signingUp: false,
  signedUp: false
}

export default (state = initialState, action) => {
  switch (action.type) {
      case userSignUpConstants.USER_SIGNUP_REQUEST:
          state = {
              ...state,
              signingUp: true,
              signedUp: false
          };
          break;
      case userSignUpConstants.USER_SIGNUP_SUCCESS:
          state = {
              ...state,
              message: action.payload.message,
              signingUp: false,
              signedUp: true
          };
          break;
      case userSignUpConstants.USER_SIGNUP_FAILURE:
          state = {
              ...state,
              error: action.payload.error,
              signingUp: false,
              signedUp: false
          };
          break;
  }
  return state
}
