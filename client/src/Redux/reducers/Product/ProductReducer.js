import { productConstants } from '../../actions/constants/constants'

const initialState = {
  products: [],
  productsByPrice: {
    // under30k: [],
    // under60k: [],
    // under80k: [],
    // under100k: [],
    // under120k: []
  },
  priceRange: {},
  PageRequest: false,
  Page: {},
  productDetails: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productsByPrice
        }
      }
      break
    case productConstants.GET_PRODUCT_PAGE_TYPE_REQUEST:
      state = {
        ...state,
        PageRequest: true
      }
      break
    case productConstants.GET_PRODUCT_PAGE_TYPE_SUCCESS:
      state = {
        ...state,
        Page: action.payload.pagetype,
        PageRequest: false
      }
      break
    case productConstants.GET_PRODUCT_PAGE_TYPE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        PageRequest: false
      }
      break

    case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        Page: action.payload.pagetype,
        productDetails: action.payload.productDetails
      }
      break
    case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false
      }
      break
  }

  return state
}
