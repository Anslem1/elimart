import { pageTypeConstants } from '../../actions/constants/constants'

const initialState = {
  error: null,
  loading: false,
  pagetype: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case pageTypeConstants.CREATE_PAGE_TYPE_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case pageTypeConstants.CREATE_PAGE_TYPE_SUCCESS:
      state = {
        ...state,
        pagetype: action.payload.pagetype,
        loading: false
      }
      break
    case pageTypeConstants.CREATE_PAGE_TYPE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break

    default:
      break
  }
  return state
}
