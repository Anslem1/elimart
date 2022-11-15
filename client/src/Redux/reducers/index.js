import { combineReducers } from 'redux'
import CategoryReducer from './Category/CategoryReducer'
import ProductReducer from './Product/ProductReducer'
import AuthReducer from './Auth/AuthReducer'
import CartReducer from './Cart/CartReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  products: ProductReducer,
  cart: CartReducer
  // order: orderReducer
})

export default rootReducer
