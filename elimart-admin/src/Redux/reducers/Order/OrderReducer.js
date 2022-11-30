import { orderConstant } from '../../actions/constants/constants'

const initialState = {
  orders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case orderConstant.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders
      }
      break

    default:
      break
  }
  return state
}
