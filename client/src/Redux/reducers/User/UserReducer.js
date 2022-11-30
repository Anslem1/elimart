import { userConstants } from '../../actions/constants/constants'

const initialState = {
  address: [],
  orders: [],
  error: null,
  orderDetails: {},
  loading: false,
  fetchingOrders: false,
  fetchedOrders: false
}

export default (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false
      }
      break
    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break
    case userConstants.ADD_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case userConstants.ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false
      }
      break
    case userConstants.ADD_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break

    case userConstants.GET_USER_ORDER_REQUEST:
      state = {
        ...state,
        fetchingOrders: true,
        fetchedOrders: false
      }
      break
    case userConstants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
        fetchingOrders: false,
        fetchedOrders: true
      }
      break
    case userConstants.GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        fetchingOrders: false,
        fetchedOrders: false,
        error: action.payload.error
      }
      break

    //ADD USER ORDERS
    case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
      // state = {
      //   ...state,
      //   loading: true
      // }
      break
    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order,
        // loading: false
      }
      break
    case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
      // state = {
      //   ...state,
      //   loading: false,
      //   error: action.payload.error
      // }
      break
  }
  return state
}
