import { productConstants } from '../../actions/constants/constants'

const initialState = {
  products: []
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products
      }
      break
  }
  // console.log(action.payload.produc
  return state
}