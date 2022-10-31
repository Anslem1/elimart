import { productConstants } from '../../actions/constants/constants'

const initialState = {
  products: [],
  productsByPrice: {
    under30k: [],
    under60k: [],
    under80k: [],
    under100k: [],
    under120k: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice
        }
      }
      break
  }

  return state
}
