import {
  authConstants,
  userSignUpConstants
} from '../../actions/constants/constants'

const initialState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userProfilePicture: ''
  },
  authenticated: false,
  authenticating: false,
  signingOut: false,
  signedOut: false,
  error: null,
  message: ''
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticated: false
      }
      break
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticated: true
      }
      break
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticated: false,
        authenticating: false
      }
      break
    case userSignUpConstants.USER_SIGNUP_REQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticated: false
      }
      break
    case userSignUpConstants.USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticating: false,
        authenticated: true
      }
      break
    case userSignUpConstants.USER_SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticated: false,
        authenticating: false
      }
      break
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        signingOut: true,
        signedOut: false
      }
      break
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initialState,
        signingOut: false,
        signedOut: true
      }
      break
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        signingOut: false,
        signedOut: false,
        error: action.payload.error
      }
      break
  }
  return state
}
